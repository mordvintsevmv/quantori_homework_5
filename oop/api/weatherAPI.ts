import {dataFetch} from "./api";

// Weather API
const weatherAPI = dataFetch('https://api.weatherapi.com/v1')

const weather_api_key = '8b1638203941464fb58170357231404'

export const getWeather = async (location: string) => {
    return await weatherAPI(`current.json?key=${weather_api_key}&q=${location}&aqi=no`)
}