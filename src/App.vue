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

export default {
	name: 'App',
	components: {
		NjMap, MapTitle, PeriodSlider
	}
}
</script>

<style lang="scss">
@import 'styles.scss';
@import 'settings.scss';

.nj-muni-map {
	display: flex;
	&__left-pane {
		flex: 1 0 $map-width;
		padding-right: $padding;
	}
	&__right-pane {
		flex: 1 0 100%;
		padding-top: $padding;
	}
}
</style>
