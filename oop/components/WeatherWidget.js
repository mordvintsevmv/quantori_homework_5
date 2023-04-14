class WeatherWidget extends Component {
    constructor() {
        super();
        this.state = {location: ''}
        this.element = document.createElement('div');
    }

    /**
     * @override
     * @param props
     * @param props.text {string}
     * @param props.isTransparent {boolean}
     * @param props.onClick {function}
     * @returns {HTMLElement}
     */
    render(props) {

        const weather_icon = document.createElement('img')
        weather_icon.classList.add('weather-widget__icon', 'skeleton', 'skeleton-img')

        const weather_temp = document.createElement('div')
        weather_temp.classList.add('weather-widget__temp', 'skeleton', 'skeleton-text')

        const weather_location = document.createElement('div')
        weather_location.classList.add('weather-widget__location', 'skeleton', 'skeleton-text')

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude + ',' + position.coords.longitude).then(response => {
                            // City
                            weather_location.innerText = response.location.name
                            weather_location.classList.remove('skeleton', 'skeleton-text')

                            // Temp c
                            weather_temp.innerText = response.current.temp_c + "°"
                            weather_temp.classList.remove('skeleton', 'skeleton-text')

                            // Icon
                            weather_icon.src = response.current.condition.icon
                            weather_icon.alt = response.current.condition.text
                            weather_icon.classList.remove('skeleton', 'skeleton-img')
                        }
                    )
                },
                (error) => {
                    console.error(error)
                    getWeather("Tbilisi").then(response => {
                        // City
                        weather_location.innerText = response.location.name
                        weather_location.classList.remove('skeleton', 'skeleton-text')

                        // Temp c
                        weather_temp.innerText = response.current.temp_c + "°"
                        weather_temp.classList.remove('skeleton', 'skeleton-text')

                        // Icon
                        weather_icon.src = response.current.condition.icon
                        weather_icon.alt = response.current.condition.text
                        weather_icon.classList.remove('skeleton', 'skeleton-img')
                        }
                    )
                }
            )
        }


        return super.render({
            onClick: props.onClick,
            children: [weather_icon, weather_temp, weather_location],
            style: this.state.style,
            className: ['weather-widget']
        });
    }
}


