import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import { ReadStream } from 'fs';
import { lastValueFrom } from 'rxjs';

import { PlantDal } from './plant.dal';

@Injectable()
export class PlantService {
  constructor(
    private httpService: HttpService,
    private readonly dal: PlantDal,
  ) {}

  getAll(limit: number, state: string) {
    return this.dal.findAll(limit, state);
  }

  async populate() {
    await this.dal.clear();
    const egrid = await lastValueFrom(
      this.httpService.get(
        'https://www.epa.gov/system/files/documents/2022-01/egrid2020_data.xlsx',
        { responseType: 'stream' },
      ),
    );

    const wb: WorkBook = await new Promise((resolve, reject) => {
      const stream: ReadStream = egrid.data;

      const buffers = [];

      stream.on('data', (data) => buffers.push(data));

      stream.on('end', () => {
        const buffer = Buffer.concat(buffers);
        resolve(xlsx.read(buffer, { type: 'buffer' }));
      });

      stream.on('error', (error) => reject(error));
    });

    const sheet: WorkSheet = wb.Sheets[wb.SheetNames[3]];
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const plants = [];
    let general = 0;

    for (let R = range.s.r + 2; R <= range.e.r; ++R) {
      const netGeneration =
        sheet[xlsx.utils.encode_cell({ c: 39, r: R })]?.v || 0;
      general += netGeneration;
      const plant = {
        plantName: sheet[xlsx.utils.encode_cell({ c: 3, r: R })]?.v,
        plantStateAbbreviation:
          sheet[xlsx.utils.encode_cell({ c: 2, r: R })]?.v,
        netGeneration,
        latitude: sheet[xlsx.utils.encode_cell({ c: 19, r: R })]?.v,
        longitude: sheet[xlsx.utils.encode_cell({ c: 20, r: R })]?.v,
      };
      plants.push(plant);
    }
    this.dal.insert(
      plants.map((plant) => ({
        ...plant,
        percentage: ((plant.netGeneration * 100) / general).toFixed(6),
      })),
    );
    return 'populated';
  }
}
