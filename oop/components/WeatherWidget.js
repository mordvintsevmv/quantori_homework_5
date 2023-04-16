class WeatherWidget extends Component {
    constructor() {
        super();
        this.state = {city: '', temp_c: '', weather_icon: '', weather_text: ''}
        this.element = document.createElement('div');
    }

    ComponentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude + ',' + position.coords.longitude).then(response => {
                            this.setState({
                                city: response.location.name,
                                temp_c: response.current.temp_c + "°",
                                weather_icon: response.current.condition.icon,
                                weather_text: response.current.condition.text
                            })
                        }
                    )
                },
                (error) => {
                    console.error(error)
                    getWeather("Tbilisi").then(response => {
                            this.setState({
                                city: response.location.name,
                                temp_c: response.current.temp_c + "°",
                                weather_icon: response.current.condition.icon,
                                weather_text: response.current.condition.text
                            })
                        }
                    )
                }
            )
        }
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
        weather_icon.classList.add('weather-widget__icon')
        weather_icon.src = this.state.weather_icon
        weather_icon.alt = this.state.weather_text

        const weather_temp = document.createElement('div')
        weather_temp.classList.add('weather-widget__temp')
        weather_temp.innerText = this.state.temp_c

        const weather_location = document.createElement('div')
        weather_location.classList.add('weather-widget__location')
        weather_location.innerText = this.state.city

        if (this.state.city === ''){
            weather_icon.classList.add('skeleton', 'skeleton-img')
            weather_temp.classList.add('skeleton', 'skeleton-text')
            weather_location.classList.add('skeleton', 'skeleton-text')
        }

        return super.render({
            onClick: props.onClick,
            children: [weather_icon, weather_temp, weather_location],
            style: this.state.style,
            className: ['weather-widget']
        });
    }
}



