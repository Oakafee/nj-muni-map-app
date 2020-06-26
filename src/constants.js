export default {
	MUNI_API_URL: 'https://nj-municipalities-map.s3.us-east-2.amazonaws.com/MuniDataAll.json',
	MAP_DEFAULT_OPTIONS: {
		center: [40.17, -74.70],
		// slightly north of the state's center, for the sake of the home page map
		zoom: 9,
		maxZoom: 15,
		scrollWheelZoom: false
	},
	MAP_TILE_LAYER: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
	MAP_TILE_2_LAYER: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
	MAP_TILE_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	MAP_TILE_2_ATTRIBUTION: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS...and the GIS User Community',
}