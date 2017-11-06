import { Validate } from '@microsoft/sp-core-library';

export class WeatherHelper {

    public executeWeatherQuery(location, unit): Promise<any> {

        unit = unit == undefined ? 'C' : unit;
        const queryUri = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where u='${unit}' AND woeid in (select woeid from geo.places(1) where text="${location}")&format=json`;
        return fetch(queryUri).then((response) => {
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            return response.json();
        }).then(json => json.query.results === null ? null : json.query.results.channel);
    }

    /** Checks is the string is null or empty or undefined */
    public static isStringNullOrEmpty(value: string): boolean {
        try {
            Validate.isNonemptyString(value, 'value');
            return false;
        }
        catch (error) {
            return true;
        }
    }
}