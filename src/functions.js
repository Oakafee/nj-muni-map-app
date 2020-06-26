import axios from 'axios';
import store from './store.js';
import constants from './constants';
//import router from './router.js';

export default {
	setMuniData() {
		return axios.get(constants.MUNI_API_URL)
			.then((response) => {
				store.commit('setMuniData', response.data);
		});
	},
}