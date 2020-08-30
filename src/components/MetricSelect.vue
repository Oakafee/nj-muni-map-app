<template>
	<select class="nj-muni-map__metric-select" v-model="selectedMetricId">
		<option
			v-for="(metric, index) in metrics"
			:key="index"
			:value="index"
		>
			{{ metrics_pretty[index] }}
		</option>
	</select>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';
import {mapState} from 'vuex';
import constants from '../constants';
import functions from '../functions';
import store from '../store';

export default {
	name: 'MetricSelect',
	data() {
		return {
			metrics: constants.METRICS,
			metrics_pretty: constants.METRICS_PRETTY,
			buildingMapLayer: {},
			metricsAdded: [],
		}
	},
	computed: {
		...mapState(['njMap']),
		selectedMetricId: {
			set(metricId) {
				store.commit('switchMetric', metricId);
				if (!this.metricsAdded.includes(metricId)) {
					this.addMuniData();
					this.metricsAdded.push(metricId);
				}
			},
			get() {
				return store.state.activeMetricId
			}
		}
	},
	methods: {
		displayMunis(muniData) {
			const polyClass = { 'className': constants.POLY_CLASS };
			this.buildingMapLayer = L.geoJSON(muniData, {
				style: () => polyClass,
				onEachFeature: (feature, layer) => {
					layer.on('click', () => {
						store.commit('selectMuni', feature.properties);
					})
				},
			}).addTo(this.njMap);
			this.addPeriodClasses();
			this.addMuniData();
		},
		addPeriodClasses() {
			constants.TIME_PERIODS.forEach((period) => {
				this.buildingMapLayer.eachLayer((layer) => {
					const periodClass = `${constants.POLY_CLASS}--${period}`;
					layer._path.classList.add(periodClass);
				});				
			});			
		},
		addMuniData() {
			// should I put in loading state? how long will this end up taking for people?
			const activeMetric = constants.METRICS[this.selectedMetricId];
			
			if (activeMetric === 'pop-density') {
				this.addPopDensityData(activeMetric);
				return;
			}
			constants.TIME_PERIODS.forEach((period) => {
				this.buildingMapLayer.eachLayer((layer) => {
					const metricValue = functions.calcMetricValue(layer, period, activeMetric);
					const scaleLevel = functions.calcLegendLevel(metricValue, constants.SCALE_LEVELS[activeMetric]);
					const valueClass = `${constants.POLY_CLASS}--${activeMetric}--${period}-${scaleLevel}`;
					
					layer._path.classList.add(valueClass);
				});
			})
		},
		addPopDensityData(activeMetric) {
		// this one is a special case because there are no time periods (it's just 2010 data)
			this.buildingMapLayer.eachLayer((layer) => {
				const metricValue = functions.calcMetricValue(layer, null, activeMetric);
				const scaleLevel = functions.calcLegendLevel(metricValue, constants.SCALE_LEVELS[activeMetric]);
				const valueClass = `${constants.POLY_CLASS}--pop-density-${scaleLevel}`;
				
				layer._path.classList.add(valueClass);
			});
		}
	},
	mounted() {
		const _this = this;
		store.commit('changeLoadingState', true);
		axios.get(`${constants.BASE_API_URL}${constants.MUNI_FILENAME}`)
			.then((response) => {
				_this.displayMunis(response.data);
				store.commit('changeLoadingState', false);
		});
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map__metric-select {
	padding: $spacing/2;
	margin-bottom: $spacing/2;
}

</style>
