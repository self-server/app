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
          <Draggable 
            style='padding-bottom: 100px;' 
            :list='column' 
            group='apps' 
            :key="`draggable-${index}`"
            handle='.v-toolbar'
          >
            <Panel 
              v-for='panel in column' 
              :key="panel.key"
              :title='panel.title'
              full
            >
              <VList dense>
                <Draggable 
                  :list='panel.apps' 
                  :group='panel.title' 
                  :key="`draggable-${panel.title}-apps`"
                  handle='.handle'
                >
                  <VListItem v-for="app in panel.apps" :key='app.title' :two-line="!!!app.subtitle">
                    <VListItemAvatar color='primary' size='40'>
                      <VImg :src="require(`@/assets/apps/${app.icon || 'docker.png'}`)" />
                    </VListItemAvatar>
                    <VListItemContent>
                      <VListItemTitle>{{ app.title }}</VListItemTitle>
                      <VListItemSubtitle v-if='app.subtitle'>{{ app.subtitle }}</VListItemSubtitle>
                    </VListItemContent>
                    <VListItemAction>
                      <VBtn icon>
                        <VIcon>mdi-dots-vertical</VIcon>
                      </VBtn>
                    </VListItemAction>

                    <VListItemAction>
                      <VIcon class='handle'>mdi-drag-horizontal-variant</VIcon>
                    </VListItemAction>
                  </VListItem>
                </Draggable>
              </VList>
            </Panel>
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
      [ 
        { 
          key: 'mediaCenterPanel', 
          title: 'Media Center',
          apps: [
            { title: 'Plex Media Server', subtitle: 'witty description of Plex', icon: 'plex.png' },
            { title: 'Sonarr', subtitle: false, icon: 'sonarr.png' },
          ]
        }, 
        { key: 'networkServicesPanel', title: 'Network Services', apps: [] },
      ],
      [ 
        { key: 'collaborationPanel', title: 'Collaboration', apps: [] }, 
        { key: 'developmentPanel', title: 'Development', apps: [] },
      ],
      [ { key: 'gameServersPanel', title: 'Game Servers', apps: [] }, ]
      
    ]
  }),
}
</script>

<style>
.handle {
  cursor: grab;
}

.dragging {
  cursor: grabbing;
}
</style>