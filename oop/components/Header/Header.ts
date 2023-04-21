import WeatherWidget from "../WeatherWidget/WeatherWidget";
import {Component, ComponentProps} from "../../base_classes";
import "./Header.scss"

interface HeaderProps extends ComponentProps{
    title: string
}
class Header extends Component {

    widget: WeatherWidget;

    constructor() {
        super();
        this.widget = new WeatherWidget()
    }

    render(props: HeaderProps) {

        const title = document.createElement('h1')
        title.classList.add('header__title')
        title.innerText = props.title

        const weather_widget = this.widget.render()

        return super.render({
            children: [title, weather_widget],
            className: ['header']
        });
    }
}

export default Header