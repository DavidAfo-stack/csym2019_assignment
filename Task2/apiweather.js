//load the data containing cities into an object list using json format
var citiesCategory = {
    england: [
        'Bath',
        'Bristol',
        'Birmingham',
        'Bradford',
        'Bournemouth',
        'Cambridge',
        'Canterbury',
        'Chester',
        'Derby',
        'Exeter',
        'Gloucester',
        'Lancaster',
        'Leeds',
        'Liverpool',
        'London',
        'Manchester',
        'Newcastle upon Tyne',
        'Norwich',
        'Nottingham',
        'Oxford',
        'Plymouth',
        'Ripon',
        'Salford',
        'Sheffield',
        'Wakefield',
        'Wolverhampton',
        'Worcester',
    ],

    scotland: ['Aberdeen', 'Dundee', 'Edinburgh', 'Glasgow', 'Inverness'],

    northernIreland: ['Armagh', 'Belfast', 'Londonderry', 'Lisburn', 'Newry'],

    wales: ['Bangor', 'Cardiff', 'Newport', 'Swansea'],
};

//dynamicall load data into the city dropdown list when a country is selected
const getCities = (value) => {
    if (value.length == 0) {
        document.getElementById('cities').innerHTML = '<option></option>';
    } else {
        var cityOptions = '';
        for (cityId in citiesCategory[value]) {
            cityOptions += '<option>' + citiesCategory[value][cityId] + '</option>';
        }
        document.getElementById('cities').innerHTML = cityOptions;
    }
};

//declare variables
var button = document.querySelector('.btn');
var cityInfo = document.querySelector('#cities');
var nameOfCity = document.querySelector('.cityName');
var temp1 = document.querySelector('.temperatureInFarenheit');
var temp2 = document.querySelector('.temperatureInCelcius');
var severeMsg = document.getElementById('severe-weather-condition');
var weatherCondition = document.querySelector('.weatherCondition');
var windSpeed1 = document.querySelector('.windSpeedInMPH');
var windSpeed2 = document.querySelector('.windSpeedInKMH');
var windDirection = document.querySelector('.windDirection');
var date = document.querySelector('.date');
var icons = document.getElementById('weatherIcons');
var pres = document.getElementById('pressure');

const milesToKmConverter = (val) => {
    return (val * 1.60934).toFixed(2) + 'km/h';
};

const farenheitToCelcius = (val) => {
    return ((val - 32) * (5 / 9)).toFixed(0) + '°C';
};

const showCautionIcon = () => {
    var img = document.getElementById('cautionImage');
    img.style.visibility = 'visible';
};

const getWindDirection = (val) => {
    if (val == 0) {
        return 'N';
    } else if (val > 0 && val < 90) {
        return 'NE';
    } else if (val == 90) {
        return 'E';
    } else if (val > 90 && val < 180) {
        return 'SE';
    } else if (val == 180) {
        return 'S';
    } else if (val > 180 && val < 270) {
        return 'SW';
    } else if (val == 270) {
        return 'W';
    } else {
        return 'NW';
    }
};

const getGeneralCondition = (val_temp, val_wind) => {
    val_temp = Number(val_temp);
    val_wind = Number(val_wind);
    if (val_temp > 35 || val_temp < -5 || val_wind > 50) {
        //showCautionIcon();
        return 'Severe Weather!';
    } else {
        return '';
    }
};

// const getWindSpeed = (val) => {
//     if (val > 50) {
//         showCautionIcon();
//         return ' Severe Weather!';
//     } else {
//         return '';
//     }
// };

const weatherData = (data) => {
    var nameVal = data['name'];
    var tempVal = data['main']['temp'];
    var presVal = data['main']['pressure'];
    var weatherConditionVal = data['weather'][0]['description'];
    var windSpeedVal = data['wind']['speed'];
    var windDirectionVal = data['wind']['deg'];
    var cloudICons = data['weather'][0]['icon'];
    //set inner html values
    nameOfCity.innerHTML = nameVal;
    temp1.innerHTML = tempVal.toFixed(0) + '°F';
    temp2.innerHTML = farenheitToCelcius(tempVal);
    //severeMsg.innerHTML = getGeneralCondition(1000, 10000);
    severeMsg.innerHTML = getGeneralCondition(farenheitToCelcius(tempVal), windSpeedVal);
    weatherCondition.innerHTML = weatherConditionVal;
    date.innerHTML = new Date().toDateString();
    windSpeed1.innerHTML = windSpeedVal.toFixed(2) + 'mph';
    windSpeed2.innerHTML = milesToKmConverter(windSpeedVal);
    windDirection.innerHTML =
        windDirectionVal + '° ' + getWindDirection(windDirectionVal);

    pres.innerHTML = presVal + ' hPa';

    icons.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${cloudICons}@2x.png`
    );

    document.getElementById('other-details').style.visibility = 'visible';

    console.log(data);
};

const getCityWeather = () => {
    const apiUrl =
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        cityInfo.value +
        '&appid=7e4547eeb4a8dbf3ed8cb577e5996225&units=imperial';
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => weatherData(data))
        .catch((error) => console.log('Error loading data'));
};
//button function
button.addEventListener('click', getCityWeather);

//farenheitToCelcius(tempVal)