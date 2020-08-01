<template>
	<div
		class="nj-muni-map__building-legend"
		:class="[opaqueClass, translucentClass]">
		<h4>Buildings Built <br />
		{{ periodNames[activePeriodId] }}
		</h4>
			<ul>
				<li class="nj-muni-map__building-legend-opacity-select">
					<input type="radio" id="opaque" name="translucence" value="opaque" v-model="muniTranslucence" /><label for="opaque">Opaque </label>
					<input type="radio" id="translucent" name="translucence" value="translucent" v-model="muniTranslucence" /><label for="translucent">Translucent </label>
					<input type="radio" id="hidden" name="translucence" value="hidden" v-model="muniTranslucence" /><label for="hidden">Hidden </label>
				</li>

				<li
					class="nj-muni-map__building-legend-entry"
					v-for="entry in entries"
					:key="entry.count"
				>
					<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" role="img" width="18" height="18">
						<title>Building color </title>
						<rect width="18" height="18" :style="{ fill:entry.color}" />
					
					</svg>
					{{ entry.count }}
				</li>
			</ul>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants';
import store from '../store';

export default {
	name: 'BuildingLegend',
	data() {
		return {
			entries: constants.BUILDING_COLORS,
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
				return `${constants.BUILDING_LEGEND_CLASS}--opaque`
			} else return null
		},
		translucentClass() {
			if(this.muniTranslucence === 'translucent') {
				return `${constants.BUILDING_LEGEND_CLASS}--translucent`
			} else return null
		}
	}	
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map {
	&__building-legend {
		padding: $spacing 0;
		&-entry {
			padding-bottom: $spacing / 2;
		}
		svg {
			padding-right: $spacing / 2;
		}
		rect {
			stroke: $poly-stroke-color;
			stroke-width: $poly-stroke-width;
			fill-opacity: 0;
			transition: fill-opacity $t;
		}
		&--translucent {
			rect {
				fill-opacity: $poly-fill-opacity;
			}
		}
		&--opaque {
			rect {
				fill-opacity: 1;
			}
		}
		&-opacity-select {
			font-size: $font-size-sm;
			padding-bottom: $spacing * 1.5;
		}
	}
}


</style>
