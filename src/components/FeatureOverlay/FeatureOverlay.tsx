import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {Overlay} from "ol";

import css from "./overlay.module.scss";

import MapStore from "../../stores/MapStore";
import {overlayId, overlayOffset} from "../../data/config";

const FeatureOverlay = () => {
	const overlayRef = useRef<HTMLDivElement>(null);

	const onMouseLeave = () => {
		const overlay = MapStore.getOverlayById(overlayId);
		overlay?.setPosition(undefined);
		MapStore.stopAnimation();
	};

	useEffect(() => {
		const element = overlayRef.current as HTMLDivElement;
		
		const overlay : Overlay = new Overlay({
			element: element,
			offset: overlayOffset,
			id: overlayId
		});

		MapStore.addOverlay(overlay);
	}, []);

	return(
		<div className={css.overlay} ref={overlayRef} onMouseLeave={onMouseLeave}>

		</div>
	);
};

export default observer(FeatureOverlay);