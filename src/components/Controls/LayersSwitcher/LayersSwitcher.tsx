import {observer} from "mobx-react-lite";

import css from "./layers-switcher.module.scss";

import {geoJsonId, csvId} from "../../../data/config";
import LayerSwitcher from "./LayerSwitcher";

const LayersSwitcher = () => {
	return(
		<div className={`${css.switcher}`}>
			<LayerSwitcher id={geoJsonId} text={"Слой GeoJSON"} label={"geojson"} />
			<LayerSwitcher id={csvId} text={"Слой CSV"} label={"csv"} />
		</div>
	)
}

export default observer(LayersSwitcher);