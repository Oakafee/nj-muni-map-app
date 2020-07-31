<template>
	<div
		class="nj-muni-map__building-legend"
		:class="{ 'nj-muni-map__building-legend--translucent': muniTranslucent }">
		<h4>Number of Buildings Built </h4>
			<ul>
				<li v-for="entry in entries" :key="entry.count">
					<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-labelledby="title" role="img" width="18" height="18">
						<title>Building color </title>
						<rect width="18" height="18" :style="{ fill:entry.color}" />
					
					</svg>
					{{ entry.count }}
				</li>
				<li><input type="checkbox" id="translucent" name="translucent" v-model="muniTranslucence" /><label for="translucent">Make translucent </label></li>
			</ul>
	</div>
</template>

<script>
import constants from '../constants';
import {mapState} from 'vuex';
import store from '../store';

export default {
	name: 'BuildingLegend',
	data() {
		return {
			entries: constants.BUILDING_COLORS
		}
	},
	computed: {
		...mapState(['muniTranslucent']),
		muniTranslucence: {
			get() {
				return this.muniTranslucent
			},
			set() {
				store.commit('toggleMuniOpacity')
			}
		},
	}	
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map {
	&__building-legend {
		padding: $spacing 0;
		li {
			padding-bottom: $spacing / 2;
		}
		svg {
			padding-right: $spacing / 2;
		}
		rect {
			stroke: $poly-stroke-color;
			stroke-width: $poly-stroke-width;
			transition: fill-opacity $t;
		}
		label {
			padding: $spacing;
		}
		&--translucent {
			rect {
				fill-opacity: $poly-fill-opacity;
			}
		}
	}
}


</style>
