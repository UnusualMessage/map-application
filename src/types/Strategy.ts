import {FeatureCollection} from "./FeatureCollection";

export type Strategy = (file : string) => FeatureCollection;
