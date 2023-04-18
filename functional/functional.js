import App from "./components/App.js";
import {change_API_path, load_items} from "../api/itemsAPI.js";
import {getWeather} from "../api/weatherAPI.js";

/**
 * Global app state.
 */
let state = {
    items: [],
    last_id: 0,
    isModal: false,
    weather: {city: '', temp_c: '', weather_icon: '', weather_text: ''}
}

/**
 * Initial fetching tasks from server
 */
const InitialLoad = async () => {
    try{
        await fetch('http://localhost:3004/items')
    } catch (e){
        console.error(e)
        change_API_path()
    }

    await load_items().then((items) => {
        state = {
            ...state,
            items: items,
            last_id: items.reduce((max, item) => max > item.id ? max : item.id, items[0]?.id || 0)
        }
    })
}


/**
 * Fetching weather data.
 */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            getWeather(position.coords.latitude + ',' + position.coords.longitude).then(response => {
                    state = {
                        ...state,
                        weather: {
                            city: response.location.name,
                            temp_c: response.current.temp_c + "°",
                            weather_icon: response.current.condition.icon,
                            weather_text: response.current.condition.text
                        }
                    }
                    renderApp()
                }
            )
        },
        (error) => {
            console.error(error)
            getWeather("Tbilisi").then(response => {
                    state = {
                        ...state,
                        weather: {
                            city: response.location.name,
                            temp_c: response.current.temp_c + "°",
                            weather_icon: response.current.condition.icon,
                            weather_text: response.current.condition.text
                        }
                    }
                    renderApp()
                }
            )
        }
    )
} else {
    getWeather("Tbilisi").then(response => {
        state = {
            ...state,
            weather: {
                city: response.location.name,
                temp_c: response.current.temp_c + "°",
                weather_icon: response.current.condition.icon,
                weather_text: response.current.condition.text
            }
        }
        renderApp()
    })
}

/**
 * Global application state
 * @template T
 * @param {T} initialValue
 * @returns {[T, function(T): void]}
 */
export const useState = (initialValue = undefined) => {
    state = state || initialValue;

    function setValue(newValue) {
        state = newValue;
        renderApp();
    }

    return [state, setValue];
}

/**
 * Render the app.
 * On change whole app is re-rendered.
 */
function renderApp() {
    const appContainer = document.getElementById("root");
    appContainer.innerHTML = '';
    appContainer.append(App());
}

InitialLoad().then(() => renderApp())

