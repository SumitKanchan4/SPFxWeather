import * as React from 'react';
import styles from './Weather.module.scss';
import { IWeatherProps } from './IWeatherProps';
import { WeatherHelper } from '../../../Helper/WeatherHelper';
import { WeatherCondition, WeatherInfoProps, UnitInfo } from '../../../Entity/WeatherInfoProps';
import { Image } from 'office-ui-fabric-react/lib/Image';

export default class Weather extends React.Component<IWeatherProps, { weatherInfo?: WeatherInfoProps, units?: UnitInfo, status?: string }> {

  constructor(props: IWeatherProps) {
    super(props);

    this.state = {
      weatherInfo: undefined,
      units: undefined,
      status: `Getting weather information fromYahoo`
    };
  }

  public render(): React.ReactElement<IWeatherProps> {
    return (
      <div>
        <div className={styles.weather}>
          <div className={styles.container}>
            {
              this.state.weatherInfo != undefined ?
                <div className={`ms-Grid`}>

                  <div className={`ms-Grid-row`} >
                    <div className={`ms-Grid-col ms-u-sm12`}>

                      <div className={`ms-Grid`}>

                        {/* Last Updated */}
                        {
                          this.props.showLastUpdated ?
                            <div className={`ms-Grid-row ${styles.lstupd} ${styles.clr}`} >
                              <div className={`ms-Grid-col ms-u-sm12`}>
                                Last Updated: {this.state.weatherInfo.lastUpdated}
                              </div>
                            </div>
                            :
                            <div></div>
                        }

                        {/* Header */}
                        <div className={`ms-Grid-row ${styles.header} ${styles.clr}`} >
                          <div className={`ms-Grid-col ms-u-sm10`}>
                            {this.state.weatherInfo.city}, {this.state.weatherInfo.region}, {this.state.weatherInfo.country}
                          </div>

                          <div className={`ms-Grid-col ms-u-sm2`}>
                            {this.state.weatherInfo.currentTemp}&deg;{this.state.units.temperature}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show all info */}
                  {
                    this.props.showTodayInfo ?
                      <div className={`ms-Grid-row ${styles.seperator}`} >
                        <div className={`ms-Grid-col  ms-u-sm12`}>

                          <div className={`ms-Grid`}>
                            <div className={`ms-Grid-row`} >

                              <div className={`ms-Grid-col ms-u-md2`}>
                                <Image src={this.state.weatherInfo.currentCode} role={`presentation`} />
                              </div>

                              <div className={`ms-Grid-col ms-u-md2 ms-u-sm4`}>
                                <div className={`ms-Grid`}>
                                  <div className={`ms-Grid-row ${styles.topRow}`} >
                                    <div className={`ms-Grid-col ms-u-sm12`}>
                                      High: {this.state.weatherInfo.currentHigh}&deg;{this.state.units.temperature}
                                    </div>
                                  </div>
                                  <div className={`ms-Grid-row ${styles.topRow}`} >
                                    <div className={`ms-Grid-col ms-u-sm12`}>
                                      Low: {this.state.weatherInfo.currentLow}&deg;{this.state.units.temperature}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className={`ms-Grid-col ms-u-md4 ms-u-sm4`}>
                                <div className={`ms-Grid`}>
                                  <div className={`ms-Grid-row ${styles.topRow}`} >
                                    <div className={`ms-Grid-col ms-u-sm12`}>
                                      Wind: {this.state.weatherInfo.windSpeed} {this.state.units.speed}
                                    </div>
                                  </div>
                                  <div className={`ms-Grid-row ${styles.topRow}`} >
                                    <div className={`ms-Grid-col ms-u-sm12`}>
                                      Humidity: {this.state.weatherInfo.humidity}%
                                </div>
                                  </div>
                                </div>
                              </div>

                              <div className={`ms-Grid-col ms-u-md4 ms-u-hiddenMdDown`}>
                                <div className={`ms-Grid`}>
                                  <div className={`ms-Grid-row ${styles.topRow}`} >
                                    <div className={`ms-Grid-col ms-u-sm12`}>
                                      Sunrise: {this.state.weatherInfo.sunrise}
                                    </div>
                                  </div>
                                  <div className={`ms-Grid-row ${styles.topRow}`} >
                                    <div className={`ms-Grid-col ms-u-sm12`}>
                                      Sunset: {this.state.weatherInfo.sunset}
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>

                        </div>
                      </div>
                      :
                      <div></div>
                  }

                  {/* show forecast */}
                  <div className={`ms-Grid-row ${styles.seperator}`}>
                    <div className={`ms-Grid-col ms-u-sm12`}>
                      {
                        this.state.weatherInfo.condition.map((weatherItem) => {
                          return (
                            <div className={`ms-Grid`}>
                              <div className={`ms-Grid-row`} >

                                {/* Day/Date */}
                                <div className={`ms-Grid-col ms-u-sm6`}>
                                  <div className={`ms-Grid`}>
                                    <div className={`ms-Grid-row ${styles.topRow}`} >
                                      <div className={`ms-Grid-col ms-u-sm12`}>
                                        {weatherItem.day}
                                      </div>
                                    </div>
                                    <div className={`ms-Grid-row ${styles.topRow}`} >
                                      <div className={`ms-Grid-col ms-u-sm12`}>
                                        {weatherItem.date}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Image */}
                                <div className={`ms-Grid-col ms-u-sm3`}>
                                  <Image src={weatherItem.code} role={`presentation`} />
                                </div>

                                {/* High /Low */}
                                <div className={`ms-Grid-col ms-u-sm3`}>
                                  <div className={`ms-Grid`}>
                                    <div className={`ms-Grid-row ${styles.topRow}`} >
                                      <div className={`ms-Grid-col ms-u-sm12`}>
                                        High: {weatherItem.high}
                                      </div>
                                    </div>
                                    <div className={`ms-Grid-row ${styles.topRow}`} >
                                      <div className={`ms-Grid-col ms-u-sm12`}>
                                        Low: {weatherItem.low}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>

                </div>
                :
                <div className={`ms-Grid`}>
                  <div className={`ms-Grid-row`} >
                    <div className={`ms-Grid-col ms-u-sm12`}>
                      {this.state.status}
                    </div>
                  </div>
                </div>
            }

          </div>
        </div>

      </div>
    );
  }

  public componentWillMount(): void {
    this.getWeatherDetails(this.props);
  }

  public componentWillReceiveProps(nextProps: IWeatherProps, nextContext: any): void {

    if (typeof (Storage) != undefined && (this.props.location != nextProps.location || this.props.unit != nextProps.unit)) {
      localStorage.removeItem('SPFxWeatherInfo');
    }

    this.getWeatherDetails(nextProps);
  }

  private getWeatherDetails(props: IWeatherProps): void {

    if (!WeatherHelper.isStringNullOrEmpty(props.location)) {

      if (!this.getWeatherInfoFromLocalStorage(props)) {
        let oHelper: WeatherHelper = new WeatherHelper();
        oHelper.executeWeatherQuery(props.location, props.unit).then(weatherResp => {

          if (weatherResp != undefined && weatherResp != null) {

            let unitsInfo: UnitInfo = {
              distance: weatherResp.units.distance,
              pressure: weatherResp.units.pressure,
              speed: weatherResp.units.speed,
              temperature: weatherResp.units.temperature
            };

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
              currentTemp: weatherResp.item.condition.temp,
              windSpeed: weatherResp.wind.speed,
              lastUpdated: weatherResp.lastBuildDate,
              windDirection: weatherResp.wind.direction,
              condition: this.getAllDaysWeather(weatherResp),
              currentHigh: '',
              currentLow: '',
              currentCode: ''
            };

            let weatherToday: WeatherCondition[] = weatherInfo.condition.splice(0, 1);
            weatherInfo.currentHigh = weatherToday[0].high;
            weatherInfo.currentLow = weatherToday[0].low;
            weatherInfo.currentCode = weatherToday[0].code;

            this.setWeatherInfoToLocalStorage(weatherInfo, unitsInfo);
            weatherInfo.condition.splice(props.forecastLength, (weatherInfo.condition.length - props.forecastLength));

            this.setState({ weatherInfo: weatherInfo, units: unitsInfo });
          }
          else {
            this.setState({ status: `Cannot get weather for location: ${props.location}` });
          }
        });
      }
    }
    else {
      this.setState({ weatherInfo: undefined, units: undefined, status: `Webpart not configured...` });
    }
  }

  private getAllDaysWeather(weatherResp: any): WeatherCondition[] {

    let weatherConditions: WeatherCondition[] = [];
    weatherResp.item.forecast.forEach((item, index) => {

      weatherConditions.push({
        code: `http://l.yimg.com/a/i/us/we/52/${item.code}.gif `,
        date: item.date,
        day: item.day,
        high: item.high,
        low: item.low,
        text: item.text
      });
    });

    return weatherConditions;
  }

  private setWeatherInfoToLocalStorage(weatherInfo: WeatherInfoProps, unitsInfo: UnitInfo): void {

    if (typeof (Storage) != undefined) {
      let expiration: Date = new Date();
      expiration.setMinutes(expiration.getMinutes() + 30);  // Save to local storage for a time period of 30 minutes
      localStorage.setItem('SPFxWeatherInfo', JSON.stringify({ weather: weatherInfo, unit: unitsInfo, expire: expiration }));
    }
  }

  private getWeatherInfoFromLocalStorage(props: IWeatherProps): boolean {

    let gotValue: boolean = false;
    if (typeof (Storage) != undefined && localStorage.getItem('SPFxWeatherInfo') != undefined && localStorage.getItem('SPFxWeatherInfo') != null) {

      let duration: any = (new Date(JSON.parse(localStorage.getItem("SPFxWeatherInfo")).expire)).valueOf() - (new Date()).valueOf();

      if (duration >= 0) {
        let weather: WeatherInfoProps = JSON.parse(localStorage.getItem("SPFxWeatherInfo")).weather;
        weather.condition.splice(props.forecastLength, (weather.condition.length - props.forecastLength));
        this.setState({ weatherInfo: weather, units: JSON.parse(localStorage.getItem("SPFxWeatherInfo")).unit });
        gotValue = true;
      }
      else {
        gotValue = false;
      }
    }
    else {
      gotValue = false;
    }

    return gotValue;
  }

  // private setGeoLocation(position: any): void {

  //   alert(position.coords.latitude)
  //   // if (typeof (Storage) != undefined && localStorage.getItem('SPFxWeatherLocationLattitude') != undefined) {
  //   //   localStorage.setItem('SPFxWeatherLocationLattitude', position.coords.latitude);
  //   //   localStorage.setItem('SPFxWeatherLocationLongitude', position.coords.longitude);
  //   // }
  // }

  // private getCurrentLocation(): void {
  //   if (navigator.geolocation) {
  //     alert('1');
  //     navigator.geolocation.getCurrentPosition(this.setGeoLocation);
  //   }
  // }
}
