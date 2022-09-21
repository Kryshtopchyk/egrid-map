import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { StateDataController } from './state-data.controller';
import { StateDataService } from './state-data.service';
import { StateDataDal } from './state-data.dal';
import { StateData, StateDataSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StateData.name, schema: StateDataSchema },
    ]),
    HttpModule,
  ],
  controllers: [StateDataController],
  providers: [StateDataService, StateDataDal],
  exports: [],
})
export class StateDataModule {}
