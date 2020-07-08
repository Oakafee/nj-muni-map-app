<template>
  <div id="app">
    <NjMap />
	<PeriodSlider />
  </div>
</template>

<script>
import NjMap from './components/NjMap.vue';
import PeriodSlider from './components/PeriodSlider.vue';
import functions from './functions';

export default {
	name: 'App',
	components: {
		NjMap, PeriodSlider
	},
	mounted() {
		functions.setMuniData();
	}
}
</script>

<style>

</style>
