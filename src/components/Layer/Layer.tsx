import React from "react";
import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import VectorLayer from "ol/layer/Vector";

import FeaturesStore from "../../stores/FeaturesStore";
import MapStore from "../../stores/MapStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import {defaultVisibility, textFill, textStroke} from "../../data/config";
import {Strategy} from "../../types/Strategy";
import {Cluster} from "ol/source";
import CircleStyle from "ol/style/Circle";
import {Fill, Style, Text} from "ol/style";
import {StyleFunction} from "ol/style/Style";
import {FeatureLike} from "ol/Feature";

const Layer = ({ sourceUrl, strategy, layerId }: Props) => {
	runInAction(async () => {
		await FeaturesStore.readGroup(
			sourceUrl,
			strategy,
			layerId
		);
		
		const features = FeaturesStore.getFilteredFeaturesById(layerId, CurrentStateStore.getFilter());
		
		const geoJson = {
			type: "FeatureCollection",
			features: features
		};
		
		const vectorSource = new VectorSource({
			features: new GeoJSON().readFeatures(geoJson)
		});
		
		const getStyleWithRadius = (radius: number, size: number) => {
			return new Style({
				image: new CircleStyle({
					radius: radius,
					
					fill: new Fill({
						color: [255, 64, 128, 1.0],
					}),
				}),
				
				text: new Text({
					text: size.toString(),
					fill: textFill,
					stroke: textStroke,
				}),
			});
		};
		
		const styleFunction: StyleFunction = (feature: FeatureLike) => {
			let style;
			const size = feature.get("features").length;
			if (size < 20) {
				style = getStyleWithRadius(size + 10, size);
			} else {
				style = getStyleWithRadius(20, size);
			}
			return style;
		};
		
		const cluster = new Cluster({
			source: vectorSource,
			distance: 30,
		});
		
		const vectorLayer = new VectorLayer({
			source: cluster,
			style: styleFunction
		});
		
		const visibility = CurrentStateStore.getLayerVisibilityById(layerId);
		
		let visible = defaultVisibility;
		if (visibility !== undefined) {
			visible = visibility.visible;
		}
		
		vectorLayer.setVisible(visible);
		CurrentStateStore.addLayerVisibility(visible, layerId);
		
		MapStore.addLayer({
			id: layerId, layer: vectorLayer
		});
		
		MapStore.setOnClick(vectorLayer);
	}).then(_ => _);
	
	return(
		<>
		</>
	);
};

interface Props {
	sourceUrl: string,
	strategy: Strategy,
	layerId: string
}

export default observer(Layer);