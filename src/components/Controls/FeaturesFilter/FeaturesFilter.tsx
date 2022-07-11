import {observer} from "mobx-react-lite";
import React from "react";

import css from "./filter.module.scss";
import CurrentStateStore from "../../../stores/CurrentStateStore";
import MapStore from "../../../stores/MapStore";

const FeaturesFilter = () => {
	const onInput : React.FormEventHandler<HTMLInputElement> = (e) => {
		const element = e.target as HTMLInputElement;
		
		MapStore.stopAnimation();
		CurrentStateStore.setFilter(element.value);
		MapStore.filterFeatures(CurrentStateStore.getFilter());
	}
	
	return(
		<div className={`${css.filter}`}>
			<label htmlFor={"filter"}>Поиск</label>
			<input id={"filter"} placeholder={"name"} onInput={onInput} value={CurrentStateStore.getFilter()}/>
		</div>
	)
}

export default observer(FeaturesFilter);