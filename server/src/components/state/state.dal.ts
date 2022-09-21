import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { State, StateDocument } from '../../schemas';

@Injectable()
export class StateDal {
  constructor(
    @InjectModel(State.name)
    private model: Model<StateDocument>,
  ) {}

  findAll() {
    return this.model.find().exec();
  }

  insert(docs: State[]) {
    return this.model.insertMany(docs);
  }

  clear() {
    return this.model.deleteMany();
  }
}
