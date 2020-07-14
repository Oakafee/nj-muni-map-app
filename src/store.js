import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		njMap: {},
		mapLoading: false,
		activePeriodId: 5,
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
		}
	}
});

export default store;