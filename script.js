const container = document.querySelector ('.container')
const search = document.querySelector ('.search-box')
const weatherBox = document.querySelector ('.weather-box')
const weatherDetail = document.querySelector ('.weather-detail')
const error404 = document.querySelector ('.not-found')

search.addEventListener ('click', () => {

    const APIKEY = 'fb56ad8d12641a7a3a1abef164151f23'

    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return
    }

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`)
    .then (response => response.json ())
    .then (json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            container.style.display = 'none';
            weatherDetail.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add ('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove ('fadeIn');

        const image = document.querySelector ('.weather-box img');
        const temperature = document.querySelector ('.weather-box .temperature');
        const decription = document.querySelector ('.weather-box .decription');
        const humidiity = document.querySelector ('.weather-detail .humidity span');
        const wind = document.querySelector ('.weather-detail .wind span');

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

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>*C</span>`;
        decription.innerHTML = `${json.weather[0].decription}`;
        humidiity.innerHTML = `${json.main.humidiity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetail.style.display = '';
        weatherBox.classList.add ('fadeIn');
        weatherDetail.classList.add ('fadeIn');
        container.style.height = '590px'

    });
});
