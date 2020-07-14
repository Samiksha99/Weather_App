// window.addEventListener('load' ,()=>{
//     let long;
//     let lat;

//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(position =>{
//             long = position.coords.longitude;
//             lat = position.coords.latitude;

//             const proxy = "https://cors-anywhere.herokuapp.com/";
//             var api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b364129327d31578cc2ec00f3f758405`;
//             console.log(api)
//             fetch(api, {mode: 'no-cors'})
            
//                 .then(response => {
//                   return response.text();
//                 })
//                 .then(data =>{
//                     data = (data ? JSON.parse(data): console.log(data))
//                     const(temperature, summary) = 
//                 })
                
               
                
//         });
        

       
//     }
// });
const api = {
    key:  "b364129327d31578cc2ec00f3f758405",
    base: "http://api.openweathermap.org/data/2.5/"
}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        getResults(searchbox.value);
    
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
          return weather.json();
      }).then(displayResults);
}

function displayResults(weather) {
    
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

   


    let faren = (weather.main.temp*(9/5))+32;
    const tempSpan = document.querySelector('.temp span');
    temp.addEventListener('click',() =>{
        if(tempSpan.textContent === 'C') {
            tempSpan.textContent = 'F'
            temp.textContent = faren + `F`;
        }else{
            tempSpan.textContent = 'C';
        }
    })
  
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

 