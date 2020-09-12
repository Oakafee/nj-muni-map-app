<template>
	<div
		class="nj-muni-map__muni-legend"
		:class="[opaqueClass, translucentClass]">
		<h2>{{ unitTitle }}</h2>
		<h3>{{ unitSubtitle }}</h3>
		<ul class="nj-muni-map__muni-legend-list">
			<MuniLegendLine
				v-for="level in metricScaleLevels"
				:key="level"
				:scaleLevel="level"
			/>
		</ul>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants';
import MuniLegendLine from './MuniLegendLine';

export default {
	name: 'MuniLegend',
	components: { MuniLegendLine },
	computed: {
		...mapState(['activeMetricId', 'unitTitle', 'unitSubtitle', 'muniTranslucence']),
		opaqueClass() {
			if(this.muniTranslucence === 'opaque') {
				return `${constants.MUNI_LEGEND_CLASS}--opaque`
			} else return null
		},
		translucentClass() {
			if(this.muniTranslucence === 'translucent') {
				return `${constants.MUNI_LEGEND_CLASS}--translucent`
			} else return null
		},
		metricScaleLevels() {
			return constants.LEGEND_SCALE_LEVELS[this.activeMetricId]
		}
	},
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map__muni-legend {
	margin: 3*$spacing $spacing 0 0;
	&-list {
		margin: 2*$spacing 0 $spacing;
	}
}

@each $metric, $scaleColorsMap in $metrics {
	@each $level, $color in $scaleColorsMap {
		.nj-muni-map__muni-legend-line--#{$metric}--#{$level} {
			fill: $color;
		}
	}
}

</style>


