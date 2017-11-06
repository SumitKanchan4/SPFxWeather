export class WeatherCondition{
    public code:string;
    public date:string;
    public day:string;
    public  high:string;
    public low:string;
    public text:string;
}

export class UnitInfo{
    public distance:string;
    public pressure:string;
    public speed:string;
    public temperature:string;
}

export class WeatherInfoProps {
    public title: string;
    public description: string;
    public lastUpdated: string;
    public city: string;
    public country: string;
    public region: string;
    public windDirection:string;
    public windSpeed:string;
    public humidity:string;
    public visibility:string;
    public sunrise:string;
    public sunset:string;
    public condition:WeatherCondition[];
    public currentTemp: string;
    public currentHigh:string;
    public currentLow:string;
    public currentCode:string;
}