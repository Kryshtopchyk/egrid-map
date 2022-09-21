import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { WorkBook, WorkSheet } from 'xlsx';
import { ReadStream } from 'fs';

import { StateDal } from './state.dal';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StateService {
  constructor(
    private httpService: HttpService,
    private readonly dal: StateDal,
  ) {}

  getAll() {
    return this.dal.findAll();
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

    const sheet: WorkSheet = wb.Sheets[wb.SheetNames[4]];
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const states = [];
    let general = 0;

    for (let R = range.s.r + 2; R <= range.e.r; ++R) {
      const netGeneration = sheet[xlsx.utils.encode_cell({ c: 8, r: R })]?.v;
      general += netGeneration;
      const state = {
        stateAbbreviation: sheet[xlsx.utils.encode_cell({ c: 1, r: R })]?.v,
        netGeneration,
      };
      states.push(state);
    }
    this.dal.insert(
      states.map((state) => ({
        ...state,
        percentage: ((state.netGeneration * 100) / general).toFixed(6),
      })),
    );
    return 'populated';
  }
}
