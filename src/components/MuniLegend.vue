<template>
	<div
		class="nj-muni-map__muni-legend"
		:class="[opaqueClass, translucentClass]">
		<MetricSelect />
		<ul class="nj-muni-map__muni-legend-list">
			<MuniLegendLine
				v-for="level in metricScaleLevels"
				:key="level"
				:svgClass="`nj-muni-map__building-legend-line--${level}`"
				:label="level"
			/>
			<li>{{ metricUnits[activeMetricId] }}</li>
			<li>{{ unitExplanationText }}</li>
		</ul>
		<div class="nj-muni-map__muni-legend-opacity-select">
				<input type="radio" id="opaque" name="translucence" value="opaque" v-model="muniTranslucence" /><label for="opaque">Opaque </label>
				<input type="radio" id="translucent" name="translucence" value="translucent" v-model="muniTranslucence" /><label for="translucent">Translucent </label>
				<input type="radio" id="hidden" name="translucence" value="hidden" v-model="muniTranslucence" /><label for="hidden">Hidden </label>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants';
import store from '../store';
import MetricSelect from './MetricSelect';
import MuniLegendLine from './MuniLegendLine';

export default {
	name: 'MuniLegend',
	components: { MetricSelect, MuniLegendLine },
	data() {
		return {
			periodNames: constants.TIME_PERIODS_PRETTY,
			metricUnits: constants.METRICS_UNITS,
			scaleLevels: constants.SCALE_LEVELS,
			metrics: constants.METRICS
		}
	},
	computed: {
		...mapState(['activePeriodId', 'activeMetricId']),
		muniTranslucence: {
			get() {
				return store.state.muniTranslucence
			},
			set(muniTranslucence) {
				store.commit('toggleMuniOpacity', muniTranslucence)
			}
		},
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
			return this.scaleLevels[this.metrics[this.activeMetricId]]
		},
		unitExplanationText() {
			if (this.activeMetricId == 0 || this.activeMetricId == 2) {
				// buildings by period, building density by period
				return `during ${this.periodNames[this.activePeriodId]}`
			}
			else if (this.activeMetricId == 1 || this.activeMetricId == 3) {
				// cumulative buildings, cumulative building density
				return `thru ${this.periodNames[this.activePeriodId]}`
			}
			else return "(2010)";
				// pop density
		}
	},
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map__muni-legend-list {
	margin: $spacing 0;
}

</style>


