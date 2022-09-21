import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MapComponent } from './map/map.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class ComponentsModule {}
