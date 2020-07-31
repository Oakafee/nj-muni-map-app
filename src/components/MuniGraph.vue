<template>
	<div class="nj-muni-graph">
		<div v-if="activeMuniInfo.name">
			<h3 class="nj-muni-graph__title">{{ activeMuniInfo.name }} </h3>
			<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="nj-muni-graph__y-axis" aria-labelledby="title" role="img">
					<title id="title">Graph of building built over time by municipality</title>
				<g class="nj-muni-graph__y-grid">
					<line x1="45" x2="50" y1="0" y2="0"></line>
					<line x1="45" x2="50" y1="50" y2="50"></line>
					<line x1="45" x2="50" y1="100" y2="100"></line>
					<line x1="45" x2="50" y1="150" y2="150"></line>				
				</g>
				<g class="nj-muni-graph__y-label">
					<text x="18" y="15">16,000</text>
					<text x="18" y="65">12,000</text>
					<text x="24" y="115">8,000</text>
					<text x="24" y="165">4,000</text>
				</g>
				<g class="explanation">
					<text x="0" y="0" transform="translate(12, 150) rotate(270)">Buildings Built</text>
				</g>
			</svg>
			<div class="nj-muni-graph__bar-container">
				<div
					class="nj-muni-graph__bar"
					v-for="(barHeight, index) in barHeights"
					:key="barHeight"
					:style="{ height:`${barHeight}px` }"
				>
					<div class="nj-muni-graph__bar-number">{{ buildingData[index] }}</div>
				</div>
			</div>
			<div class="nj-muni-graph__x-axis">
				<div
					class="nj-muni-graph__x-label-container"
					v-for="(period, index) in timePeriodsPretty"
					:key="period"
				>
					<div
						class="nj-muni-graph__x-label"
						:class="(index == activePeriodId) ? 'nj-muni-graph__x-label--active': ''"
					>{{ period }} </div>
				</div>
			</div>
			<p>activePeriodId: {{ activePeriodId }} </p>
		</div>
		<div class="nj-muni-graph__empty-message" v-else><p>Click a municipality on the map for a chart of its development over time </p></div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import constants from '../constants';

export default {
	name: 'MuniGraph',
	data() {
		return {
			timePeriodsPretty: constants.TIME_PERIODS_PRETTY,
			bold: { fontWeight: 'bold' }
		}
	},
	computed: {
		...mapState(['activeMuniInfo', 'activePeriodId']),
		buildingData() {
			return Object.values(this.activeMuniInfo.time_periods);
		},
		barHeights() {
			return this.buildingData.map(x =>
				x / constants.CHART_MAX_BUILDINGS * constants.CHART_HEIGHT_PX
			);
		}
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-graph {
	&__title {
		margin-left: 100px;
		margin-bottom: $spacing;
	}
	&__y-axis {
		height: 200px;
		width: 50px;
		display: inline-block;
	}
	&__y-label {
		font-size: 8pt;
	}
	&__y-grid {
		stroke: black;
	}
	&__bar-container {
		border-bottom: 1px solid black;
		border-left: 1px solid black;
		width: $chart-width;
		height: $chart-height;
		display: inline-flex;
		justify-content: space-evenly;
		align-items: flex-end;
		position: absolute; /* this is a 'hacky' formatting fix */
	}
	&__bar {
		max-width: $bar-width;
		height: 0px;
		background-color: $bar-color;
		flex: 1 0 auto;
		transition: height $t;
		&:hover .nj-muni-graph__bar-number {
			opacity: 1;
		}
	}
	&__bar-number {
		position: relative;
		top: -20px;
		opacity: 0;
		transition: opacity $t;
	}
	&__x-axis {
		display: flex;
		justify-content: space-evenly;		
		margin-left: 50px;
		padding-top: 10px;
		width: $chart-width;
	}
	&__x-label-container {
		max-width: $bar-width;
		font-size: 10pt;
		transform: rotate(65deg);
	}
	&__x-label {
		width: 125px;
		&--active {
			font-weight: bold;
		}
	}
	&__empty-message {
		font-style: italic;
	}
}
</style>
