import {makeAutoObservable} from "mobx";

import {
	defaultCenter,
	defaultPage,
	defaultZoom,
	geoJsonId,
	localStorageCenterLabel,
	localStorageFilterLabel,
	localStorageLayersLabel,
	localStoragePageLabel,
	localStorageZoomLabel
} from "../data/config";

type Visibility = {
	id: string,
	visible: boolean
}

class CurrentStateStore {
	page : number;
	zoom : number;
	center : number[];
	filter : string;
	table : string;
	layersVisibilities : Visibility[];
	
	constructor() {
		const layers = localStorage.getItem(localStorageLayersLabel);
		
		if (layers) {
			this.layersVisibilities = JSON.parse(layers);
		} else {
			this.layersVisibilities = [];
		}
		
		const center = localStorage.getItem(localStorageCenterLabel);
		this.center = center ? JSON.parse(center) : defaultCenter;

		const zoom = localStorage.getItem(localStorageZoomLabel);
		this.zoom = zoom ? Number(zoom) : defaultZoom;

		const filter = localStorage.getItem(localStorageFilterLabel);
		this.filter = filter ? filter : "";

		this.page = defaultPage;
		this.table = geoJsonId;

		makeAutoObservable(this);
	}

	toNextPage = () => {
		this.toPage(this.page + 1);
	};

	toPreviousPage = () => {
		this.toPage(this.page - 1);
	};

	toPage = (page : number) => {
		this.page = page;
		this.savePage();
	};

	savePage = () => {
		localStorage.setItem(localStoragePageLabel, this.page.toString());
	};

	getPage = () => {
		return this.page;
	};
	
	setFilter = (filter : string) => {
		this.filter = filter;
		localStorage.setItem(localStorageFilterLabel, filter);
	};

	getFilter = () => {
		return this.filter;
	};

	setTable = (table : string) => {
		this.table = table;
	};

	getTable = () => {
		return this.table;
	};
	
	setCenter = (center : number[]) => {
		localStorage.setItem(localStorageCenterLabel, JSON.stringify(center));
		this.center = center;
	};

	getCenter = () => {
		return this.center;
	};
	
	setZoom = (zoom : number) => {
		localStorage.setItem(localStorageZoomLabel, zoom.toString());
		this.zoom = zoom;
	};

	getZoom = () => {
		return this.zoom;
	};
	
	addLayerVisibility = (visible : boolean, id : string) => {
		const visibility = this.getLayerVisibilityById(id);
		
		if (visibility != undefined) {
			visibility.visible = visible;
		} else {
			this.layersVisibilities.push({
				visible: visible,
				id: id
			});
		}
		
		localStorage.setItem(localStorageLayersLabel, JSON.stringify(this.layersVisibilities));
	};
	
	getLayerVisibilityById = (id : string) : Visibility | undefined => {
		return this.layersVisibilities?.find((visibility: Visibility) => visibility.id === id);
	};
	
	isLayerVisible = (id : string) : boolean | undefined => {
		return this.getLayerVisibilityById(id)?.visible;
	};
}

export default new CurrentStateStore();