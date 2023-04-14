class Header extends Component {
    constructor() {
        super();
    }

    /**
     * @override
     * @param props
     * @param props.title {string}
     * @returns {HTMLDivElement} - Header element
     * */
    render(props) {

        const title = document.createElement('h1')
        title.classList.add('header__title')
        title.innerText = props.title

        const weather_widget = new WeatherWidget().render({})

        return super.render({
            children: [title, weather_widget],
            style: this.state.style,
            className: ['header']
        });
    }
}