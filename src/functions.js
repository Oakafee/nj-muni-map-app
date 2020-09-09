import constants from './constants';

export default {
	calcLegendLevel(value, levels) {
		// paramaters must be numbers
		let level = 0;
		levels.forEach((threshold) => {
			if (value >= threshold) {
				level = threshold
			}
		});
		return level;
	},
	// TODO: make this take layer.feature.properties (not layer) so it can work with store.state.activeMuniInfo for the graph too. Will have to update the addMuniData() method in MuniSelect.vue
	calcMetricValue(properties, period, metric) {
		switch (metric) {
			case 'building-period':
				return properties.time_periods[period];
			case 'building-cumulative':
				return this.calcCumulativeBuildings(properties, period);
			case 'building-density-period':
				return properties.time_periods[period]/properties.SQ_MILES;
			case 'building-density-cumulative':
				return this.calcCumulativeBuildings(properties, period)/properties.SQ_MILES;
			case 'pop-density':
				return properties.POPDEN2010;
		}	
	},
	calcCumulativeBuildings(properties, period) {
		// this is kind of a mess. I wonder if there's a more concise way?
		const periodIndex = constants.TIME_PERIODS.indexOf(period);
		let buildings = 0;
		for (let i=0; i<=periodIndex; i++) {
			buildings += properties.time_periods[constants.TIME_PERIODS[i]];
		}
		return buildings;
	}
}