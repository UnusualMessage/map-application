import React from "react";
import {observer} from "mobx-react-lite";

import css from "./layer-switcher.module.scss";

import MapStore from "../../../../stores/MapStore";
import CurrentStateStore from "../../../../stores/CurrentStateStore";

const LayerSwitcher = ({id, text, label} : Props) => {
	const onChange = () => {
		MapStore.stopAnimation();
		
		const visible = CurrentStateStore.isLayerVisible(id);
		MapStore.changeLayerVisibility(!visible, id);
		CurrentStateStore.addLayerVisibility(!visible, id);
	};
	
	return(
		<div className={`${css.item}`}>
			<input type={"checkbox"}
			       id={label}
			       checked={CurrentStateStore.isLayerVisible(id)}
			       onChange={onChange}/>
			<label htmlFor={label}>{text}</label>
		</div>
	);
};

interface Props {
	id: string,
	text: string,
	label: string
}


export default observer(LayerSwitcher);