import {latKey, lonKey} from "../../data/config";
import {Feature} from "../../types/Feature";
import {FeatureCollection} from "../../types/FeatureCollection";

type json = Record<string, string>[];

const fromJsonToGeoJson = (json: json): FeatureCollection => {
	const result: FeatureCollection = {
		type: "FeatureCollection",
		features: []
	};

	for (const record of json) {
		const feature: Feature = {
			type: "Feature",
			properties: {

			},

			geometry: {
				type: "Point",
				coordinates: [

				]
			}
		};

		for (const key of Object.keys(record)) {
			if (key === lonKey || key === latKey) {
				continue;
			}
			
			feature.properties[key] = record[key];
		}

		feature.geometry.coordinates.push(Number(record[lonKey]));
		feature.geometry.coordinates.push(Number(record[latKey]));

		result.features.push(feature);

	}

	return result;
};

export default fromJsonToGeoJson;