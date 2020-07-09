<template>
  <div class="nj-muni-map__map-title">
	<h1>Development in New Jersey's Municipalities </h1>
	<h1>{{ activePeriodName }} </h1>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants'

export default {
	name: 'PeriodSlider',
	computed: {
		...mapState(['activePeriodId']),
		activePeriodName() {
			return constants.TIME_PERIODS_PRETTY[this.activePeriodId]
		}
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map__map-title {
	
}	

</style>
