<template>
  <Panel
    key='DrivesPanel'    
    full
  >
    <template v-slot:title>

      Drives
    </template>
    <template v-slot:additional>
      <VTooltip left>
        <template v-slot:activator="{ on, attrs }">
          <VBtn 
            color='primary' 
            dark
            x-small
            v-bind='attrs'
            v-on='on'
          >
            Synced
          </VBtn>
        </template>
        Synced 22 minutes ago
      </VTooltip>
    </template>
    <VDataTable
      class='mt-n1'
      dense
      :headers='headers'
      :items='items'
      :items-per-page="-1"
      hide-default-footer
      disable-pagination
      disable-sort
      mobile-breakpoint='0'
    >
      <template v-slot:item.name="{ item }">
        <VTooltip right>
          <template v-slot:activator="{ on, attrs }">
            <VAvatar v-bind='attrs' v-on='on' :color="item.spundown ? 'muted' : 'primary' " size='10' class='mr-1' style="margin-bottom:2px!important;"/>
          </template>
          {{ item.spundown ? 'Drive is in standby' :'Drive is active' }}
        </VTooltip>
        {{ item.name }}
      </template>
      <template v-slot:item.temp="{ item }">
        <template v-if='!item.spundown'>
          {{ item.temp }}°C
        </template>
      </template>     
      <template v-slot:item.size="{ item }">
        <VProgressLinear  rounded height='20' color='primary' :value='item.used'>
          <template v-slot:default>
            <span class='pl-1 left white--text' >
              {{ number((item.size * (item.used / 100))) }} TB
            </span>
            <VSpacer />
            <span class='right pr-1 white--text' >
              {{ item.size }} TB
            </span>

          </template>
        </VProgressLinear>
      </template>          
    </VDataTable>

  </Panel>
</template>

<script>
export default {
  name: 'DrivesPanel',
  data: () => ({ }),
  methods: {
    number(value) { return Number.parseFloat(value).toFixed(1) }
  },
  computed: {
    headers() { 
      return [
        { text: 'Drive', value: 'name', width: '30%' },
        { text: '', value: 'size', width: '60%', align: 'right' },
        { text: 'Temp', value: 'temp', width: '10%' },
      ]
    },
    items() {
      return [
        { name: 'parity1', size: 4, used: 100, temp: '30', type: 'parity', spundown: false },
        { name: 'disk1', size: 4, used: 50, temp: '30', type: 'data', spundown: true },
        { name: 'disk2', size: 4, used: 10, temp: '30', type: 'data', spundown: false },
      ]
    }

  }
}
</script>

<style scoped lang='scss'>
::v-deep .v-data-table {
  tbody {
    tr:hover {
      background: transparent !important;
    }
  }
}
</style>