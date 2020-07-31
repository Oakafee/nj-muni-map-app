<template>
  <div class="nj-muni-map" id="app">
	<div class="nj-muni-map__left-pane"><NjMap /></div>
	<div class="nj-muni-map__right-pane">
		<div class="nj-muni-map__legend">
			<div class="nj-muni-map__legend-left">
				<h1>Development of New Jersey's Municipalities </h1>
				<h2>by Time Period </h2>
				<BuildingLegend />
				<TransitToggle />
			</div>
			<div class="nj-muni-map__legend-right">
				<PeriodSlider />
				<MuniGraph />
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import NjMap from './components/NjMap.vue';
import PeriodSlider from './components/PeriodSlider.vue';
import MuniGraph from './components/MuniGraph.vue';
import TransitToggle from './components/TransitToggle.vue';
import BuildingLegend from './components/BuildingLegend.vue';

export default {
	name: 'App',
	components: {
		NjMap, PeriodSlider, MuniGraph, TransitToggle, BuildingLegend
	}
}
</script>

<style lang="scss">
@import 'styles.scss';
@import 'settings.scss';

.nj-muni-map {
	@media (min-width: $mobile-break) {
		display: flex;
	}
	&__left-pane {
		flex: 0 0 auto;
		padding-right: 2 * $spacing-lg;
	}
	&__right-pane {
		flex: 1 0 auto;
		padding-top: $spacing;
	}
	&__legend {
		@media (min-width: $medium-break) {
			display: flex;
		}
		&-left {
			flex: 0 0 250px;
			margin-right: $spacing-lg;
		}
		&-right {
			flex: 0 0 300px;
		}
	}
}
</style>
