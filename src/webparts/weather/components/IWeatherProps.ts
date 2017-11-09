export interface IWeatherProps {
  location: string;
  unit: string;
  showLastUpdated: boolean;  
  showCurrentLocation:boolean;
  forecastLength:number;
  showTodayInfo:boolean;
}
