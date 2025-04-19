export interface Location {
  id: string;
  name: string;
  country: string;
  airportCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
