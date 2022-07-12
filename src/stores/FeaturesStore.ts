import {makeAutoObservable, runInAction, toJS} from "mobx";
import {fromLonLat} from "ol/proj";

import Parser from "../utils/Parser/Parser";
import FileService from "../services/FileService";
import matches from "../utils/matches";
import {enNameKey, pageSize, ruNameKey} from "../data/config";
import {Strategy} from "../types/Strategy";
import {FeatureCollection} from "../types/FeatureCollection";
import {Feature} from "../types/Feature";

interface Group {
	featureCollection: FeatureCollection,
	id: string
}

class FeaturesStore {
	private service: FileService;
	private readonly groups: Group[];
	
	constructor() {
		this.service = new FileService();
		this.groups = [];
		
		makeAutoObservable(this);
	}

	getCurrentFeaturesCount = (id: string, filter: string): number | undefined => {
		const features = this.getFeaturesById(id, filter);
		
		if (features) {
			return this.getFilteredFeatures(features, filter).length;
		}
		
		return undefined;
	};

	getFeaturesByIndex = (index: number, filter: string): Feature[] => {
		const group = this.groups[index];
		return toJS(this.getFilteredFeatures(group.featureCollection.features, filter));
	};

	getFeaturesById = (id: string, filter: string): Feature[] | undefined => {
		if (this.groups.length === 0) {
			return undefined;
		}

		const group = this.groups.find(group => group.id === id);
		
		if (group) {
			return toJS(this.getFilteredFeatures(group.featureCollection.features, filter));
		}
		
		return undefined;
	};

	getPagedFeaturesById = (id: string, filter: string, page: number): Feature[] | undefined => {
		if (this.groups.length === 0) {
			return undefined;
		}

		const group = this.groups.find(group => group.id === id);
		
		if (group) {
			return toJS(this.getPagedFilteredFeatures(group.featureCollection.features, filter, page));
		}
		
		return undefined;
	};

	getPagedFilteredFeatures = (features: Feature[] , filter: string, page: number): Feature[] => {
		if (page === 0) {
			page = 1;
		}

		const filteredFeatures = this.getFilteredFeatures(features, filter);

		const start = (page - 1) * pageSize;

		if (start >= features.length) {
			return [];
		}

		let end = pageSize * page;
		
		if (start + pageSize > filteredFeatures.length) {
			end = start + pageSize - (pageSize + start - filteredFeatures.length);
		}
		
		if (filteredFeatures.length <= pageSize) {
			end = filteredFeatures.length;
		}

		const result = [];
		for (let i = start; i < end; ++i) {
			result.push(filteredFeatures[i]);
		}

		return toJS(result);
	};

	getFilteredFeatures = (features: Feature[], filter: string): Feature[] => {
		return features.filter(feature => {
			const keys = Object.keys(feature.properties);
			for (const key of keys) {
				if (key === ruNameKey || key === enNameKey) {
					return matches(filter, feature.properties[enNameKey], feature.properties[ruNameKey]);
				}
			}
			
			return matches(filter, feature.properties.name);
		});
	};

	readGroup = async (url: string, strategy: Strategy, id: string): Promise<void> => {
		try {
			const file: string = await this.service.get(url);

			const parser = new Parser(file, strategy);
			const featureCollection = parser.parse();

			for (const feature of featureCollection.features) {
				feature.geometry.coordinates = fromLonLat(
					feature.geometry.coordinates
				);
			}

			runInAction(() => {
				this.groups.push({
					id: id,
					featureCollection: featureCollection
				});
			});
		} catch(error) {
			console.log(error);
		}
	};
}

export default new FeaturesStore();