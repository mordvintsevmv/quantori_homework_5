import {useState} from "../functional.js";

export const WeatherWidget = () => {
    
    const [state, setState] = useState()

    const weather_wrapper = document.createElement('div')
    weather_wrapper.classList.add('weather-widget')
    
    const weather_icon = document.createElement('img')
    weather_icon.classList.add('weather-widget__icon')
    weather_icon.src = state.weather.weather_icon
    weather_icon.alt = state.weather.weather_text

    const weather_temp = document.createElement('div')
    weather_temp.classList.add('weather-widget__temp')
    weather_temp.innerText = state.weather.temp_c

    const weather_location = document.createElement('div')
    weather_location.classList.add('weather-widget__location')
    weather_location.innerText = state.weather.city

    if (state.weather.city === ''){
        weather_icon.classList.add('skeleton', 'skeleton-img')
        weather_temp.classList.add('skeleton', 'skeleton-text')
        weather_location.classList.add('skeleton', 'skeleton-text')
    }
    
    weather_wrapper.append(weather_icon, weather_temp, weather_location)
    
    return weather_wrapper
    

}




