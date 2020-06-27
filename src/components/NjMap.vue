<template>
  <div class="hello">
	<p v-if="muniData.length == 0">Loading...</p>
	<div id="njMap" class=nj-muni__map></div>
	<p>{{ muniData }}/</p>
  </div>
</template>

<script>
import L from 'leaflet';
import {mapState} from 'vuex';
import constants from '../constants'

export default {
	name: 'NjMap',
	data() {
		return {
			map: {},
			mapMuniLayer: {}
		}
	},
	mounted() {
		this.map = L.map('njMap', constants.MAP_DEFAULT_OPTIONS);
		L.tileLayer(constants.MAP_TILE_2_LAYER, {
			attribution: constants.MAP_TILE_2_ATTRIBUTION
		}).addTo(this.map);
	},
	computed: mapState(['muniData']),
	watch: {
		muniData() {
			this.mapMuniLayer = L.geoJSON(this.muniData, {
				style: feature => {
					const oldbuild = feature.properties.time_periods.contemporary;
					let color = '';
					
					constants.BUILDING_COLORS.forEach(item => {
						if (oldbuild > item.count) {
							color = item.color
						}
					});
					
					return {
						'color': 'black',
						'fillColor': color,
						'weight': 0.5,
						'fillOpacity': 0.7
						
					}
				},
				onEachFeature: (feature, layer) => {
					layer.bindPopup(feature.properties.NAME);
				},
			}).addTo(this.map);
		}
	}
}
</script>

<style lang="scss">
@import '../../node_modules/leaflet/dist/leaflet.css';

.nj-muni__map {
	height: 900px;
	width: 900px;
}	

</style>
