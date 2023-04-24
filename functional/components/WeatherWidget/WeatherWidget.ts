import {useState} from "../../functional";

import "./WeatherWidget.css"
import {State} from "../../types/State";

const WeatherWidget = (): HTMLDivElement => {

    const [state, setState]: [State, (newState: State) => void] = useState()

    // Wrapper
    const weather_wrapper: HTMLDivElement = document.createElement('div')
    weather_wrapper.classList.add('weather-widget')

    // Weather icon
    const weather_icon: HTMLImageElement = document.createElement('img')
    weather_icon.classList.add('weather-widget__icon')
    weather_icon.src = state.weather.weather_icon
    weather_icon.alt = state.weather.weather_text

    // Temperature (C)
    const weather_temp: HTMLDivElement = document.createElement('div')
    weather_temp.classList.add('weather-widget__temp')
    weather_temp.innerText = state.weather.temp_c

    // City
    const weather_location: HTMLDivElement = document.createElement('div')
    weather_location.classList.add('weather-widget__location')
    weather_location.innerText = state.weather.city

    // Skeleton on empty data
    if (state.weather.city === '') {
        weather_icon.classList.add('skeleton', 'skeleton-img')
        weather_temp.classList.add('skeleton', 'skeleton-text')
        weather_location.classList.add('skeleton', 'skeleton-text')
    }

    weather_wrapper.append(weather_icon, weather_temp, weather_location)

    return weather_wrapper
}

export default WeatherWidget