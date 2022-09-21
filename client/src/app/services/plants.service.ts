import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Plant } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  private readonly routeURL = environment.API;

  constructor(private readonly http: HttpClient) {}

  getPlants(limit: number, state = ''): Observable<Plant[]> {
    return this.http.get<Plant[]>(
      `${this.routeURL}/plant?limit=${limit}&state=${state}`
    );
  }
}
