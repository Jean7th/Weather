var inputvalue = document.getElementById('inputCity');
var searchButton = document.getElementById('searchButton');
var cityName = document.getElementById('cityName');
var temp = document.getElementById('temperature');
var desc = document.getElementById('description');
const matchList = document.getElementById('match-list');
var arrayCitites = [];

//Button Listener
searchButton.addEventListener('click', function() {
    //Fetch API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&units=metric&appid=250c4c5d548a462a45c19e896091333f`)
    .then(response => response.json())
    .then(displayData)
    .catch(error => alert(`\u26A0 Please enter a correct city name.`));

})

//Function to display weather data
const displayData = (weather) => {
    cityName.textContent = `${weather.name}, ${weather.sys.country}`
    temp.textContent = `${weather.main.temp}°C`;
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
    desc.textContent = `${weather.weather[0].description}`;
}

//Event Key Listener
document.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        //Fetch API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&units=metric&appid=250c4c5d548a462a45c19e896091333f`)
        .then(response => response.json())
        .then(displayData)
        .catch(error => alert(`\u26A0 Please enter a correct city name.`));
    }
})

// //Autocomplete Function search cities500.json
// const searchCity = async searchText => {
//     const response = await fetch('cities500.json');
//     const cities =  await response.json();

//     //Get Matches to current input
//     let matches = cities.filter (city => {
//         const regex = new RegExp(`^${searchText}`, 'gi');
//         return city.name.match(regex) //|| city.country.match(regex);
//     });

//     if(searchText.length === 0) {
//         matches = [];
//         matchList.innerHTML = '';
//     }

//     // console.log(matches);

//     outputHtml(matches);
// };



// //Show results in HTML
// const outputHtml = matches => {
//     if(matches.length > 0) {
//         const html = matches.map(match => `
//         <div class="card card-body mb-1"> 
//             <h4>${match.name}<span class="text-primary"> (${match.country})</span></h4>
//             <small></small>
//         </div>
//         `).join('');

//         matchList.innerHTML = html;
//     }
// };

// inputvalue.addEventListener('input', () => searchCity(inputvalue.value));