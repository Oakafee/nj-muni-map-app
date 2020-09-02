export default {
	BASE_API_URL: 'https://nj-municipalities-map.s3.us-east-2.amazonaws.com/',
	MUNI_FILENAME: 'MuniDataAll.json',
	RAILROAD_FILENAME: 'njrr.geojson',
	HIGHWAY_FILENAME: 'njhighways.geojson',
	COUNTY_FILENAME: 'njcounties.geojson',
	MAP_TITLE: 'njMap',
	MAP_DEFAULT_OPTIONS: {
		center: [40.2, -74.65],
		// slightly north of the state's center, for the sake of the home page map
		zoom: 8,
		maxZoom: 15,
		// scrollWheelZoom: false
	},
	MAP_TILE_LAYER: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
	MAP_TILE_2_LAYER: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
	MAP_TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	MAP_TILE_2_ATTRIBUTION: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS...and the GIS User Community',
	TIME_PERIODS: ['old', 'interwar', 'postwar', 'liberal', 'reagan', 'contemporary'],
	TIME_PERIODS_PRETTY: ['Old (before 1918)', 'Interwar (1919-1945)', 'Postwar (1946-1961)', 'Sixties/Seventies (1962-1981)', 'Reagan Era (1982-1991)', 'Contemporary (1992-2019)'],
	MAP_CLASS: 'nj-muni-map__map',
	POLY_CLASS: 'nj-muni-map__muni',
	TRANSIT_CLASS: 'nj-muni-map__transit',
	MUNI_LEGEND_CLASS: 'nj-muni-map__muni-legend',
	CHART_MAX_BUILDINGS: 16000,
	CHART_HEIGHT_PX: 200,
	METRICS: ['building-period', 'building-cumulative', 'building-density-period', 'building-density-cumulative', 'pop-density'],
	METRICS_PRETTY: ['Buildings Built by Time Period', 'Buildings Built, Cumulative', 'Building Density', 'Building Density, Cumulative', 'Population Density (2010)'],
	METRICS_UNITS: ['buildings built', 'buildings built', 'buildings per square mile', 'buildings per square mile', 'people per square mile'],
	SCALE_LEVELS: {
		'building-period': [0, 250, 500, 1000, 2000, 4000, 8000, 16000],
		'building-cumulative': [0, 250, 500, 1000, 2000, 4000, 8000, 16000],
		'building-density-period': [0, 125, 250, 500, 1000, 2000, 4000, 8000],
		'building-density-cumulative': [0, 125, 250, 500, 1000, 2000, 4000, 8000],
		'pop-density': [0, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000],
	},
	SQ_MILES_DECIMALS: 1
}