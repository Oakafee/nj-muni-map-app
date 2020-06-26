import axios from 'axios';
import store from './store.js';
import constants from './constants';
//import router from './router.js';
import simplify from 'simplify-geojson';

export default {
	getStateGovData() {
		return axios.get(constants.MUNICIPALITIES_API_URL);
	},
	getBuildingData() {
		return axios.get(constants.BUILDINGS_API_URL);
	},
	assembleCloudData() {
		console.log(new Date());
		Promise.all([this.getStateGovData(),this.getBuildingData()])
			.then((results) => {
				console.log(new Date());
				let geos = simplify(results[0].data, 0.001);
				const buildings = results[1].data;
				let assembledGeodata = {
					"type": "FeatureCollection",
					"crs": geos['crs'],
					"features": []
				};
				
				geos.features.forEach(geo => {
					let timePeriods = {};
					const geoMunCode = parseInt(geo.properties['MUN_CODE']);
					let newFeature = {
						"type": "Feature",
						"geometry": {},
						"properties": {}
					};
					
					buildings.forEach(building => {
						if(building['MUN_CODE'] == geoMunCode) {
							timePeriods = building['periods']
						}
					});
					newFeature.geometry = geo.geometry;
					newFeature.properties['time_periods'] = timePeriods;
					newFeature.properties['MUN_CODE'] = geo.properties['MUN_CODE'];
					newFeature.properties['NAME'] = geo.properties['NAME'];
					newFeature.properties['POP2010'] = geo.properties['POP2010'];
					newFeature.properties['POPDEN2010'] = geo.properties['POPDEN2010'];
					newFeature.properties['SQ_MILES'] = geo.properties['SQ_MILES'];
					assembledGeodata.features.push(newFeature);
				});
				console.log(new Date());
				store.commit('setMuniData', assembledGeodata);
				
				
			});
	}
}