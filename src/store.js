import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		municipalBoundaries: []
	},
	mutations: {
		getMunicipalBoundaries (state, apiResponse) {
			state.municipalBoundaries = apiResponse;
		},
	}
});

export default store;