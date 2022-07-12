import {observer} from "mobx-react-lite";
import React from "react";

import css from "./switcher.module.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";
import {geoJsonId, csvId} from "../../../data/config";

const FeaturesTablesSwitcher = () => {
	const onChange: React.FormEventHandler<HTMLInputElement> = (e) => {
		const element = e.target as HTMLInputElement;
		
		CurrentStateStore.setTable(element.value);
		CurrentStateStore.toPage(1);
	};
	
	return(
		<div className={`${css.switcher}`}>
			<div className={`${css.button}`}>
				<input type="radio" value={geoJsonId} id="geoTable" onChange={onChange}
				       checked={CurrentStateStore.getTable() === geoJsonId}/>
				
				<label htmlFor="geoTable">Таблица GeoJSON</label>
			</div>
			
			<div className={`${css.button}`}>
				<input type="radio" value={csvId} id="csvTable" onChange={onChange}
				       checked={CurrentStateStore.getTable() === csvId}/>
				
				<label htmlFor="csvTable">Таблица CSV</label>
			</div>
		</div>
	);
};

export default observer(FeaturesTablesSwitcher);