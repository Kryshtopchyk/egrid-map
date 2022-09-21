import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { PlantData, PlantDataDocument } from '../../schemas';

@Injectable()
export class PlantDataDal {
  constructor(
    @InjectModel(PlantData.name)
    private model: Model<PlantDataDocument>,
  ) {}

  findAll(limit: number, state: string = '') {
    return this.model
      .find(state ? { plantStateAbbreviation: { $eq: state } } : {})
      .sort({ netGeneration: -1 })
      .limit(limit)
      .exec();
  }

  insert(docs: PlantData[]) {
    return this.model.insertMany(docs);
  }

  clear() {
    return this.model.deleteMany();
  }
}
