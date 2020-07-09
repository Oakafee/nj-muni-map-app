<template>
  <div :class="[containerClass, activePeriodClass]">
	<p class="nj-muni-map__loading" v-if="muniData.length == 0">Loading...</p>
	<div id="njMap" :class="mapClass"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import {mapState} from 'vuex';
import constants from '../constants';

export default {
	name: 'NjMap',
	data() {
		return {
			map: {},
			buildingLayers: {},
			mapClass: constants.MAP_CLASS,
			containerClass: `${constants.MAP_CLASS}-container`,
			periods: constants.TIME_PERIODS,
		}
	},
	mounted() {
		this.map = L.map('njMap', constants.MAP_DEFAULT_OPTIONS);
		L.tileLayer(constants.MAP_TILE_2_LAYER, {
			attribution: constants.MAP_TILE_2_ATTRIBUTION
		}).addTo(this.map);
	},
	computed: {
		...mapState(['muniData', 'activePeriodId']),
		activePeriodClass() {
			return `${this.containerClass}--${this.periods[this.activePeriodId]}`
		}
	},
	watch: {
		muniData() {
			const _this = this;
			constants.TIME_PERIODS.forEach((period, index) => {
				_this.buildingLayers[index] = L.geoJSON(_this.muniData, {
					style: feature => {
						const buildNo = feature.properties.time_periods[period];
						let polyStyles = {
							'className': `${constants.POLY_CLASS} ${constants.POLY_CLASS}--${period} ${constants.POLY_CLASS}--${feature.properties.MUN_CODE}`
						};
						
						constants.BUILDING_COLORS.forEach(item => {
							if (buildNo >= item.count) {
								// >= 0 includes munis that have no data
								polyStyles['fillColor'] = item.color
							}
						});
						return polyStyles
					},
					onEachFeature: (feature, layer) => {
						layer.bindPopup(feature.properties.NAME);
					},
				}).addTo(_this.map);
			});
		}
	}
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
	&__muni {
		stroke: $poly-stroke-color;
		stroke-width: $poly-stroke-width;
		fill-opacity: 0;
		opacity: 0;
		//transition: fill-opacity $t; had delay issue
	}
}

@each $period in $timePeriods {
	.nj-muni-map__map-container--#{$period} {
		.nj-muni-map__muni--#{$period} {
			opacity: $poly-fill-opacity;
			fill-opacity: $poly-fill-opacity;
		}
	}
}


</style>
