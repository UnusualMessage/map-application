import React, {lazy} from 'react';
import ReactDOM from 'react-dom/client';

import "ol/ol.css";
import "./index.scss";

const App = lazy(() => import("./components/App"));

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<App />
);