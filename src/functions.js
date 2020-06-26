import axios from 'axios';

//import store from './store.js';
import constants from './constants';
//import router from './router.js';

export default {
	getStateGovData() {
		return axios.get(constants.MUNICIPALITIES_API_URL);
	},
	getBuildingData() {
		return axios.get(constants.BUILDINGS_API_URL);
	},
	assembleCloudData() {
		Promise.all([this.getStateGovData(),this.getBuildingData()])
			.then((results) => {
				let geos = results[0].data;
				const buildings = results[1].data;
				
				geos.features.forEach(geo => {
					let timePeriods = {};
					const geoMunCode = parseInt(geo.properties['MUN_CODE']);
					
					buildings.forEach(building => {
						if(building['MUN_CODE'] == geoMunCode) {
							timePeriods = building['periods']
						}
					});
					geo.properties['time_periods'] = timePeriods;
				});
				console.log(geos);
				
				
			});
	}
}