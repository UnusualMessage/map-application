import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {Icon, Style} from "ol/style";

const defaultCenter: Coordinate = fromLonLat([-77.018627, 38.899924]);
const defaultZoom  = 15;
const defaultVisibility  = true;

const geoJsonId  = "geo";
const geoJsonUrl  = "./data/bars.json";

const csvId  = "csv";
const csvUrl  = "./data/portals.csv";

const overlayId  = 1;
const overlayOffset = [-125, -10];

const lonKey  = "lon";
const latKey  = "lat";

const ruNameKey  = "name_ru";
const enNameKey  = "name_en";

const localStorageCenterLabel  = "center";
const localStorageZoomLabel  = "zoom";
const localStorageLayersLabel  = "layers";
const localStorageFilterLabel  = "filter";
const localStoragePageLabel  = "page";

const pageSize  = 15;
const defaultPage  = 1;

const image = new Icon({
	anchor: [0.5, 0.5],
	src: "./images/icon.png",
});

const style: Style = new Style({
	image: image
});

export {
	defaultZoom,
	defaultCenter,
	defaultVisibility,
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
	style
};