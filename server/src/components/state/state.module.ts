import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateDal } from './state.dal';
import { State, StateSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
    HttpModule,
  ],
  controllers: [StateController],
  providers: [StateService, StateDal],
  exports: [],
})
export class StateModule {}
