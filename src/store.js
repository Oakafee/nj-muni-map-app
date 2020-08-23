import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		njMap: {},
		mapLoading: false,
		activePeriodId: 5,
		transitVisibility: {
			'railroad': false,
			'highway': false,
			'county': false
		},
		activeMuniInfo: {
			'mun_code': '',
			'name': '',
			'pop2010': '',
			'popden2010': '',
			'sq_miles': '',
			'time_periods': {}
		},
		muniTranslucence: 'opaque',
		activeMetricId: 0
	},
	mutations: {
		startNjMap(state, njMap) {
			state.njMap = njMap
		},
		switchTimePeriod(state, timePeriod) {
			state.activePeriodId = timePeriod
		},
		changeLoadingState(state, loadingState) {
			state.mapLoading = loadingState
		},
		toggleTransit(state, payload) {
			state.transitVisibility[payload.transitType] = payload.visible;
		},
		selectMuni(state, muniInfo) {
			state.activeMuniInfo['mun_code'] = muniInfo['MUN_CODE'];
			state.activeMuniInfo['name'] = muniInfo['NAME'];
			state.activeMuniInfo['pop2010'] = muniInfo['POP2010'];
			state.activeMuniInfo['popden2010'] = muniInfo['POPDEN2010'];
			state.activeMuniInfo['sq_miles'] = muniInfo['SQ_MILES'];
			state.activeMuniInfo['time_periods'] = muniInfo['time_periods'];
		},
		toggleMuniOpacity(state, translucence) {
			state.muniTranslucence = translucence
		},
		switchMetric(state, metricId) {
			state.activeMetricId = metricId;
		}
	}
});

export default store;