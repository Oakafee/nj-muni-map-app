import Vue from 'vue';
import Vuex from 'vuex';

import functions from './functions';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		mobileNavOpen: false
	},
	mutations: {
		toggleMobileNav (state, navStatus) {
			state.mobileNavOpen = navStatus;
		},
	}
});

export default store;