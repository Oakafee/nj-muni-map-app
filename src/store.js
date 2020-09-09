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
		// the ALL CAPS is to match how the data comes in from the source JSON	
		activeMuniInfo: {
			'MUN_CODE': '',
			'NAME': '',
			'POP2010': '',
			'POPDEN2010': '',
			'SQ_MILES': '',
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
			state.activeMuniInfo['MUN_CODE'] = muniInfo['MUN_CODE'];
			state.activeMuniInfo['NAME'] = muniInfo['NAME'];
			state.activeMuniInfo['POP2010'] = muniInfo['POP2010'];
			state.activeMuniInfo['POPDEN2010'] = muniInfo['POPDEN2010'];
			state.activeMuniInfo['SQ_MILES'] = muniInfo['SQ_MILES'];
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