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
                        <div className={`ms-Grid-row ${styles.lstupd} ${styles.clr}`} >
                          <div className={`ms-Grid-col ms-u-sm12`}>
                            Last Updated: {this.state.weatherInfo.lastUpdated}
                          </div>
                        </div>

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
                  <div className={`ms-Grid-row`} >
                    <div className={`ms-Grid-col  ms-u-sm12`}>

                      <div className={`ms-Grid ${styles.seperator}`}>
                        <div className={`ms-Grid-row`} >

                          <div className={`ms-Grid-col ms-u-md2`}>
                            <Image src={this.state.weatherInfo.condition[0].code} role={`presentation`} />
                          </div>

                          <div className={`ms-Grid-col ms-u-md2 ms-u-sm4`}>
                            <div className={`ms-Grid`}>
                              <div className={`ms-Grid-row ${styles.topRow}`} >
                                <div className={`ms-Grid-col ms-u-sm12`}>
                                  High: {this.state.weatherInfo.condition[0].high}
                                </div>
                              </div>
                              <div className={`ms-Grid-row ${styles.topRow}`} >
                                <div className={`ms-Grid-col ms-u-sm12`}>
                                  Low: {this.state.weatherInfo.condition[0].low}
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

                  {/* Powered by Yahoo */}
                  <div className={`ms-Grid-row ${styles.lstupd} ${styles.clr}`}>
                    <div className={`ms-Grid-col ms-u-sm12`}>
                      <span>Powered by </span><Image src={`https://cdn3.iconfinder.com/data/icons/social-network-round-gloss-shine/512/Yahoo_Social-Network-Communicate-Page-Curl-Effect-Circle-Glossy-Shadow-Shine.png`} className={styles.pwrdBy} />
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
    this.getWeatherDetails(nextProps);
  }

  private getWeatherDetails(props: IWeatherProps): void {

    if (props.location != undefined) {

      let oHelper: WeatherHelper = new WeatherHelper();
      oHelper.executeWeatherQuery(this.props.location, this.props.unit).then(weatherResp => {

        if (weatherResp != undefined && weatherResp != null) {
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
            condition: this.getAllDaysWeather(weatherResp)
          }

          let unitsInfo: UnitInfo = {
            distance: weatherResp.units.distance,
            pressure: weatherResp.units.pressure,
            speed: weatherResp.units.speed,
            temperature: weatherResp.units.temperature
          }

          this.setState({ weatherInfo: weatherInfo, units: unitsInfo });
        }
        else {
          this.setState({ status: `Cannot get weather for location: ${props.location}` });
        }
      });
    }
    else {
      this.setState({ status: `Webpart not configured...` });
    }
  }

  private getAllDaysWeather(weatherResp: any): WeatherCondition[] {

    let weatherConditions: WeatherCondition[] = [];
    weatherResp.item.forecast.forEach(item => {
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

  private setGeoLocation(position: any): void {

    if (typeof (Storage) != undefined && localStorage.getItem('SPFxWeatherLocationLattitude') != undefined) {
      localStorage.setItem('SPFxWeatherLocationLattitude', position.coords.latitude);
      localStorage.setItem('SPFxWeatherLocationLongitude', position.coords.longitude);
    }
  }
}
