import {InitialLoad} from "./functional";

import "./css/null.css"
import "./css/main.css"
import App from "./components/App/App";

/**
 * Render the app.
 * On change whole app is re-rendered.
 */
export const renderApp = (): void => {
    const appContainer: HTMLDivElement = document.getElementById("root") as HTMLDivElement;
    appContainer.innerHTML = '';
    appContainer.append(App());
}

// Fetching tasks and weather, then rendering App
InitialLoad().then(() => renderApp())