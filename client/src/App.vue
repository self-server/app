<template>
  <VApp>
    <VAppBar app dense color="primary" dark elevation='0'>
      <VToolbarTitle>{{ hostname }}</VToolbarTitle>        
      <VSpacer />
      <Uptime class='d-none d-sm-flex mr-2'/>
      
      <VBadge dot right overlap color='green' :value='false'>
        <VIcon v-on:click='todo()'>mdi-bell</VIcon>
      </VBadge>
    
      <template v-slot:extension>
        <VTabs show-arrows ref='tabs'>
          <VTab 
            v-for='page in pages' 
            :key='`${page}-tab`' 
            :to="{ name: page }" 
          >
            {{ page }}
          </VTab>
        </VTabs>
      </template>
    </VAppBar>

    <VMain>
      <Connecting />
      <VResponsive height="calc(100vh - 96px)" style='overflow-y: scroll'>
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
import Uptime from './components/uptime.vue'
import Connecting from './components/connecting.vue'

export default {
  name: 'SelfServer',
  components: { Connecting, Uptime },
  mounted() { 
    this.$store.dispatch('setDark', true) 
    window.dispatchEvent(new Event("resize"));
  },
  data: () => ({  }),
  computed: {
    ...mapGetters(['general','dark', 'pages']),
    hostname() { return this.general.hostname }
  },
  methods: { },
  watch: {
    hostname: {
      immediate: true,
      handler(newVal) { document.title = newVal }
    },
    dark: {
      immediate: true,
      handler() { this.$vuetify.theme.dark = this.dark }
    },
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

.theme--dark {
  &.v-tabs {
    .v-tab {
      color: #ffffff;
    }
    .v-tabs-slider {
      background-color: #ffffff;
    }
  }

  &.v-toolbar.v-sheet {
    background-color: #1E1E1E !important;
  }
}

</style>
