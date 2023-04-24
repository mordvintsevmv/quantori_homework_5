import {InitialLoad, renderApp} from "./functional";

import "./css/null.css"
import "./css/main.css"

// Fetching tasks and weather, then rendering App
InitialLoad().then(() => renderApp())