<template>
  <div class="hello">
	<div id="njMap"></div>
  </div>
</template>

<script>
import L from 'leaflet';

export default {
	name: 'NjMap',
	data: function () {
		return {
			map: {}
		}
	},
	mounted() {
		this.map = L.map('njMap');
	}
}
</script>

<style lang="scss">
@import '../../node_modules/leaflet/dist/leaflet.css';

</style>
