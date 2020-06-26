<template>
  <div id="app">
    <NjMap />
  </div>
</template>

<script>
import NjMap from './components/NjMap.vue';
import functions from './functions';

export default {
	name: 'App',
	components: {
		NjMap
	},
	mounted() {
		functions.assembleCloudData();
	}
}
</script>

<style>

</style>
