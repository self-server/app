<template>
  <VBtn text> {{ uptime }} </VBtn>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Uptime',
  data: () => ({ }),
  computed: {
    ...mapGetters(['general']),
    uptime() { return this.general.uptime },
  },
}
</script>