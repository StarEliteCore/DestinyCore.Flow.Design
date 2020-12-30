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
          >重做</a-button
        >
        <a-button
          type="primary"
          draggable="true"
          data-type="rect"
          :disabled="!canUndo"
          @click="onUndo"
          >撤销</a-button
        >
        <a-button type="primary" draggable="true" data-type="rect" @click="Save">保存</a-button>
      </a-row>
      <div id="graph" class="graph">
        <div id="destiny-minimap" class="minimapContainer"></div>
        <div id="container"></div>
      </div>
    </div>
    <a-modal v-model="visible" title="流程步骤属性" @ok="handleOk">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="基础配置">
          <p>节点标识：{{ BasicConfiguration.id }}</p>
          <p>节点名称：{{ BasicConfiguration.name }}</p>
          <p>节点处理策略：{{ BasicConfiguration.processingStrategy }}</p>
          <p>节点处理策略：{{ BasicConfiguration.signatureType }}</p>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script lang="ts" src="./flow-design-panel.ts"></script>
<style lang="scss" src="./flow-design-panel.scss">
</style>