// get container
const container = document.querySelector ('.container')
// get search - box
const search = document.querySelector ('.search-box')
// get weather - box 
const weatherBox = document.querySelector ('.weather-box')
// get weather detail 
const weatherDetail = document.querySelector ('.weather-detail')
// get error 
const error404 = document.querySelector ('.not-found')

// handle the click action (when the user enters the input box and clicks the glass button 
search.addEventListener ('click', () => {

    // set my own API key
    const APIKEY = 'fb56ad8d12641a7a3a1abef164151f23'

    // get the city (location) - the result of what the user entered 
    const city = document.querySelector('.search-box input').value;

    // handle if there is nothing inputed 
    if (city === '') {
        return
    }

    // get the information about the entered location through API 
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
    .then (response => response.json ())
    .then (json => {

        // handle 404 error 
        if (json.cod == '404') {
            container.style.height = '400px';
            container.style.display = 'none';
            weatherDetail.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add ('fadeIn');
            return;
        }

        // hide 404 pop-up notification 
        error404.style.display = 'none';
        error404.classList.remove ('fadeIn');

        // get image 
        const image = document.querySelector ('.weather-box img');
        // get temperature
        const temperature = document.querySelector ('.weather-box .temperature');
        // get description 
        const decription = document.querySelector ('.weather-box .decription');
        // get humidity 
        const humidiity = document.querySelector ('.weather-detail .humidity span');
        // get wind 
        const wind = document.querySelector ('.weather-detail .wind span');

        // handle the status of weather in entered location 
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'image/clear.png';
                break;

            case 'Rain':
                image.src = 'image/rain.png';
                break;

            case 'Snow':
                image.src = 'image/snow.png';
                break;

            case 'Clouds':
                image.src = 'image/cloud.png';
                break;

            case 'Haze':
                image.src = 'image/mist.png';
                break;

            default:
                image.scr = ''
        }

        // change the information displayed 
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>*C</span>`;
        decription.innerHTML = `${json.weather[0].decription}`;
        humidiity.innerHTML = `${json.main.humidiity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        // set style
        weatherBox.style.display = '';
        weatherDetail.style.display = '';
        weatherBox.classList.add ('fadeIn');
        weatherDetail.classList.add ('fadeIn');
        container.style.height = '590px'

    });
});
