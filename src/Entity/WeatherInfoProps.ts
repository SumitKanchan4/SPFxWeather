export class WeatherCondition{
    code:string;
    date:string;
    day:string;
    high:string;
    low:string;
    text:string;
}

export class UnitInfo{
    distance:string;
    pressure:string;
    speed:string;
    temperature:string;
}

export class WeatherInfoProps {
    title: string;
    description: string;
    lastUpdated: string;
    city: string;
    country: string;
    region: string;
    windDirection:string;
    windSpeed:string;
    humidity:string;
    visibility:string;
    sunrise:string;
    sunset:string;
    condition:WeatherCondition[];
    currentTemp: string;
}