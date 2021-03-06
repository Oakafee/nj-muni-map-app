<template>
  <ul class="nj-muni-map__transit-toggle">
	<li @click.once="getTransitLayer('railroad')"><input type="checkbox" id="railroad" name="railroad" v-model="showRailroad" /><label for="railroad">Railroads (current NJ Transit)</label></li>
	<li @click.once="getTransitLayer('highway')"><input type="checkbox" id="highway" name="highway" v-model="showHighway" /><label for="highway">Highways (current) </label></li>
	<li @click.once="getTransitLayer('county')"><input type="checkbox" id="county" name="county" v-model="showCounty" /><label for="county">County boundaries </label></li>
  </ul>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import {mapState} from 'vuex';
import store from '../store';
import constants from '../constants'

export default {
	name: 'TransitToggle',
	data() {
		return {
			transitLayers: {
				'railroad': {},
				'highway': {},
				'county': {}
			},
			apiUrls: {
				'railroad': `${constants.BASE_API_URL}${constants.RAILROAD_FILENAME}`,
				'highway':`${constants.BASE_API_URL}${constants.HIGHWAY_FILENAME}`,
				'county': `${constants.BASE_API_URL}${constants.COUNTY_FILENAME}`,
			},
		}
	},
	computed: {
		...mapState(['njMap', 'transitVisibility']),
		showRailroad: {
			get() {
				return this.transitVisibility['railroad']
			},
			set() {
				this.toggleTransit('railroad');
			}
		},
		showHighway: {
			get() {
				return this.transitVisibility['highway']
			},
			set() {
				this.toggleTransit('highway');
			}			
		},
		showCounty: {
			get() {
				return this.transitVisibility['county']
			},
			set() {
				this.toggleTransit('county');
			}			
		}
	},
	methods: {
		getTransitLayer(transitType) {
			const _this = this;
			store.commit('changeLoadingState', true);
			axios.get(this.apiUrls[transitType])
				.then((response) => {
					_this.displayTransit(transitType, response.data);
					store.commit('changeLoadingState', false);
			});
		},
		displayTransit(transitType, transitShapes) {
			this.transitLayers[transitType] = L.geoJSON(transitShapes, {
					style() {
						return {
							'className': `${constants.TRANSIT_CLASS} ${constants.TRANSIT_CLASS}--${transitType}`
						}
					},
			}).addTo(this.njMap);
		},
		toggleTransit(transitType) {
			store.commit('toggleTransit', {
				'transitType': transitType,
				'visible': !this.transitVisibility[transitType]
			});
		},
	},
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map {
	&__transit-toggle {
		li {
			padding: $spacing/2;
		}
		label {
			padding: $spacing;
		}
	}
	&__transit {
		visibility: hidden;
		&--railroad {
			stroke: $railroad-color;
			stroke-width: $transit-width;
		}
		&--highway {
			stroke: $highway-color;
			stroke-width: $transit-width;
		}
		&--county {
			stroke: $county-color;
			stroke-width: $transit-width;
			fill: none;
		}
	}
}

@each $mode in $transitModes {
	.nj-muni-map__map-container--#{$mode} {
		.nj-muni-map__transit--#{$mode} {
			visibility: visible;
		}
	}
}

</style>
