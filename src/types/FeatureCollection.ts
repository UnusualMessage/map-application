import {Feature} from "./Feature";

export interface FeatureCollection {
	type: "FeatureCollection",
	features: Feature[]
}