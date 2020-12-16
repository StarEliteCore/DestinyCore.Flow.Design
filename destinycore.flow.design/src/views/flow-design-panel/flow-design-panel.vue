<template>
  <div id="flow-design-panel">
    <nav class="flow-design-panel-left">
      <div>
        <a-button type="primary" draggable="true" data-type="circle" @mousedown.prevent="startDrag">开始节点</a-button>
      </div>
      <div>
        <a-button type="primary" draggable="true" data-type="rect" @mousedown.prevent="startDrag">任务节点</a-button>
      </div>
    </nav>
    <div class="flow-design-panel-graph">
      <a-row class="flow-design-panel-toolbar">
        工具栏
        <a-button type="primary" draggable="true" data-type="rect" @click="Save">保存</a-button>
      </a-row>
      <div id="graph" class="graph">
        <div id="destiny-minimap" class="minimapContainer"></div>
        <div id="container">
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./flow-design-panel.ts"></script>
<style lang="scss" src="./flow-design-panel.scss">
</style>