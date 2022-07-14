import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {Fill, Stroke, Style, Text} from "ol/style";
import CircleStyle from "ol/style/Circle";
import {StyleFunction} from "ol/style/Style";
import {FeatureLike} from "ol/Feature";

const defaultCenter: Coordinate = fromLonLat([-77.018627, 38.899924]);
const defaultZoom = 15;
const defaultVisibility = true;
const maxZoom = 20;

const geoJsonId = "geo";
const geoJsonUrl = "api/files/ea7bf158-82fa-4030-8261-f5fd107c92ca";

const csvId = "csv";
const csvUrl = "api/files/3b8d5fff-7105-4325-934f-3fa796516788";

const overlayId = 1;
const overlayOffset = [-110, -160];

const lonKey = "lon";
const latKey = "lat";

const ruNameKey = "name_ru";
const enNameKey = "name_en";

const localStorageCenterLabel = "center";
const localStorageZoomLabel = "zoom";
const localStorageLayersLabel = "layers";
const localStorageFilterLabel = "filter";
const localStoragePageLabel = "page";

const pageSize = 15;
const defaultPage = 1;

const textFill = new Fill({
	color: "#fff",
});

const textStroke = new Stroke({
	color: "rgba(0, 0, 0, 1.0)",
	width: 2,
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

export {
	defaultZoom,
	defaultCenter,
	defaultVisibility,
	maxZoom,
	geoJsonId,
	csvId,
	geoJsonUrl,
	csvUrl,
	overlayId,
	overlayOffset,
	lonKey,
	latKey,
	ruNameKey,
	enNameKey,
	localStorageCenterLabel,
	localStorageZoomLabel,
	localStorageLayersLabel,
	localStorageFilterLabel,
	localStoragePageLabel,
	pageSize,
	defaultPage,
	styleFunction
};