export interface MapData {
  main_settings: any;
  state_specific: any;
  locations: Location[] | [];
  labels: any;
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  description: string;
  color: string;
  zoomable: string;
  type: string;
  size: number;
}
