import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { PlantDataController } from './plant-data.controller';
import { PlantDataService } from './plant-data.service';
import { PlantDataDal } from './plant-data.dal';
import { PlantData, PlantDataSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlantData.name, schema: PlantDataSchema },
    ]),
    HttpModule,
  ],
  controllers: [PlantDataController],
  providers: [PlantDataService, PlantDataDal],
  exports: [],
})
export class PlantDataModule {}
