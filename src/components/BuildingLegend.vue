<template>
	<div
		class="nj-muni-map__muni-legend"
		:class="[opaqueClass, translucentClass]">
		<h5>Buildings Built </h5>
		<h6>{{ periodNames[activePeriodId] }} </h6>
			<ul>
				<MuniLegendLine
					v-for="level in buildingLevels"
					:key="level"
					:svgClass="`nj-muni-map__building-legend-line--${level}`"
					:label="level"
				/>
				<li class="nj-muni-map__muni-legend-opacity-select">
					<input type="radio" id="opaque" name="translucence" value="opaque" v-model="muniTranslucence" /><label for="opaque">Opaque </label>
					<input type="radio" id="translucent" name="translucence" value="translucent" v-model="muniTranslucence" /><label for="translucent">Translucent </label>
					<input type="radio" id="hidden" name="translucence" value="hidden" v-model="muniTranslucence" /><label for="hidden">Hidden </label>
				</li>
			</ul>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants';
import store from '../store';
import MuniLegendLine from './MuniLegendLine';

export default {
	name: 'BuildingLegend',
	components: { MuniLegendLine },
	data() {
		return {
			buildingLevels: constants.BUILDING_LEVELS,
			periodNames: constants.TIME_PERIODS_PRETTY
		}
	},
	computed: {
		...mapState(['activePeriodId']),
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
		}
	}	
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map {
	&__building-legend-line {
		@each $level, $color in $building-colors {
			&--#{$level} {
				fill: $color;
			}
		}
	}
	&__muni-legend-opacity-select {
		font-size: $font-size-sm;
		padding-bottom: $spacing * 1.5;
	}
}


</style>
