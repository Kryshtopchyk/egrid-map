import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';

import { PlantsService } from '../../services/plants.service';
import { StatesService } from '../../services/states.service';
import { Plant } from '../../types';
import { getInitExportData } from '../../utils';

declare const simplemaps_usmap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('numberOfPlants') numberOfPlants?: ElementRef;
  isMapShow = true;
  numberOfPlantsByFilter = 15;
  matData = getInitExportData;

  constructor(
    private readonly plantService: PlantsService,
    private readonly statesService: StatesService
  ) {}

  ngOnInit(): void {
    this.matData = getInitExportData;

    this.statesService.getStates().subscribe((states) => {
      states.forEach((state) => {
        this.matData.state_specific[
          state.stateAbbreviation
        ].description = `Net Generation: ${state.netGeneration} MWh, percentage: ${state.percentage}%`;
      });
    });

    simplemaps_usmap.hooks.back = () => {
      this.matData.locations = [];
      this.getPlants(this.numberOfPlants?.nativeElement.value, 12);
    };
    simplemaps_usmap.hooks.zoomable_click_state = (id: string) => {
      this.getPlants(this.numberOfPlantsByFilter, 3, id);
    };
  }

  ngAfterViewInit(): void {
    fromEvent(this.numberOfPlants?.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.getPlants(this.numberOfPlants?.nativeElement.value, 12);
        })
      )
      .subscribe();
  }

  private getPlants(numberOfPlants: number, size: number, id = '') {
    this.plantService.getPlants(numberOfPlants, id).subscribe((plants) => {
      this.matData.locations = plants.map((plant: Plant, i: number) => ({
        name: plant.plantName,
        lat: plant.latitude,
        lng: plant.longitude,
        description: `Net Generation: ${plant.netGeneration} MWh, percentage: ${plant.percentage}%`,
        color: 'default',
        zoomable: 'yes',
        type: 'default',
        size: size,
      }));
      this.refreshMap();
    });
  }

  private refreshMap() {
    setTimeout(() => {
      simplemaps_usmap.mapdata = this.matData;
      simplemaps_usmap.load();
    });
  }
}
