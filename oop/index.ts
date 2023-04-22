import App from "./components/App/App";
import "./css/main.css"
import "./css/null.css"

const root = document.getElementById('root') as HTMLElement

root.append(new App().render());