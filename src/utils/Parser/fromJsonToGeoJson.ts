import {latKey, lonKey} from "../../data/config";
import {Feature} from "../../types/Feature";
import {FeatureCollection} from "../../types/FeatureCollection";

type json = {
	[index: string]: string
}[];

const fromJsonToGeoJson = (json: json): FeatureCollection => {
	const result: FeatureCollection = {
		type: "FeatureCollection",
		features: []
	};

	for (let i = 0; i < json.length; ++i) {
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

		for (const key of Object.keys(json[i])) {
			if (key === lonKey || key === latKey) {
				continue;
			}
			
			feature.properties[key] = json[i][key];
		}

		feature.geometry.coordinates.push(Number(json[i][lonKey]));
		feature.geometry.coordinates.push(Number(json[i][latKey]));

		result.features.push(feature);

	}

	return result;
};

export default fromJsonToGeoJson;