export interface IWeatherProps {
  location: string;
  unit: string;
  showCondition: boolean;
  showConditionImage: boolean;
  showHigh: boolean;
  showLow: boolean;
  showHumidity: boolean;
  showWind: boolean;
  showLastUpdated: boolean;  
  showCurrentLocation:boolean;
  forecastLength:number;
  showTodayInfo:boolean;
}
