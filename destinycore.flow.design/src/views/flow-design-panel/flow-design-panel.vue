<template>
  <div id="flow-design-panel">
    <nav class="flow-design-panel-left">
      <a-button
        v-for="item in buttonNodeTool"
        :key="item.type"
        draggable="true"
        data-type="circle"
        @mousedown.native.prevent="($event) => startDrag($event, item)"
        >{{ item.label }}</a-button
      >
    </nav>
    <div class="flow-design-panel-graph">
      <a-row class="flow-design-panel-toolbar">
        <a-button
          type="primary"
          draggable="true"
          data-type="rect"
          :disabled="!canRedo"
          @click="onRedo"
          >重做</a-button>
        <a-button
          type="primary"
          draggable="true"
          data-type="rect"
          :disabled="!canUndo"
          @click="onUndo">撤销</a-button
        >
        <a-button type="primary" draggable="true" data-type="rect" @click="Save">保存</a-button>
      </a-row>
      <div id="graph" class="graph">
        <div id="destiny-minimap" class="minimapContainer"></div>
        <div id="container"></div>
      </div>
    </div>
    <node-operate  ref="NodeOperateInfo" :graph="graph"></node-operate>
  </div>
</template>
<script lang="ts" src="./flow-design-panel.ts"></script>
<style lang="scss" src="./flow-design-panel.scss">
</style>