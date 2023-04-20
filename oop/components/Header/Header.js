import WeatherWidget from "../WeatherWidget/WeatherWidget.js";
import {Component} from "../../base_classes.js";
import "./Header.scss"
class Header extends Component {
    constructor() {
        super();
        this.widget = new WeatherWidget()
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

        const weather_widget = this.widget.render({})

        return super.render({
            children: [title, weather_widget],
            style: this.state.style,
            className: ['header']
        });
    }
}

export default Header