import {FeatureCollection} from "../../types/FeatureCollection";

const fromTextToJson = (file: string) : FeatureCollection => {
	return JSON.parse(file);
}

export default fromTextToJson;