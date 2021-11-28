<template>
  <Panel
    key='ProcessorPanel'    
    progress-color='primary'
    progress-value='100'
    full
  >
    <template v-slot:title>
      Processor
    </template>
    <template v-slot:additional>
      5%
    </template>
    <VContainer fluid class='pt-0'>
      <VRow no-gutters>
        <VCol cols='6' class='pa-1'>
          <VProgressLinear rounded height='20' color='primary' :value='3'>
            <template v-slot:default>
              <span class="white--text">3%</span>
            </template>
          </VProgressLinear>
        </VCol>
        <VCol cols='6' class='pa-1'>
          <VProgressLinear rounded height='20' color='primary' :value='3'>
            <template v-slot:default>
              <span class="white--text">3%</span>
            </template>
          </VProgressLinear>
        </VCol>
        <VCol cols='6' class='pa-1'>
          <VProgressLinear rounded height='20' color='primary' :value='3'>
            <template v-slot:default>
              <span class="white--text">3%</span>
            </template>
          </VProgressLinear>
        </VCol>
        <VCol cols='6' class='pa-1'>
          <VProgressLinear rounded height='20' color='primary' :value='3'>
            <template v-slot:default>
              <span class="white--text">3%</span>
            </template>
          </VProgressLinear>
        </VCol>                
      </VRow>
    </VContainer>
  </Panel>
</template>

<script>
export default {
  name: 'ProcessorPanel',
  data: () => ({ }),
  methods: {
    number(value) { return Number.parseFloat(value).toFixed(1) }
  },
  computed: {
    headers() { 
      return [
        { text: 'Drive', value: 'name', width: '30%' },
        { text: 'Size', value: 'size', width: '60%', align: 'right' },
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