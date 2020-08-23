<template>
	<li class="nj-muni-map__muni-legend-line">
		<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" role="img" width="18" height="18" :class="legendLineColorClass">
			<title>Building color </title>
			<rect width="18" height="18" />
					
		</svg>
		{{ scaleLevel }}
	</li>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants';

export default {
	name: 'MuniLegendLine',
	props: ['scaleLevel'],
	computed: {
		...mapState(['activeMetricId']),
		metric() {
			return constants.METRICS[this.activeMetricId]
		},
		legendLineColorClass() {
			return `${constants.MUNI_LEGEND_CLASS}-line--${this.metric}--${this.scaleLevel}`
		}
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map__muni-legend-line {
	padding-left: $spacing;
	padding-bottom: $spacing / 2;
	svg {
		padding-right: $spacing / 2;
	}
	rect {
		stroke: $poly-stroke-color;
		stroke-width: $poly-stroke-width;
		fill-opacity: 0;
		transition: fill-opacity $t;
	}
}

</style>
