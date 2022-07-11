import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {Icon, Style} from "ol/style";

const defaultCenter : Coordinate = fromLonLat([-77.018627, 38.899924]);
const defaultZoom : number = 15;
const defaultVisibility : boolean = true;

const geoJsonId : string = "geo";
const geoJsonUrl : string = "./data/bars.geojson";

const csvId : string = "csv";
const csvUrl : string = "./data/portals.csv";

const overlayId : number = 1;
const overlayOffset = [-125, -10];

const lonKey : string = "lon";
const latKey : string = "lat";

const ruNameKey : string = "name_ru";
const enNameKey : string = "name_en";

const localStorageCenterLabel : string = "center";
const localStorageZoomLabel : string = "zoom";
const localStorageLayersLabel : string = "layers";
const localStorageFilterLabel : string = "filter";
const localStoragePageLabel : string = "page";

const pageSize : number = 15;
const defaultPage : number = 1;

const image = new Icon({
	anchor: [0.5, 0.5],
	src: "./images/icon.png",
});

const style : Style = new Style({
	image: image
})

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