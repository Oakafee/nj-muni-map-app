<template>
  <div class="nj-muni-map" id="app">
	<div class="nj-muni-map__left-pane"><NjMap /></div>
	<div class="nj-muni-map__right-pane">
		<MapTitle />
		<PeriodSlider />
	</div>
  </div>
</template>

<script>
import NjMap from './components/NjMap.vue';
import MapTitle from './components/MapTitle.vue';
import PeriodSlider from './components/PeriodSlider.vue';
import functions from './functions';

export default {
	name: 'App',
	components: {
		NjMap, MapTitle, PeriodSlider
	},
	mounted() {
		functions.setMuniData();
	}
}
</script>

<style lang="scss">
@import 'styles.scss';

.nj-muni-map {
	display: flex;
	&__left-pane, &__right-pane {
		flex: 1 0 50%;
	}
}
</style>
