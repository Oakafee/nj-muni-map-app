import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		muniData: [],
		activePeriodId: 5
	},
	mutations: {
		setMuniData (state, muniData) {
			state.muniData = muniData
		},
		setActivePeriod (state, id) {
			state.activePeriodId = id
		}
	}
});

export default store;