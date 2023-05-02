import {Item} from "./Item";

export interface State {
    items: Item[],
    isModal: boolean,
    weather: WeatherState
}

export interface WeatherState {
    city: string,
    temp_c: string,
    weather_icon: string,
    weather_text: string
}