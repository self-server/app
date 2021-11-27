<template>
  <VCard tile class='ma-1 mb-2'>
    <VProgressLinear height='4' :color='progressColor' :value='progressValue' />
    <VToolbar dense tile flat>
      <VToolbarTitle v-if='title'>{{ title }}</VToolbarTitle>
      <VSpacer />
      <VSlideYReverseTransition>
        <div v-show='!expanded'>
          <slot name='collapsed' />
        </div>
      </VSlideYReverseTransition>
      <slot name='additional' />

      <VBtn icon v-on:click="expanded = !expanded" :class="{ opened: expanded }">
        <VIcon>mdi-chevron-down</VIcon>
      </VBtn>
    </VToolbar>
    <VSheet>
      <VExpandTransition>
        <div v-show="expanded">
          <VCardText>
            <slot />
          </VCardText>
        </div>
      </VExpandTransition>
    </VSheet>
  </VCard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Panel',
  props: {
    progressColor: {
      type: String,
      default: 'grey lighten-1'
    },
    progressValue: {
      type: [Number, String],
      default: 100
    },
    title: {
      type: [String, Boolean],
      default: false
    },
  },
  data: () => ({ }),
  mounted() { },
  methods: {
    ...mapActions(['setOpened'])
  },
  computed: {
    ...mapGetters(['opened']),
    panelKey() {
      return this.$vnode.key || this.$vnode.parent.key
    },
    expanded: {
      get() { 
        return this.opened[this.panelKey] ?? true
      },
      set(val) { 
        this.setOpened({
          panel: this.panelKey,
          value: val
        })
        return this.opened[this.panelKey]
      }
    }
  }
}
</script>

<style scoped>
.v-btn.opened .v-icon {
  transform: rotate(-180deg);
}
</style>