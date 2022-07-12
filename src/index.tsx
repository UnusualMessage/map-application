import React, {lazy} from "react";
import ReactDOM from "react-dom/client";

import "ol/ol.css";
import "./index.scss";

const App = lazy(() => import("./components/App"));

const rootElement = document.getElementById("root") as Element;

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);