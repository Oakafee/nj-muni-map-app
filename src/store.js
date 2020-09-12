import Vue from 'vue';
import Vuex from 'vuex';
import constants from './constants';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		njMap: {},
		mapLoading: false,
		activePeriodId: null,
		transitVisibility: {
			'railroad': false,
			'highway': false,
			'county': false
		},
		// the ALL CAPS is to match how the data comes in from the source JSON	
		activeMuniInfo: {
			'MUN_CODE': '0701',
			'NAME': 'Borage',
			'POP2010': '100',
			'POPDEN2010': '100',
			'SQ_MILES': '100',
			'time_periods': {}
		},
		muniTranslucence: 'opaque',
		activeMetricId: 0,
		unitTitle: '',
		unitSubtitle: '',
	},
	mutations: {
		startNjMap(state, njMap) {
			state.njMap = njMap
		},
		switchTimePeriod(state, timePeriod) {
			state.activePeriodId = timePeriod;
			state.unitSubtitle = 
			`${constants.METRICS_UNITS[state.activeMetricId][1]} ${constants.TIME_PERIODS_PRETTY[state.activePeriodId]} period`
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
			state.unitTitle = constants.METRICS_UNITS[metricId][0];
			state.unitSubtitle = metricId == 4 ? '(2010)':
			`${constants.METRICS_UNITS[state.activeMetricId][1]} ${constants.TIME_PERIODS_PRETTY[state.activePeriodId]} period`
		}
	}
});

export default store;