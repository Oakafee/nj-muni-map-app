<template>
  <div class="nj-muni-map__period-slider">
	<input
		type="range"
		id="periods"
		name="periods"
        min="0"
		max="5"
		v-model="activePeriodId"
		:class="{ 'nj-muni-map__period-slider--disabled': popDensity }"
	/>
	<h4 v-if="popDensity" class="nj-muni-map__period-slider--disabled">Pop density data is for 2010 only </h4>
	<h4 v-else>{{ periodName }}</h4>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import store from '../store';
import constants from '../constants'

export default {
	name: 'PeriodSlider',
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
		},
		periodName() {
			return constants.TIME_PERIODS_PRETTY[this.activePeriodId]
		}
	},
	mounted() {
		this.activePeriodId = 5;
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
		padding-bottom: 2*$spacing;
		/* position: static; */
		&--disabled {
		/* I tried to use the disabled attribute but it wasn't working well with vue or looking ngood in firefox */
			filter: grayscale(100%);
			opacity: 0.6;
			pointer-events: none;
		}
	}
}

/* pop density doesn't have time periods associated with the data like the other metrics */
@each $metric, $scaleColorsMap in $metrics {
	@if $metric == 'pop-density' {
		.nj-muni-map__map-container--pop-density {
			@each $level, $color in $scaleColorsMap {
				.nj-muni-map__muni--pop-density-#{$level} {
					fill: $color;
					visibility: visible;
				}
			}
		}		
	}
	@else {
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
