<template>
	<div class="nj-muni-map__opacity-select">
			<input type="radio" id="opaque" name="translucence" value="opaque" v-model="muniTranslucence" /><label for="opaque">Opaque </label>
			<input type="radio" id="translucent" name="translucence" value="translucent" v-model="muniTranslucence" /><label for="translucent">Translucent </label>
			<input type="radio" id="hidden" name="translucence" value="hidden" v-model="muniTranslucence" /><label for="hidden">Hidden </label>
	</div>
</template>

<script>
import store from '../store';

export default {
	name: 'OpacitySelect',
	computed: {
		muniTranslucence: {
			get() {
				return store.state.muniTranslucence
			},
			set(muniTranslucence) {
				store.commit('toggleMuniOpacity', muniTranslucence)
			}
		},
	}
}
</script>

<style lang="scss">
@import '../settings.scss';

.nj-muni-map__opacity-select {
	padding-bottom: $spacing;
}
</style>

