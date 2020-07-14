import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		njMap: {},
		activePeriodId: 5,
	},
	mutations: {
		startNjMap(state, njMap) {
			state.njMap = njMap
		},
		switchTimePeriod(state, timePeriod) {
			state.activePeriodId = timePeriod
		}
	}
});

export default store;