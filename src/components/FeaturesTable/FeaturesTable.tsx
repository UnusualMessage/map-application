import React from "react";
import {observer} from "mobx-react-lite";
import {useMemo} from "react";
import {toLonLat} from "ol/proj";

import css from "./features-table.module.scss";

import FeaturesStore from "../../stores/FeaturesStore";
import CurrentStateStore from "../../stores/CurrentStateStore";
import Table from "./Table";
import {latKey, lonKey} from "../../data/config";
import {Feature} from "../../types/Feature";

const FeaturesTable = () => {
	const currentTable = CurrentStateStore.getTable();
	const currentPage = CurrentStateStore.getPage();
	const currentFilter = CurrentStateStore.getFilter();
	const count = FeaturesStore.getLayersCount();
	
	let features = useMemo(() => {
		return FeaturesStore.getFeaturesById(currentTable);
	}, [currentTable, count]);
	
	features = useMemo(() => {
		if (features === undefined) {
			return [];
		}
		
		return FeaturesStore.getFilteredFeatures(features, currentFilter);
	}, [features, currentFilter]);
	
	features = useMemo(() => {
		if (features === undefined) {
			return [];
		}
		
		return FeaturesStore.getPagedFeatures(features, currentPage);
	}, [features, currentPage]);
	
	const visible = CurrentStateStore.isLayerVisible(currentTable);
	
	const headers = useMemo(() => {
		const result = [];
		
		if (features === undefined || features.length === 0 || !visible) {
			return [];
		}
		
		let first = features.find((feature: Feature) => Object.keys(feature.properties).find(key => key === "note"));
		first = first ? first : features[0];
		
		for (const key of Object.keys(first.properties)) {
			const record = {
				Header: key,
				accessor: key
			};
			
			result.push(record);
		}
		
		result.push({
			Header: lonKey,
			accessor: lonKey
		});
		
		result.push({
			Header: latKey,
			accessor: latKey
		});
		
		return result;
	}, [features, visible]);
	
	const data = useMemo(() => {
		const result = [];
		
		if (features === undefined || features.length === 0) {
			return [];
		}
		
		for (const feature of features) {
			const record: Record<string, string> = {};
			
			for (const key of Object.keys(feature.properties)) {
				record[key] = feature.properties[key];
			}
			
			const lonLatCoordinates = toLonLat(feature.geometry.coordinates);
			
			record[lonKey] = lonLatCoordinates[0].toString();
			record[latKey] = lonLatCoordinates[1].toString();
			
			result.push(record);
		}
		
		return result;
	}, [features]);
	
	let toShow = true;
	if (data.length === 0 || headers.length === 0) {
		toShow = false;
	}
	
	return (
		<div className={`${css.featureTable}`}>
			{
				toShow ? <Table columns={headers} data={data}/>
					: <div className={`${css.placeholder}`}>ЗДЕСЬ ПУСТО...</div>
			}
		</div>
	);
};

export default observer(FeaturesTable);