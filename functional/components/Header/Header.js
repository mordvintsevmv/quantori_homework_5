import {WeatherWidget} from "../WeatherWidget/WeatherWidget";

import "./Header.css"


const Header = ({title}) => {

    // Header wrapper
    const header_wrapper = document.createElement('div')
    header_wrapper.classList.add('header')

    // Header Title
    const header_title = document.createElement('h1')
    header_title.classList.add('header__title')
    header_title.innerText = title

    // Weather Widget
    const weather_widget = WeatherWidget()

    // Appending
    header_wrapper.append(header_title, weather_widget)

    return header_wrapper
}

export default Header