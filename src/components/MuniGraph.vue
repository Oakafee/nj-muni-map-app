<template>
	<div class="nj-muni-graph">
		<p>{{ activeMuniInfo }} </p>
		<div class="nj-muni-graph__container">
			<div class="nj-muni-graph__bar"></div>
			<div class="nj-muni-graph__bar"></div>
			<div class="nj-muni-graph__bar"></div>
			<div class="nj-muni-graph__bar"></div>
			<div class="nj-muni-graph__bar"></div>
			<div class="nj-muni-graph__bar"></div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex';

export default {
	name: 'MuniGraph',
	computed: mapState(['activeMuniInfo'])
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-graph {
	&__container {
		border: 1px solid black;
		width: 300px;
		height: 100px;
		display: flex;
		justify-content: space-evenly;
		align-items: end;
	}
	&__bar {
		max-width: 10px;
		height: 50px;
		background-color: black;
		flex: 1 0 auto;
	}
}

</style>
