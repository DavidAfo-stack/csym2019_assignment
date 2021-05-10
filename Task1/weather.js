window.onload = function() {
    const cityWeatherFile = './weather.json';
    fetch(cityWeatherFile)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            getWeatherInfo(data);
            setTimeout(function() {
                getWeatherInfo(data);
                window.onload();
                console.log(data);
            }, 5000);
        })
        .catch((error) => {
            var div = document.getElementById('update-status-message');
            div.append('Error Loading Data');
            console.log('Error loading data: ' + error);
        });

    const getWeatherInfo = (data) => {
        let table = document.getElementById('table-display');
        table.innerHTML = '';
        let row = document.createElement("tr");
        row.innerHTML = "<th>City Id</th>" +
            "<th>City Name</th>" +
            "<th>Current Condition</th>" +
            "<th>Cloud Icon</th>" +
            "<th>Temperature</th>" +
            "<th>Wind Speed</th>" +
            "<th>Wind Direction</th>" +
            "<th>Wind Chill Factor</th>"

        table.append(row)

        const generateIcons = (description) => {
            if (description == 'snow') {
                return "../weather_icons/snow.png";
            } else if (description == 'cloud') {
                return "../weather_icons/cloud.png";
            } else if (description == 'sleet') {
                return "../weather_icons/sleet.png";
            } else if (description == 'sun') {
                return "../weather_icons/sun.png";
            } else if (description == 'hail') {
                return "../weather_icons/hail.png";
            } else if (description == 'heavy cloud') {
                return "../weather_icons/heavycloud.png";
            } else if (description == 'heavy rain') {
                return "../weather_icons/heavyrain.png";
            } else if (description == 'mist') {
                return "../weather_icons/mist.png";
            } else if (description == 'rain') {
                return "../weather_icons/rain.png";
            } else if (description == 'sun and cloud') {
                return "../weather_icons/sun_and_cloud.png";
            } else if (description == 'thunderstorm') {
                return "../weather_icons/thunderstorm.png";
            }
        }

        for (let i = 0; i < data.cities.length; i++) {
            let row = document.createElement('tr');
            row.setAttribute('class', "active-row")
            row.innerHTML =
                '<td>' +
                data.cities[i].id +
                '</td>' +
                '<td>' +
                data.cities[i].name +
                '</td>' +
                '<td>' +
                data.cities[i].currentCondition +
                '</td>' +
                `<td><img src = ${generateIcons(data.cities[i].currentCondition)}  alt = ""  width= 35px height = 35px></td>` +
                '<td>' +
                data.cities[i].temperature + "°C" +
                '</td>' +
                '<td>' +
                data.cities[i].windSpeed +
                '</td>' +
                '<td>' +
                data.cities[i].windDirection +
                '</td>' +
                '<td>' +
                data.cities[i].windChillFactor +
                '</td>';

            table.appendChild(row);
        }

    };
};