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
	calcMetricValue(layer, period, metric) {
		switch (metric) {
			case 'building-period':
				return layer.feature.properties.time_periods[period];
			case 'building-cumulative':
				return this.calcCumulativeBuildings(layer, period);
			case 'building-density-period':
				return layer.feature.properties.time_periods[period]/layer.feature.properties.SQ_MILES;
			case 'building-density-cumulative':
				return this.calcCumulativeBuildings(layer, period)/layer.feature.properties.SQ_MILES;
			case 'pop-density': 
				return layer.feature.properties.POPDEN2010;
		}	
	},
	calcCumulativeBuildings(layer, period) {
		// this is kind of a mess. I wonder if there's a more concise way?
		const periodIndex = constants.TIME_PERIODS.indexOf(period);
		let buildings = 0;
		for (let i=0; i<=periodIndex; i++) {
			buildings += layer.feature.properties.time_periods[constants.TIME_PERIODS[i]];
		}
		return buildings;
	}
}