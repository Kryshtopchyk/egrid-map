import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  Subscription,
  take,
  tap,
} from 'rxjs';

import { PlantsService } from '../../services/plants.service';
import { StatesService } from '../../services/states.service';
import { Plant } from '../../types';
import { getInitMapData } from '../../utils';

declare const simplemaps_usmap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('numberOfPlants') numberOfPlants?: ElementRef;
  isMapShow = true;
  numberOfPlantsByFilter = 15;
  matData = getInitMapData;
  subscription?: Subscription;

  constructor(
    private readonly plantService: PlantsService,
    private readonly statesService: StatesService
  ) {}

  ngOnInit(): void {
    this.statesService
      .getStates()
      .pipe(take(1))
      .subscribe((states) => {
        states.forEach((state) => {
          this.matData.state_specific[
            state.stateAbbreviation
          ].description = `Net Generation: ${state.netGeneration} MWh, Percentage: ${state.percentage}%`;
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
    const numberOfPlantsKeyUp$ = fromEvent(
      this.numberOfPlants?.nativeElement,
      'keyup'
    )
      .pipe(
        debounceTime(750),
        distinctUntilChanged(),
        tap(() => {
          this.getPlants(this.numberOfPlants?.nativeElement.value, 12);
        })
      )
      .subscribe();
    this.subscription?.add(numberOfPlantsKeyUp$);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private getPlants(numberOfPlants: number, size: number, id = '') {
    this.plantService
      .getPlants(numberOfPlants, id)
      .pipe(take(1))
      .subscribe((plants) => {
        this.matData.locations = plants.map((plant: Plant, i: number) => ({
          name: plant.plantName,
          lat: plant.latitude,
          lng: plant.longitude,
          description: `Net Generation: ${plant.netGeneration} MWh, Percentage: ${plant.percentage}%`,
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
