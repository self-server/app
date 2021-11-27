<template>
  <VBtn text :color="color">
    <VIcon v-if="!online" class='mr-1' :color='color' >
      mdi-alert-circle-outline
    </VIcon>
    {{ text }}
  </VBtn>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Uptime',
  data: () => ({ }),
  computed: {
    ...mapGetters(['general', 'online']),
    uptime() { return this.general.uptime },
    text() {
      return this.online ? this.uptime : 'check connection'
    },
    color() {
      return !this.online ? 'error' : ''
    }
  },
}
</script>