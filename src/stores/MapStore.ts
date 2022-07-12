import {makeAutoObservable} from "mobx";
import {Feature, Map, Overlay, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {fromLonLat} from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import {Coordinate} from "ol/coordinate";
import {Point} from "ol/geom";

import FeaturesStore from "./FeaturesStore";
import {latKey, lonKey, overlayId} from "../data/config";

type Layer = {
	id: string,
	layer: VectorLayer<VectorSource>
};

class MapStore {
	map: Map | null;
	layers: Layer[];
	
	constructor() {
		this.map = null;
		this.layers = [];

		makeAutoObservable(this);
	}

	getLayerById = (id: string): VectorLayer<VectorSource> | undefined => {
		return this.layers.find(layer => layer.id === id)?.layer;
	};

	filterFeatures = (filter: string) => {
		for (let i = 0; i < this.layers.length; ++i) {
			const geoJson = {
				type: "FeatureCollection",
				features: FeaturesStore.getFeaturesByIndex(i, filter)
			};

			const source = new VectorSource({
				features: new GeoJSON().readFeatures(geoJson)
			});

			this.layers[i].layer.setSource(source);
		}
	};

	addLayer = (layer: Layer) => {
		this.layers.push(layer);
		this.map?.addLayer(layer.layer);
	};

	addOverlay = (overlay: Overlay) => {
		this.map?.addOverlay(overlay);
	};

	getOverlayById = (id: number) => {
		return this.map?.getOverlayById(id);
	};

	changeLayerVisibility = (visible: boolean, id: string) => {
		const layer = this.layers.find(item => item.id === id)?.layer;
		layer?.setVisible(visible);
	};

	stopAnimation = () => {
		const view = this.map?.getView();
		
		if (view === undefined) {
			return;
		}
		
		const zoom = view.getZoom();
		
		if (zoom !== undefined) {
			view.setZoom(zoom);
		}
	};

	show = (data: {[index: string]: string}, isLonLat: boolean) => {
		this.stopAnimation();
		let coordinates: Coordinate = [Number(data[lonKey]), Number(data[latKey])];

		if (isLonLat) {
			coordinates = fromLonLat(coordinates);
		}

		const overlay = this.getOverlayById(overlayId);
		const overlayElement = overlay?.getElement();
		
		if (overlayElement === undefined) {
			return;
		}
		
		const keys = Object.keys(data);

		overlayElement.innerHTML = `
			${keys.map(key => {
				if (key === lonKey || key === latKey) {
					return "";
				}

				return `<span>${key + ": " + data[key]}</span>`;
			}).join(" ")}
		`;

		overlay?.setPosition(coordinates);

		const view = this.map?.getView();
		view?.animate({
			zoom: 18,
			center: coordinates,
			duration: 3000
		});
	};

	initMap = (ref: HTMLDivElement, view: View) => {
		this.map = new Map({
			layers: [new TileLayer({
				source: new OSM()
			})],

			target: ref,
			view: view
		});
	};

	setOnClick = (layer: VectorLayer<VectorSource>) => {
		this.map?.on("click", (e) => {
			const pixel = this.map?.getEventPixel(e.originalEvent);
			
			if (pixel === undefined) {
				return;
			}
			
			layer.getFeatures(pixel).then((features: Feature[]) => {
				const feature = features.length ? features[0] : undefined;

				if (feature !== undefined) {
					const view = this.map?.getView();
					
					const point = feature.getGeometry() as Point;
					
					view?.animate({
						center: point?.getFlatCoordinates(),
						zoom: 20,
						duration: 2000,
					});

					this.setOverlay(feature);
				}
			});
		});
	};

	setOverlay = (feature: Feature) => {
		const overlay = this.map?.getOverlayById(overlayId);
		const overlayElement = overlay?.getElement();
		const properties = feature.getProperties();
		
		if (overlayElement === undefined) {
			return;
		}
		
		const keys = Object.keys(properties);
		
		overlayElement.innerHTML = `
			${keys.map(key => {
				if (key === "geometry") {
					return "";
				}

				return `<span>${key + ": " + properties[key]}</span>`;
			}).join(" ")}`;
		
		const point = feature.getGeometry() as Point;

		overlay?.setPosition(point.getFlatCoordinates());
	};

	startTour = (...ids: string[]) => {
		const view = this.map?.getView();

		const layers: VectorLayer<VectorSource>[] = [];
		for (const id of ids) {
			const layer = this.getLayerById(id);

			if (layer === undefined || !layer.getVisible()) {
				continue;
			}

			layers.push(layer);
		}

		if (layers.length === 0) {
			return;
		}

		const features: Feature[] = [];
		
		for (const layer of layers) {
			const layerFeatures: Feature[] | undefined = layer.getSource()?.getFeatures();
			
			if (layerFeatures === undefined) {
				continue;
			}
			
			features.push(...layerFeatures);
		}

		const to = (index: number, limit: number) => {
			if (index >= limit) {
				return;
			}

			const callback = (complete: boolean) => {
				if (complete) {
					to(index + 1, limit);
				}
			};

			this.setOverlay(features[index]);
			
			const point = features[index].getGeometry() as Point;
			const coordinates = point.getFlatCoordinates();

			view?.animate({
				center: coordinates,
				zoom: 18,
				duration: 5000
			}, {
				center: coordinates,
				zoom: 16,
				duration: 2500
			}, callback);
		};

		to(0, features.length);
	};

	getMap = () => {
		return this.map;
	};
}

export default new MapStore();