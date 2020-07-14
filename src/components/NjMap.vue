<template>
  <div :class="[containerClass, activePeriodClass]">
	<p class="nj-muni-map__loading" v-if="mapLoading">Loading...</p>
	<div id="njMap" :class="mapClass"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import {mapState} from 'vuex';
import store from '../store';
import constants from '../constants';

export default {
	name: 'NjMap',
	data() {
		return {
			mapClass: constants.MAP_CLASS,
			containerClass: `${constants.MAP_CLASS}-container`,
			periods: constants.TIME_PERIODS,
		}
	},
	mounted() {
		store.commit('startNjMap', L.map(constants.MAP_TITLE, constants.MAP_DEFAULT_OPTIONS));
		L.tileLayer(constants.MAP_TILE_2_LAYER, {
			attribution: constants.MAP_TILE_2_ATTRIBUTION
		}).addTo(this.njMap);
	},
	computed: {
		...mapState(['njMap', 'activePeriodId', 'mapLoading']),
		activePeriodClass() {
			return `${this.containerClass}--${this.periods[this.activePeriodId]}`
		}
	},
}
</script>

<style lang="scss">
@import '../../node_modules/leaflet/dist/leaflet.css';
@import '../settings.scss';

.nj-muni-map {
	&__loading {
		position: absolute;
		left: 80px;
		background-color: white;
		padding: 5px;
		z-index: 999;
	}
	&__map-container {
		position: relative;
	}
	&__map {
		height: $map-height;
		width: $map-width;
	}
}

</style>
