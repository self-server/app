<template>
  <VOverlay :value="!online">
    <VProgressCircular indeterminate color='error' size='200' width='8'>
      <h2>Connecting</h2>
    </VProgressCircular>
  </VOverlay>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ConnectingOverlay',
  data: () => ({ loading: false }),
  computed: {
    ...mapGetters(['general']),
    online() { return this.general.online }
  },
  watch: {
    online: {
      immediate: true,
      handler(val) {
        if (!val) this.loading = true
        setTimeout(() => this.loading = !val, 750)
      }
    }
  }
}
</script>