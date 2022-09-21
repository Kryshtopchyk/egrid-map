import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { PlantDal } from './plant.dal';
import { Plant, PlantSchema } from '../../schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    HttpModule,
  ],
  controllers: [PlantController],
  providers: [PlantService, PlantDal],
  exports: [],
})
export class PlantModule {}
