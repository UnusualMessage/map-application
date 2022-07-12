import React from "react";
import {observer} from "mobx-react-lite";

import css from "./presentation.module.scss";
import MapStore from "../../../stores/MapStore";
import {csvId, geoJsonId} from "../../../data/config";

const FeaturesPresentation = () => {
	const onClick = () => {
		MapStore.startTour(geoJsonId, csvId);
	};
	
	return(
		<button className={`${css.button}`} onClick={onClick}>
			Презентация
		</button>
	);
};

export default observer(FeaturesPresentation);