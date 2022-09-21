import { Module } from '@nestjs/common';

import { PlantDataModule } from './plant-data/plant-data.module';
import { StateDataModule } from './state-data/state-data.module';

@Module({
  imports: [StateDataModule, PlantDataModule],
})
export class ComponentsModule {}
