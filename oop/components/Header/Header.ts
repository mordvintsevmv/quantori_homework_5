import WeatherWidget from "../WeatherWidget/WeatherWidget";
import {Component, ComponentProps} from "../../base_classes";
import "./Header.scss"

interface HeaderProps extends ComponentProps {
    title: string
}

class Header extends Component {

    widget: WeatherWidget;
    element: HTMLDivElement

    constructor() {
        super();
        this.element = document.createElement('div')
        this.widget = new WeatherWidget()
    }

    render(props: HeaderProps): HTMLDivElement {

        const title: HTMLHeadingElement = document.createElement('h1')
        title.classList.add('header__title')
        title.innerText = props.title

        const weather_widget: HTMLDivElement = this.widget.render()

        return super.render({
            children: [title, weather_widget],
            className: ['header']
        }) as HTMLDivElement;
    }
}

export default Header