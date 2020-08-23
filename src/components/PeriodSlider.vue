<template>
  <div class="nj-muni-map__period-slider">
	<h3 v-if="popDensity">2010 </h3>
	<h3 v-else>{{ periodNames[activePeriodId] }} </h3>
	<p v-if="popDensity">Pop density is data is just for 2010 </p>
	<p v-else>Select time period: </p>
	<input
		type="range"
		id="periods"
		name="periods"
        min="0"
		max="5"
		v-model="activePeriodId"
		:class="{ 'nj-muni-map__period-slider--disabled': popDensity }"
	/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import store from '../store';
import constants from '../constants'

export default {
	name: 'PeriodSlider',
	data() {
		return {
			periodNames: constants.TIME_PERIODS_PRETTY
		}
	},
	computed: {
		...mapState(['activeMetricId']),
		activePeriodId: {
			set(activePeriodId) {
				store.commit('switchTimePeriod', activePeriodId)
			},
			get() {
				return store.state.activePeriodId
			}
		},
		popDensity() {
			return this.activeMetricId == 4
		}
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
	&__period-slider {
		position: static;
		/* is position static needed? */
		&--disabled {
		/* I tried to use the disabled attribute but it wasn't working well with vue or looking ngood in firefox */
			filter: grayscale(100%);
			opacity: 0.6;
			pointer-events: none;
		}
	}
}

@each $metric, $scaleColorsMap in $metrics {
	@each $period in $timePeriods {
		.nj-muni-map__map-container--#{$metric}.nj-muni-map__map-container--#{$period} {
			.nj-muni-map__muni--#{$period} {
				visibility: visible;
			}
			@each $level, $color in $scaleColorsMap {
				.nj-muni-map__muni--#{$metric}--#{$period}-#{$level} {
					fill: $color;
				}
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
