import {observer} from "mobx-react-lite";
import {lazy} from "react";

const MultiLayerMap = lazy(() => import("./MultiLayerMap"));
const Layer = lazy(() => import("./Layer"));
const Controls = lazy(() => import("./Controls"));
const FeatureOverlay = lazy(() => import("./FeatureOverlay"));
const FeaturesTable = lazy(() => import("./FeaturesTable"));

import fromTextToJson from "../utils/Parser/fromTextToJson";
import fromCsvToJson from "../utils/Parser/fromCsvToJson";
import {geoJsonId, csvId, geoJsonUrl, csvUrl} from "../data/config";

function App() {
	return (
		<>
			<Controls/>
			<MultiLayerMap>
				<Layer strategy={fromTextToJson} sourceUrl={geoJsonUrl} layerId={geoJsonId}/>
				<Layer strategy={fromCsvToJson} sourceUrl={csvUrl} layerId={csvId}/>
			</MultiLayerMap>
			<FeatureOverlay/>
			<FeaturesTable/>
		</>
	);
}

export default observer(App);
