import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		muniData: []
	},
	mutations: {
		setMuniData (state, muniData) {
			state.muniData = muniData;
		},
	}
});

export default store;