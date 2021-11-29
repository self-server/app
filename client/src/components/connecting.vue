<template>
  <VOverlay :value="!online">
    <VProgressCircular indeterminate color='primary' size='200' width='8'>
      <h2>Connecting</h2>
    </VProgressCircular>
  </VOverlay>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ConnectingOverlay',
  data: () => ({  }),
  computed: {
    ...mapGetters(['general']),
    online() { return this.general.online }
  },
}
</script>