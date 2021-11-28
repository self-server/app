<template>
  <VRow no-gutters>
    <VCol cols='12' sm='12' md='4' lg='3' xl='3'>
      <DrivesPanel />
      <ProcessorPanel />
    </VCol>
    <VCol cols='12' sm='12' md='8' lg='9' xl='9'>
      <VRow no-gutters>
        <VCol 
          cols='12' sm='12' md='6' lg='4' xl='4'
          v-for='(column, index) in columns' :key="`column-${index}`"
          >
          <Draggable style='padding-bottom: 100px;' :list='column' group='apps' :key="`draggable-${index}`">
            <Panel 
              v-for='panel in column' 
              :key="panel.key"
              :title='panel.title'
            />
          </Draggable>
        </VCol>
      </VRow>
    </VCol>
  </VRow>

</template>

<script>
import Draggable from 'vuedraggable'

import DrivesPanel from './panels/drives'
import ProcessorPanel from './panels/processor'

export default {
  name: 'Home',
  components: {
    Draggable,
    DrivesPanel,
    ProcessorPanel
  },
  data: () => ({ 
    columns: [
      [ { key: 'mediaCenterPanel', title: 'Media Center'}, ],
      [ { key: 'collaborationPanel', title: 'Collaboration' }, ],
      [ { key: 'gamesPanel', title: 'Game Servers' }, ]
    ]
  }),
}
</script>
