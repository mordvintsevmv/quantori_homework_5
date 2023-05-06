import App from "./components/App/App";
import "./css/main.css"
import "./css/null.css"

const root: HTMLDivElement = document.getElementById('root') as HTMLDivElement

root.append(new App().render());