import React, {useEffect, useRef} from "react";
import {observer} from "mobx-react-lite";
import {View} from "ol";

import css from "./map.module.scss";

import MapStore from "../../stores/MapStore";
import CurrentStateStore from "../../stores/CurrentStateStore";

const MultiLayerMap = ({ children }: Props) => {
	const mapRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		if (MapStore.getMap() == null) {
			const zoom: number = CurrentStateStore.getZoom();
			const center: number[] = CurrentStateStore.getCenter();
			
			const view: View = new View({
				center: center,
				zoom: zoom
			});
			
			const onZoomChange = () => {
				const zoom = view.getZoom();
				const center = view.getCenter();
				
				if (zoom !== undefined) {
					CurrentStateStore.setZoom(zoom);
				}
				
				if (center !== undefined) {
					CurrentStateStore.setCenter(center);
				}
			};
			
			const onCenterChange = () => {
				const center = view.getCenter();
				
				if (center !== undefined) {
					CurrentStateStore.setCenter(center);
				}
			};
			
			view.on("change:resolution", onZoomChange);
			view.on("change:center", onCenterChange);
			
			const element = mapRef.current as HTMLDivElement;
			MapStore.initMap(element, view);
			
			return () => {
				view.un("change:center", onCenterChange);
				view.un("change:resolution", onZoomChange);
			};
		}
		
		return;
	}, []);
	
	return(
		<div className={`${css.map}`} ref={mapRef}>
			{children}
		</div>
	);
};

interface Props {
	children: React.ReactNode
}


export default observer(MultiLayerMap);