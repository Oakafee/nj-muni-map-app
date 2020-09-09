<template>
	<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="nj-muni-graph__y-axis" aria-labelledby="title" role="img">
			<title id="title">Graph of building density over time by municipality</title>
		<g class="nj-muni-graph__y-grid">
			<line x1="45" x2="50" y1="0" y2="0"></line>
			<line x1="45" x2="50" y1="50" y2="50"></line>
			<line x1="45" x2="50" y1="100" y2="100"></line>
			<line x1="45" x2="50" y1="150" y2="150"></line>				
		</g>
		<g class="nj-muni-graph__y-label">
			<text x="15" y="10">8,000</text>
			<text x="13" y="60">6,000</text>
			<text x="19" y="110">4,000</text>
			<text x="19" y="160">2,000</text>
		</g>
		<g class="explanation">
			<text x="0" y="0" transform="translate(12, 150) rotate(270)">Buildings / sq mi</text>
		</g>
	</svg>
</template>

<script>
export default {
	name: 'XAxisBuildDensity'
}
</script>
