import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Plant, PlantDocument } from '../../schemas';

@Injectable()
export class PlantDal {
  constructor(
    @InjectModel(Plant.name)
    private model: Model<PlantDocument>,
  ) {}

  findAll(limit: number, state: string = '') {
    return this.model
      .find(state ? { plantStateAbbreviation: { $eq: state } } : {})
      .sort({ netGeneration: -1 })
      .limit(limit)
      .exec();
  }

  insert(docs: Plant[]) {
    return this.model.insertMany(docs);
  }

  clear() {
    return this.model.deleteMany();
  }
}
