var inputvalue = document.getElementById('inputCity');
var searchButton = document.getElementById('searchButton');
var cityName = document.getElementById('cityName');
var temp = document.getElementById('temperature');
var desc = document.getElementById('description');
const matchList = document.getElementById('match-list');
var arrayCitites = [];

// Get Real DateTime
var timeDisplay = document.getElementById("datetime");

var time_zone = Intl.DateTimeFormat().resolvedOptions().timeZone //Get user corrct timezone
var userLang = navigator.language || navigator.userLanguage; //Get user correct language

function refreshTime() {
    var dateString = new Date().toLocaleString(userLang, time_zone);
    var formattedString = dateString.replace(", ", " - ");
    timeDisplay.innerHTML = formattedString;
}

setInterval(refreshTime, 1000); //Refresh Time

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

// Night Sky element for Background ===================================

const $el = document.body;

// Generate a random number between min and max values

const genRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

// Generate a star <div>

const genStar = () => {

    const star = document.createElement("div");
    star.classList.add("star");

    // Gen star coordinates relative to $el size
    let x = genRandomNumber(1, $el.offsetWidth);
    let y = genRandomNumber(1, $el.offsetHeight);

    const { style } = star;

    style.left = Math.floor(x) + "px";
    style.top = Math.floor(y) + "px";

    style.setProperty(
        "--star-size",
        genRandomNumber(1, 3) + "px"
    );

    style.setProperty(
        "--twinkle-duration",
        Math.ceil(genRandomNumber(1, 5)) + "s"
    );

    style.setProperty(
        "--twinkle-delay",
        Math.ceil(genRandomNumber(1, 5)) + "s"
    );

    return star;
}

for (let index = 0; index < 200; index++) {
    $el.append(genStar());
}

window.addEventListener("load", function(event) {
    document.body.classList.remove('no-fouc');
});

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