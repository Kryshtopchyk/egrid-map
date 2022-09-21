import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { StateData, StateDataDocument } from '../../schemas';

@Injectable()
export class StateDataDal {
  constructor(
    @InjectModel(StateData.name)
    private model: Model<StateDataDocument>,
  ) {}

  findAll() {
    console.log('qwe');
    return this.model.find().exec();
  }

  insert(docs: StateData[]) {
    return this.model.insertMany(docs);
  }

  clear() {
    return this.model.deleteMany();
  }
}
