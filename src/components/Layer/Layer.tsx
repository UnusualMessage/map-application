import {runInAction} from "mobx";
import {observer} from "mobx-react-lite";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import VectorLayer from "ol/layer/Vector";

import FeaturesStore from "../../stores/FeaturesStore";
import MapStore from "../../stores/MapStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import {defaultVisibility, style} from "../../data/config";
import {Strategy} from "../../types/Strategy";

const Layer = ({ sourceUrl, strategy, layerId } : Props) => {
	runInAction(async () => {
		await FeaturesStore.readGroup(
			sourceUrl,
			strategy,
			layerId
		);
		
		const features = FeaturesStore.getFeaturesById(layerId, CurrentStateStore.getFilter());
		
		const geoJson = {
			type: "FeatureCollection",
			features: features
		}
		
		const vectorSource = new VectorSource({
			features: new GeoJSON().readFeatures(geoJson)
		});
		
		const vectorLayer = new VectorLayer({
			source: vectorSource,
			style: style
		});
		
		let visibility = CurrentStateStore.getLayerVisibilityById(layerId);
		
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
	});
	
	return(
		<>
		</>
	);
}

interface Props {
	sourceUrl : string,
	strategy : Strategy,
	layerId : string
}

export default observer(Layer);