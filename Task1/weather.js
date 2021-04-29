window.onload = function () {
  const cityWeatherFile = './weather.json';
  fetch(cityWeatherFile)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log('Weather is constantly updating!');
      getWeatherInfo(data);
      setTimeout(function () {
        getWeatherInfo(data);
        window.onload();
        console.log(data);
      }, 5000);
      //setTimeout(getWeatherInfo(data), 5000);
      // setTimeout(function updateWeather() {
      //   console.log('Weather is constantly updating!');
      //   getWeatherInfo(data);
      //   setTimeout(updateWeather, 5000);
      // }, 5000);
    })
    .catch((error) => {
      var div = document.getElementById('update-message');
      div.append('Error Loading Data');
      console.log('Error loading data: ' + error);
    });

  const getWeatherInfo = (data) => {
    let table = document.getElementById('table-details');
    table.innerHTML = '';
    //let container = document.getElementById('table-display');
    for (let i = 0; i < data.cities.length; i++) {
      let row = document.createElement('tr');
      // let tdata = document.createElement('td');

      table.appendChild(row);
      row.innerHTML =
        '<td>' +
        data.cities[i].name +
        '</td>' +
        '<td>' +
        data.cities[i].currentCondition +
        '</td>';
      //let table = document.createElement('table');
      // table.innerHTML =
      //   '<tr>' +
      //   '<td>' +
      //   data.cities[i].name +
      //   '</td>' +
      //   '<td>' +
      //   data.cities[i].currentCondition +
      //   '</td>' +
      //   '<td>' +
      //   data.cities[i].temperature +
      //   '</td>' +
      //   '<td>' +
      //   data.cities[i].windSpeed +
      //   '</td>' +
      //   '<td>' +
      //   data.cities[i].windDirection +
      //   '</td>' +
      //   '<td>' +
      //   data.cities[i].windChillFactor +
      //   '</td>' +
      //   '<td>' +
      //   data.cities[i].image +
      //   '</td>' +
      //   '</tr>';
      // container.appendChild(table);
      //console.log('Weather is constantly updating!');
    }
  };
};
