<template>
  <div class="hello">
	<input type="range" id="periods" name="periods"
         min="0" max="5" v-model="activePeriodId" />
	period: {{ periodNames[activePeriodId] }}
  </div>
</template>

<script>
import store from '../store';
import constants from '../constants'

export default {
	name: 'PeriodSlider',
	data() {
		return {
			periodNames: constants.TIME_PERIODS
		}
	},
	computed: {
		activePeriodId: {
			set(activePeriodId) {
				store.commit('setActivePeriod', activePeriodId)
			},
			get() {
				return store.state.activePeriodId
			}
		}
	}
}
</script>

<style lang="scss">
@import '../../node_modules/leaflet/dist/leaflet.css';
@import '../settings.scss';

.nj-muni-map {
	&__slider {
		position: static;
	}
}	

</style>
