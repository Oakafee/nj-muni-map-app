<template>
  <div class="hello">
	<input type="range" id="periods" name="periods"
         min="0" max="5" v-model="activePeriodId" />
	period: {{ periodNames[activePeriodId] }}
  </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import {mapState} from 'vuex';
import store from '../store';
import constants from '../constants'

export default {
	name: 'PeriodSlider',
	data() {
		return {
			periodNames: constants.TIME_PERIODS_PRETTY,
			buildingLayers: {},
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
		displayMuniData(muniData) {
			const _this = this;
			constants.TIME_PERIODS.forEach((period, index) => {
				_this.buildingLayers[index] = L.geoJSON(muniData, {
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
				}).addTo(_this.njMap);
			});
		}
	},
	mounted() {
		const _this = this;
		store.commit('changeLoadingState', true);
		axios.get(constants.MUNI_API_URL).then((response) => {
			_this.displayMuniData(response.data);
			store.commit('changeLoadingState', false);
		});
	}
}
</script>

<style lang="scss">
@import '../../node_modules/leaflet/dist/leaflet.css';
@import '../settings.scss';

.nj-muni-map {
	&__muni {
		stroke: $poly-stroke-color;
		stroke-width: $poly-stroke-width;
		fill-opacity: 0;
		opacity: 0;
		//transition: fill-opacity $t; had delay issue
	}
	&__slider {
		position: static;
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
