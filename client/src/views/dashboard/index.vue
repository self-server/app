<template>
  <VRow no-gutters>
    <VCol cols='12' sm='12' md='4' lg='3' xl='3'>


    </VCol>
    <VCol cols='12' sm='12' md='8' lg='9' xl='9'>
      <Panel 
        key='testingPanel'
        title='testing panels' 
        progress-color='green' 
        progress-value='50'
      >
        testing!

      </Panel>

    </VCol>
  </VRow>

</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
