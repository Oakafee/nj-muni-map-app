<template>
	<div class="nj-muni-graph">
		<div v-if="activeMuniInfo.NAME">
			<h4 class="nj-muni-graph__title">{{ activeMuniInfo.NAME }} </h4>
			<table class="nj-muni-graph__muni-info">
				<tr>
					<td>Area: </td>
					<td>{{ roundedArea }} mi<sup>2</sup></td>
				</tr>
				<tr>
					<td>Population (2010): </td>
					<td>{{ activeMuniInfo.POP2010 }} </td>
				</tr>
				<tr>
					<td>Pop density: </td>
					<td>{{ activeMuniInfo.POPDEN2010 }} people/mi<sup>2</sup> </td>
				</tr>
			</table>
			<p>{{ buildingData[activePeriodId] }} {{ unit }} <br />
			<small>{{ timePeriodsPretty[activePeriodId] }} period </small></p>
			<div v-if="unit">
				<XAxisBuilding v-if="unit=='buildings built'" />
				<XAxisBuildDensity v-else-if="unit=='buildings per square mile'" />
				<div class="nj-muni-graph__bar-container">
					<div
						class="nj-muni-graph__bar"
						:class="(unit == 'building-density' ?
							'nj-muni-graph__bar--build-density' :
							'nj-muni-graph__bar--building'
						)"
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
			</div>
			<div v-else>
				<p>No graph (population density data is only availble for the year 2010) </p>
			</div>
		</div>
		<div class="nj-muni-graph__empty-message" v-else><p>Click a municipality on the map for a chart of its development over time </p></div>
	</div>
</template>

<script>
import {mapState} from 'vuex';
import functions from '../functions';
import constants from '../constants';
import XAxisBuilding from './XAxisBuilding';
import XAxisBuildDensity from './XAxisBuildDensity';

export default {
	name: 'MuniGraph',
	components: {
		XAxisBuilding, XAxisBuildDensity
	},
	data() {
		return {
			timePeriodsPretty: constants.TIME_PERIODS_PRETTY,
			bold: { fontWeight: 'bold' }
		}
	},
	computed: {
		...mapState(['activeMuniInfo', 'activePeriodId', 'activeMetricId']),
		activeMetric() {
			return constants.METRICS[this.activeMetricId];
		},
		unit() {
			return constants.METRICS_UNITS[this.activeMetricId];
		},
		buildingData() {
			if (this.activeMetric == 'pop-density') return null;
			
			let values = [];
			
			constants.TIME_PERIODS.forEach((period) => {
				values.push(functions.calcMetricValue(this.activeMuniInfo, period, this.activeMetric));
			});
			if (this.unit == 'buildings per square mile') {
				values = values.map(val =>
					Number.parseFloat(val).toFixed(constants.BUILDING_DENSITY_DECIMALS)
				);
			}
			return values;
			//return Object.values(this.activeMuniInfo.time_periods);
		},
		barHeights() {
			const max = this.unit == 'buildings per square mile' ? constants.CHART_MAX_BUILDING_DENSITY : constants.CHART_MAX_BUILDINGS;
			
			return this.buildingData.map(x =>
				x / max * constants.CHART_HEIGHT_PX
			);
		},
		roundedArea() {
			return Number.parseFloat(this.activeMuniInfo.SQ_MILES).toFixed(constants.SQ_MILES_DECIMALS);
		},
		
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-graph {
	padding-top: $spacing;
	&__title {
		text-align: center;
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
		flex: 1 0 auto;
		transition: height $t;
		&--building {
			background-color: $bar-color-building;
		}
		&--build-density {
			background-color: $bar-color-build-density;
		}
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
		width: 150px;
		&--active {
			font-weight: bold;
		}
	}
	&__empty-message {
		font-style: italic;
	}
	&__muni-info {
		width: 100%;
		text-align: right;
		font-size: $font-size-sm;
	}
}
</style>
