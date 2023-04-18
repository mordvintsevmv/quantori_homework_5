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


// Fetching weather
const InitialWeather = async () => {

    const getCurrentPosition = async () => {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords.latitude + ',' + position.coords.longitude),
                () => resolve('Tbilisi')
            )
        })
    }

    const location = await getCurrentPosition()

    return await getWeather(location).then(response => {
            return {
                city: response.location.name,
                temp_c: response.current.temp_c + "°",
                weather_icon: response.current.condition.icon,
                weather_text: response.current.condition.text
            }
        }
    )
}


/**
 * Initial fetching tasks and weather from server
 */
const InitialLoad = async () => {

    try {
        // Checking if localhost is available
        await fetch('http://localhost:3004/items')
    } catch (e) {
        console.error(e)
        // Switching to JSONbin if localhost is unavailable
        change_API_path()
    }

    // Loading tasks from server
    await load_items().then((items) => {
        state = {
            ...state,
            items: items,
            last_id: items.reduce((max, item) => max > item.id ? max : item.id, items[0]?.id || 0)
        }
    })

    // Setting weather
    await InitialWeather().then((weather) => {
        state = {
            ...state,
            weather: weather
        }
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

// Fetching tasks and weather, then rendering App
InitialLoad().then(() => renderApp())

