import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { State } from '../types';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  private readonly routeURL = environment.API;

  constructor(private readonly http: HttpClient) {}

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.routeURL}/state-data`);
  }
}
