<template>
  <VApp>
    <VAppBar app dense color="primary" dark>
      <VToolbarTitle>{{ hostname }}</VToolbarTitle>        
      <VSpacer />
      <Uptime class='d-none d-sm-flex'/>
      <template v-slot:extension>
        <VTabs show-arrows>
          <VTab v-for='page in pages' :key='page' :to="{ name: page }" exact>{{ page }}</VTab>
        </VTabs>
      </template>
    </VAppBar>

    <VMain>
      <VResponsive height="calc(100vh - 48px)" style='overflow-y: scroll'>
        <VContainer fluid>
          <VSlideXTransition mode='out-in' duration="50">
              <router-view />
          </VSlideXTransition>
        </VContainer>
      </VResponsive>
    </VMain>
  </VApp>
</template>

<script>
import { mapGetters } from 'vuex'
import Uptime from './components/Uptime.vue'

export default {
  name: 'SelfServer',
  components: { Uptime },
  mounted() { },
  data: () => ({ }),
  computed: {
    ...mapGetters(['dark', 'pages']),
    ...mapGetters(['general']),
    hostname() { return this.general.hostname },
  },
  methods: {
    // ...mapActions(['webSocketConnect'])
  },
  watch: {
    hostname: {
      immediate: true,
      handler(newVal) { document.title = newVal }
    },
    dark: {
      immediate: true,
      handler() { this.$vuetify.theme.dark = this.dark }
    }
  }
};
</script>

<style lang='scss'>
.v-application {
  background-color: var(--v-background-base) !important;
}

.v-app-bar {
  background: linear-gradient( 90deg,var(--v-primary-darken2), var(--v-primary-base));
}
</style>