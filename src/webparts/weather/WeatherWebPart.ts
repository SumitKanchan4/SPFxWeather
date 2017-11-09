import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import Weather from './components/Weather';
import { IWeatherProps } from './components/IWeatherProps';
import { IWeatherWebPartProps } from './IWeatherWebPartProps';

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWeatherProps> = React.createElement(
      Weather,
      {
        location: this.properties.location,
        unit: this.properties.unit,
        showLastUpdated: this.properties.showLastUpdated,
        showCurrentLocation: this.properties.showCurrentLocation,
        forecastLength: this.properties.forecastLength == undefined ? 0 : this.properties.forecastLength,
        showTodayInfo: this.properties.forecastLength > 0 || this.properties.showTodayInfo
      }
    );
   
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  } 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure the Weather Webpart settings'
          },
          groups: [
            {
              groupName: 'Basic Configuration',
              groupFields: [
                PropertyPaneToggle('showCurrentLocation', {
                  checked: false,
                  offText: 'Enable to show weather of user location',
                  onText: 'Disable to hide weather of user location',
                  label: 'Use user location',
                  disabled: true
                }),
                PropertyPaneTextField('location', {
                  label: this.properties.showCurrentLocation ? 'Enter the default location' : 'Enter location'
                }),
                PropertyPaneDropdown('unit', {
                  label: 'Select temperature unit',
                  options: [
                    { key: 'C', text: 'Celcius' },
                    { key: 'F', text: 'Farenhite' }
                  ],
                  selectedKey: 'C'
                }),
                PropertyPaneSlider('forecastLength', {
                  min: 0,
                  max: 9,
                  ariaLabel: 'Select the number of days need to be shown in the forecast',
                  label: 'Select the number of days need to be shown in the forecast',
                  value: 0
                }),
                PropertyPaneToggle('showLastUpdated', {
                  checked: false,
                  offText: 'Enable to show Last Updated',
                  onText: 'Disable to hide Last Updated',
                  label: 'Last Updated'
                }),
                PropertyPaneToggle('showTodayInfo', {
                  checked: true,
                  offText: 'Enable to show detail Info of today weather',
                  onText: 'Disable to hide  detail Info of today weather',
                  label: 'Dsiplay today weather information'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
