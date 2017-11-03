import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown
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
        showCondition: this.properties.showCondition,
        showConditionImage: this.properties.showConditionImage,
        showHigh: this.properties.showHigh,
        showLow: this.properties.showLow,
        showHumidity: this.properties.showHumidity,
        showWind: this.properties.showWind,
        showLastUpdated: this.properties.showLastUpdated,
        showCurrentLocation: this.properties.showCurrentLocation
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private showLocation(position: any): void {
    alert(position.coords.latitude);
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
                  checked: true,
                  offText: 'Enable to show weather of user location',
                  onText: 'Disable to hide weather of user location',
                  label: 'Use user location'
                }),
                PropertyPaneTextField('location', {
                  label: this.properties.showCurrentLocation ? 'Enter the default location' : 'Enter location'
                }),
                PropertyPaneDropdown('unit', {
                  label: 'Select temperature unit',
                  options: [
                    { key: 'Celcius', text: 'Celcius' },
                    { key: 'Farenhite', text: 'Farenhite' }
                  ],
                  selectedKey: 'Celcius'
                })
              ]
            }
          ]
        },
        {
          header: {
            description: 'Choose what all information needs to be displayed'
          },
          groups: [
            {
              groupName: 'Advance Configuration',
              groupFields: [
                PropertyPaneToggle('showCondition', {
                  checked: false,
                  offText: 'Enable to show Condition',
                  onText: 'Disable to hide Condition',
                  label: 'Condition'
                }),
                PropertyPaneToggle('showConditionImage', {
                  checked: false,
                  offText: 'Enable to show Condition Image',
                  onText: 'Disable to hide Condition Image',
                  label: 'Condition Image'
                }),
                PropertyPaneToggle('showHigh', {
                  checked: false,
                  offText: 'Enable to show High Temperature',
                  onText: 'Disable to hide High Temperature',
                  label: 'High Temprature'
                }),
                PropertyPaneToggle('showLow', {
                  checked: false,
                  offText: 'Enable to show Low Temperature',
                  onText: 'Disable to hide Low Temperature',
                  label: 'Low Temperature'
                }),
                PropertyPaneToggle('showHumidity', {
                  checked: false,
                  offText: 'Enable to show Humidity',
                  onText: 'Disable to hide Humidity',
                  label: 'Humidity'
                }),
                PropertyPaneToggle('showWind', {
                  checked: false,
                  key: 'showChecked',
                  offText: 'Enable to show Wind',
                  onText: 'Disable to hide Wind',
                  label: 'Wind'
                }),
                PropertyPaneToggle('showLastUpdated', {
                  checked: false,
                  offText: 'Enable to show Last Updated (updates every hour)',
                  onText: 'Disable to hide Last Updated',
                  label: 'Last Updated'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
