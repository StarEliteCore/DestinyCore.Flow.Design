<template>
  <div id="flow-design-panel">
    <nav class="flow-design-panel-left">
      <div>
        <a-button type="primary" draggable="true" data-type="rect" @mousedown.prevent="startDrag">Rect</a-button>
      </div>
      <div>
        <a-button type="primary" draggable="true" data-type="circle" @mousedown.prevent="startDrag">Circle</a-button>
      </div>
    </nav>
    <div class="flow-design-panel-graph">
      <a-row class="flow-design-panel-toolbar">
        工具栏
      </a-row>
      <div id="graph-panel" class="graph">
        <div id="container">
        </div>
      </div>

    </div>
  </div>

</template>
<script lang="ts" src="./flow-design-panel.ts"></script>
<style lang="scss" src="./flow-design-panel.scss" scoped>

</style>