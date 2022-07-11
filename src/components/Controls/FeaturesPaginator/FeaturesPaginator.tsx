import {observer} from "mobx-react-lite";
import React from "react";

import css from "./paginator.module.scss";

import CurrentStateStore from "../../../stores/CurrentStateStore";
import FeaturesStore from "../../../stores/FeaturesStore";
import {pageSize} from "../../../data/config";

const FeaturesPaginator = () => {
	let featuresCount = FeaturesStore.getCurrentFeaturesCount(
		CurrentStateStore.getTable(),
		CurrentStateStore.getFilter()
	);
	
	let pagesCount = 1;
	if (featuresCount !== undefined) {
		pagesCount = Math.ceil(featuresCount / pageSize);
	}
	
	const tableVisible = CurrentStateStore.isLayerVisible(CurrentStateStore.getTable());
	if (pagesCount === 0 || isNaN(pagesCount) || tableVisible === false) {
		pagesCount = 1;
	}
	
	const currentPage = CurrentStateStore.getPage();
	
	const onNext = () => {
		if (currentPage !== pagesCount) {
			CurrentStateStore.toNextPage();
		}
	}
	
	const onLast = () => {
		CurrentStateStore.toPage(pagesCount);
	}
	
	const onInput : React.FormEventHandler<HTMLInputElement> = (e) => {
		const element = e.target as HTMLInputElement;
		let page = element.value;
		
		CurrentStateStore.toPage(Number(page));
	}
	
	const onPrevious = () => {
		if (currentPage > 1) {
			CurrentStateStore.toPreviousPage();
		}
	}
	
	const onFirst = () => {
		CurrentStateStore.toPage(1);
	}
	
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
	)
}

export default observer(FeaturesPaginator);