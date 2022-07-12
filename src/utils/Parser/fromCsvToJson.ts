import {Strategy} from "../../types/Strategy";
import fromJsonToGeoJson from "./fromJsonToGeoJson";
import {FeatureCollection} from "../../types/FeatureCollection";

const fromCsvToJson: Strategy = (file: string): FeatureCollection => {
	const rows = file.split("\n");
	const headers = rows[0].split(";");

	const result = [];

	for (let i = 1; i < rows.length; ++i) {
		const record: {[index: string]: string} = {};
		
		const columns = rows[i].split(";");

		for (let j = 0; j < headers.length; ++j) {
			record[headers[j]] = columns[j];
		}

		result.push(record);
	}

	return fromJsonToGeoJson(result);
};

export default fromCsvToJson;