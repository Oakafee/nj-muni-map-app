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
			'highway': false
		}
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
		}
	}
});

export default store;