import {change_API_path, load_items} from "./api/itemsAPI";
import {getWeather} from "./api/weatherAPI";
import {State, WeatherState} from "./types/State";
import {renderApp} from "./index";
import {WeatherResponse} from "./types/WeatherResponse";
import {Item} from "./types/Item";

// Global app state.
let state: State = {
    items: [],
    isModal: false,
    weather: {city: '', temp_c: '', weather_icon: '', weather_text: ''}
}

const getCurrentPosition = async (): Promise<string> => {
    return new Promise((resolve): void => {
        navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => resolve(position.coords.latitude + ',' + position.coords.longitude),
            () => resolve('Tbilisi')
        )
    })
}

// Fetching weather
const InitialWeather = async (): Promise<WeatherState> => {

    const location: string = await getCurrentPosition()

    return await getWeather(location).then((response: WeatherResponse): WeatherState => {
            return {
                city: response.location.name,
                temp_c: response.current.temp_c + "°",
                weather_icon: response.current.condition.icon,
                weather_text: response.current.condition.text
            }
        }
    )
}


// Initial fetching tasks and weather from server
export const InitialLoad = async (): Promise<void> => {

    try {
        // Checking if localhost is available
        await fetch('http://localhost:3004/items')
    } catch (e) {
        console.error(e)
        // Switching to JSONbin if localhost is unavailable
        change_API_path()
    }

    // Loading tasks from server
    await load_items().then((items: Item[]): void => {
        state = {
            ...state,
            items: items,
        }
    })

    // Setting weather
    await InitialWeather().then((weather: WeatherState): void => {
        state = {
            ...state,
            weather: weather
        }
    })
}

export const useState = (initialValue?: State): [State, (newState: State) => void] => {

    state = state || initialValue;

    function setState(newState: State): void {
        state = newState;
        renderApp();
    }

    return [state, setState];
}