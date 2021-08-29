function script() {
  const form = document.getElementById("form-date")
const tableBody = document.getElementById("table-body")

const clearData = document.getElementById("clearData")
const chartBtn = document.getElementById("chartBtn")

tableBody.innerHTML = "";
let weatherDataAll = [];
let promises = [];

let chartDataTimeX = [];
let chartDataTemperatureY = [];

form.addEventListener("submit", e => {
  promises = []
  tableBody.innerHTML = ''
  e.preventDefault();
  var inputDate = form[0].value;
  var year = inputDate.slice(0, 4)
  var month = inputDate.slice(5, 7)
  var day = inputDate.substr(-2)
  for (let i = 1; i <= 4; i++ ) {
    if ((day <= 0) && ( month === 1)) {
      year = year - 1
      month = 12
      day = 31
    }
    if ( day <=  0 ) {
      month = month - 1
      day = 28
    } 
    const dynamic_url = `https://www.metaweather.com/api/location/44418/${year + "/" + month + "/" + day}/`
    promises.push(fetch(dynamic_url)
    .then(response => {
      if(response.ok) return response.json();
      throw new Error(response.statusText)
      })
      );
    day = day - 1 
  }

  Promise.all(promises)
  .then( data => {
    var fetchedData = data[0]
    fetchedData.forEach((item) => {
      weatherDataAll.push(item)
      chartDataTimeX.push(item["created"].substr(0,16))
      chartDataTemperatureY.push(item["the_temp"].toFixed(2))
      tableBody.innerHTML += `
        <tr>
          <td>${item["created"].substr(0,16)}</td>
          <td>${item["weather_state_name"]}</td>
          <td>${item["the_temp"].toFixed(2)}</td>
          <td>${item["air_pressure"]}</td>
          <td>${item["humidity"]}</td>
        </tr>`
      /* console.log(item) */
    })
    
  })
  form.reset()
})

clearData.addEventListener('click', ()=> {
  tableBody.innerHTML = ""
})


// Chart data

chartBtn.addEventListener('click', () => {
  const data = {
    labels: chartDataTimeX,
    datasets: [{
      label: 'Weather temperature chart',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: chartDataTemperatureY,
    }]
  };
  
  const config = {
    type: 'line',
    data: data,
    options: {}
  };
  
  
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
})

// Heat index calculator 
const heatIndexForm = document.getElementById("form-heat-index")

function cToF(celsius) {
  var cTemp = celsius
  var cToFahr = cTemp * 9 / 5 + 32;
  return cToFahr
}

function fToC(fahrenheit){
  var fTemp = fahrenheit
  var fToCel = (fTemp - 32) * 5 / 9;
  return fToCel
}

function prinResults(heatIndex) {
  var divResults = document.getElementById("heat-index-results")
  var heatIndexCel = fToC(heatIndex)
  divResults.innerHTML = `
    <h5>Heat index =: ${heatIndex.toFixed(2)} F</h5>
    <h5>Heat index =: ${heatIndexCel.toFixed(2)} C</h5>
  `
}

heatIndexForm.addEventListener('submit', e => {
  e.preventDefault()
  var errormsg = document.getElementById("heat-index-results")
  var temperatureInput = document.getElementById("temperature-input").value
  var celsiusUnit = document.getElementById("celsius").checked
  var humidityInput = document.getElementById("relative-humidity").value

  if(celsiusUnit === true) {
    temperatureInput = cToF(temperatureInput)
  } 

  if(temperatureInput >= 80) {
    var heatIndex = -43.379 + (2.04901523 * temperatureInput) + (10.14333127 * humidityInput) - (0.22475541 * temperatureInput * humidityInput) - ((6.83783 * 10**-3) * (temperatureInput**2)) - ((5.481717 * 10**-2 ) * (humidityInput**2)) + ((1.22874 * 10**-3) * (temperatureInput**2 )* humidityInput) + ((8.5282 * 10**-4) * temperatureInput * (humidityInput**2)) - ((1.99 * 10**-6 )* (temperatureInput**2 )* (humidityInput**2))
    heatIndexForm.reset()
    prinResults(heatIndex)
  } else {
    errormsg.innerHTML = `<p>Heat Index value cannot be calculated for temperatures less than 26.7°C
    or 80°F.</p>`
  }

})
}



