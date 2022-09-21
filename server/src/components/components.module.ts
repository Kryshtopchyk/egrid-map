import { Module } from '@nestjs/common';

import { PlantModule } from './plant/plant.module';
import { StateModule } from './state/state.module';

@Module({
  imports: [StateModule, PlantModule],
})
export class ComponentsModule {}
