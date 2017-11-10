# SharePoint Framework Weather WebPart

Hi Friends,

I have come up with a weather webpart, to let you know about the weather outside event when you are working inside. Weather webpart is the most common webpart many of the user love to have them on their site.

So, I have created a weather webpart which fetches its data from yahoo and displays in a very beautiful format.

<image>

# WebPart Features!
Weather webpart displays the following information
  - High Temperature
  - Low Temperature
  - Wind speed
  - Humidity
  - Sunrise
  - Sunset
  - Condition Image
  - Forecast for upto 10 days
  - Day and date display for easy readability

### You can configure the webpart with just few clicks
  - Enter any City name and see the results right away
  - Option to select between the Celsius and Fahrenheit
  - Select how many days to be displayed in the forecast. Easy to use slider to select the days
  - Show the information when the information was last updated
  - Option to display only the header with the temperature information - compact and informative.


>Since i am using the Yahoo API which has restricted to the number of hits per day, so by default new data will be processed after 30 minutes (does not auto refresh bu, gets data if the last updated is more that 30 min and page is refreshed manually). If you are having more than that please get the yahoo key and need to make changes in the query. 

Do comment on how you feel about the webpart and if there is anymore functionality that is missed and you would like to have.

Happy Coding
Sumit Kanchan