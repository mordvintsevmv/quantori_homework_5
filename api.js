const dataFetch = (baseURL) => {
    return async (path, options = {}) => {
        try{
            const response = await fetch(`${baseURL}/${path}`, options)
            return response.json()
        }
        catch (error) {
            console.error(error)
        }
    }
}

// Weather API
const weatherAPI = dataFetch('https://api.weatherapi.com/v1')

const weather_api_key = '8b1638203941464fb58170357231404'

const getWeather = async (location) => {
    return await weatherAPI(`current.json?key=${weather_api_key}&q=${location}&aqi=no`)
}

// Localhost server
const localDB = dataFetch('http://localhost:3004')

// Fake server
const fakeDB = dataFetch('https://my-json-server.typicode.com/mordvintsevmv/quantori_homework_5')

let itemsAPI

if (window.location.host.includes('localhost')){
    itemsAPI = localDB
} else{
    itemsAPI = fakeDB
    const warning_text = document.createElement('p')
    warning_text.innerText = "Using fake API.\n All changes will not be saved."
    warning_text.style.opacity = '0.2'
    warning_text.style.fontSize = '12px'
    warning_text.style.position = 'fixed'
    warning_text.style.bottom = "5px"
    warning_text.style.right = "5px"
    warning_text.style.textAlign = "right"

    document.body.appendChild(warning_text);
}