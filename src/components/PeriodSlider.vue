<template>
  <div class="nj-muni-map__period-slider">
	<h3>{{ periodNames[activePeriodId] }} </h3>
	<p>Select time period: </p>
	<input type="range" id="periods" name="periods"
         min="0" max="5" v-model="activePeriodId" />
  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import {mapState} from 'vuex';
import store from '../store';
import functions from '../functions';
import constants from '../constants'

export default {
	name: 'PeriodSlider',
	data() {
		return {
			periodNames: constants.TIME_PERIODS_PRETTY,
			buildingMapLayer: {}
		}
	},
	computed: {
		...mapState(['njMap']),
		activePeriodId: {
			set(activePeriodId) {
				store.commit('switchTimePeriod', activePeriodId)
			},
			get() {
				return store.state.activePeriodId
			}
		}
	},
	methods: {
		displayMunis(muniData) {
			const polyClass = { 'className': constants.POLY_CLASS };
			this.buildingMapLayer = L.geoJSON(muniData, {
				style: () => polyClass,
				onEachFeature: (feature, layer) => {
					layer.on('click', () => {
						store.commit('selectMuni', feature.properties);
					})
				},
			}).addTo(this.njMap);
			this.displayPeriodData();
		},
		displayPeriodData() {
			constants.TIME_PERIODS.forEach((period) => {
				this.buildingMapLayer.eachLayer((layer) => {
					const periodClass = `${constants.POLY_CLASS}--${period}`;
					const buildingCount = layer.feature.properties.time_periods[period];
					const scaleLevel = functions.calcLegendLevel(buildingCount, constants.BUILDING_LEVELS);
					const countClass = `${constants.POLY_CLASS}--${period}-${scaleLevel}`;
					
					layer._path.classList.add(periodClass);
					layer._path.classList.add(countClass);
				});				
			});
		}
	},
	mounted() {
		const _this = this;
		store.commit('changeLoadingState', true);
		axios.get(`${constants.BASE_API_URL}${constants.MUNI_FILENAME}`)
			.then((response) => {
				_this.displayMunis(response.data);
				store.commit('changeLoadingState', false);
		});
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map {
	&__muni {
		stroke: $poly-stroke-color;
		stroke-width: $poly-stroke-width;
		fill-opacity: 0;
		visibility: hidden;
		transition: fill-opacity $t;
	}
	&__slider {
		position: static;
	}
}

@each $period in $timePeriods {
	.nj-muni-map__map-container--#{$period} {
		.nj-muni-map__muni--#{$period} {
			visibility: visible;
		}
		@each $level, $color in $building-colors {
			.nj-muni-map__muni--#{$period}-#{$level} {
				fill: $color;
			}
		}
	}
}

.nj-muni-map__map-container--opaque-muni {
	.nj-muni-map__muni {
		fill-opacity: 1;		
	}
}
.nj-muni-map__map-container--translucent-muni {
	.nj-muni-map__muni {
		fill-opacity: $poly-fill-opacity;		
	}
}

</style>
