import {observer} from "mobx-react-lite";
import React, {useMemo} from "react";

import css from "./paginator.module.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";
import FeaturesStore from "../../../stores/FeaturesStore";
import {pageSize} from "../../../data/config";

const FeaturesPaginator = () => {
	const currentTable = CurrentStateStore.getTable();
	const currentFilter = CurrentStateStore.getFilter();
	const currentPage = CurrentStateStore.getPage();
	const count = FeaturesStore.getLayersCount();
	
	const featuresCount = useMemo(() => {
		return FeaturesStore.getCurrentFeaturesCount(currentTable, currentFilter);
	}, [currentTable, currentFilter, count]);
	
	const tableVisible = CurrentStateStore.isLayerVisible(currentTable);
	
	let pagesCount = 1;
	if (featuresCount !== undefined) {
		pagesCount = Math.ceil(featuresCount / pageSize);
	}
	
	if (pagesCount === 0 || !tableVisible) {
		pagesCount = 1;
	}
	
	const onNext = () => {
		if (currentPage !== pagesCount) {
			CurrentStateStore.toNextPage();
		}
	};
	
	const onLast = () => {
		CurrentStateStore.toPage(pagesCount);
	};
	
	const onInput: React.FormEventHandler<HTMLInputElement> = (e) => {
		const element = e.target as HTMLInputElement;
		const page = element.value;
		
		CurrentStateStore.toPage(Number(page));
	};
	
	const onPrevious = () => {
		if (currentPage > 1) {
			CurrentStateStore.toPreviousPage();
		}
	};
	
	const onFirst = () => {
		CurrentStateStore.toPage(1);
	};
	
	return(
		<div className={`${css.paginator}`}>
			<button onClick={onFirst}>
				{"<<"}
			</button>
			
			<button onClick={onPrevious}>
				{"<"}
			</button>
			
			<input className={`${css.input}`}
			       type="number"
			       onInput={onInput}
			       value={currentPage === 0 ? "" : currentPage} min={1} max={pagesCount}/>
			
			<span>
				из {pagesCount}
			</span>
			
			<button onClick={onNext}>
				{">"}
			</button>
			
			<button onClick={onLast}>
				{">>"}
			</button>
		</div>
	);
};

export default observer(FeaturesPaginator);