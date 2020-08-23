<template>
  <div :class="[containerClass, activePeriodClass, metricClass, railroadVisibleClass, highwayVisibleClass, countyVisibleClass, muniTranslucentClass]">
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
			containerClass: `${constants.MAP_CLASS}-container`
		}
	},
	mounted() {
		store.commit('startNjMap', L.map(constants.MAP_TITLE, constants.MAP_DEFAULT_OPTIONS));
		L.tileLayer(constants.MAP_TILE_2_LAYER, {
			attribution: constants.MAP_TILE_2_ATTRIBUTION
		}).addTo(this.njMap);
	},
	computed: {
		...mapState(['njMap', 'activePeriodId', 'activeMetricId', 'mapLoading', 'transitVisibility', 'muniTranslucence']),
		activePeriodClass() {
			return `${this.containerClass}--${constants.TIME_PERIODS[this.activePeriodId]}`
		},
		metricClass() {
			return `${this.containerClass}--${constants.METRICS[this.activeMetricId]}`
		},
		// this is not very efficient. how can I do it better?
		railroadVisibleClass() {
			if (this.transitVisibility['railroad']) {
				return `${this.containerClass}--railroad`
			} else return null;
		},
		highwayVisibleClass() {
			if (this.transitVisibility['highway']) {
				return `${this.containerClass}--highway`
			} else return null;
		},
		countyVisibleClass() {
			if (this.transitVisibility['county']) {
				return `${this.containerClass}--county`
			} else return null;
		},
		muniTranslucentClass() {
			if (this.muniTranslucence === 'opaque') {
				return `${this.containerClass}--opaque-muni`
			} else if (this.muniTranslucence === 'translucent') {
				return `${this.containerClass}--translucent-muni`				
			} else return null;
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
