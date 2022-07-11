import css from "./controls.module.scss";

import LayersSwitcher from "./LayersSwitcher";
import FeaturesTablesSwitcher from "./FeaturesTablesSwitcher";
import FeaturesFilter from "./FeaturesFilter";
import FeaturesPaginator from "./FeaturesPaginator";
import FeaturesPresentation from "./FeaturesPresentation";

const Controls = () => {
	return(
		<div className={`${css.controls}`}>
			<LayersSwitcher/>
			<FeaturesTablesSwitcher/>
			<FeaturesFilter/>
			<FeaturesPaginator/>
			<FeaturesPresentation/>
		</div>
	)
}

export default Controls;