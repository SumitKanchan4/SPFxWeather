import * as React from 'react';
import styles from './Weather.module.scss';
import { IWeatherProps } from './IWeatherProps';
import { WeatherHelper } from '../../../Helper/WeatherHelper';
import { WeatherCondition, WeatherInfoProps, UnitInfo } from '../../../Entity/WeatherInfoProps';

export default class Weather extends React.Component<IWeatherProps, { dummyData: any }> {

  constructor(props: IWeatherProps) {
    super(props);

    this.state = {
      dummyData: undefined
    }
  }

  public render(): React.ReactElement<IWeatherProps> {
    return (
      <div>
        <div className={styles.weather}>
          <div className={styles.container}>
            {this.state.dummyData}
          </div>
        </div>
      </div>
    );
  }

  public componentWillMount(): void {
    this.getWeatherDetails(this.props);
  }

  public componentWillReceiveProps(nextProps: IWeatherProps, nextContext: any): void {
    this.getWeatherDetails(nextProps);
  }

  private getWeatherDetails(props: IWeatherProps): void {
    let oHelper: WeatherHelper = new WeatherHelper();
    this.setState({ dummyData: `Getting weather details` });
    oHelper.executeWeatherQuery(this.props.location, this.props.unit).then(weatherResp => {

      let weatherInfo: WeatherInfoProps = {
        title: weatherResp.title,
        city: weatherResp.location.city,
        country: weatherResp.location.country,
        region: weatherResp.location.region,
        description: '',
        humidity: weatherResp.atmosphere.humidity,
        visibility: weatherResp.atmosphere.visibility,
        sunrise: weatherResp.astronomy.sunrise,
        sunset: weatherResp.astronomy.sunset,
        currentTemp: weatherResp.item.temp,
        windSpeed: weatherResp.wind.spped,
        lastUpdated: weatherResp.lastBuildDate,
        windDirection: weatherResp.wind.direction,
        condition: this.getAllDaysWeather(weatherResp)
      }

      let unitsInfo: UnitInfo = {
        distance: weatherResp.units.distance,
        pressure: weatherResp.units.pressure,
        speed: weatherResp.units.speed,
        temperature: weatherResp.units.temperature
      }

      this.setState({ dummyData: JSON.stringify(weatherInfo) });
    });
  }

  private getAllDaysWeather(weatherResp: any): WeatherCondition[] {

    let weatherConditions: WeatherCondition[] = [];
    weatherResp.item.forecast.forEach(item => {
      weatherConditions.push({
        code: item.code,
        date: item.date,
        day: item.day,
        high: item.high,
        low: item.low,
        text: item.text
      });
    });

    return weatherConditions;
  }

  private setGeoLocation(position: any): void {

    if (typeof (Storage) != undefined && localStorage.getItem('SPFxWeatherLocationLattitude') != undefined) {
      localStorage.setItem('SPFxWeatherLocationLattitude', position.coords.latitude);
      localStorage.setItem('SPFxWeatherLocationLongitude', position.coords.longitude);
    }
  }
}
