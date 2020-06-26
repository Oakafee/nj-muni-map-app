<template>
  <div class="hello">
	<div id="njMap" class=nj-muni__map></div>
	<p>Hi, I am a map</p>
  </div>
</template>

<script>
import L from 'leaflet';
//import {mapState} from 'vuex';
//import constants from '../constants'

export default {
	name: 'NjMap',
//	computed: mapState(['municipalBoundaries']),
	mounted() {
		this.map = L.map('njMap');
	}
}
</script>

<style lang="scss">
@import '../../node_modules/leaflet/dist/leaflet.css';

.nj-muni__map {
	height: 300px;
	width: 300px;
}	

</style>
