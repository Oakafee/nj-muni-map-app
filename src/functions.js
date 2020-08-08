export default {
	something() {},
	calcLegendLevel(value, levels) {
		// paramaters must be numbers
		let level = 0;
		levels.forEach((threshold) => {
			if (value >= threshold) {
				level = threshold
			}
		});
		return level;
	}
}