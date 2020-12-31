<template>
  <div>
    <a-modal  :width="750" :maskClosable="false" v-model="IsShow" :title="title" @ok="handleOk">
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="基础配置">
          <p>节点标识：{{ nodeData.BasicConfiguration.id }}</p>
          <p>节点名称：{{ nodeData.BasicConfiguration.name }}</p>
          <p>
            节点处理策略：{{ nodeData.BasicConfiguration.processingStrategy }}
          </p>
          <p>节点处理策略：{{ nodeData.BasicConfiguration.signatureType }}</p>
        </a-tab-pane>
        <a-tab-pane key="2" tab="审批策略" force-render>
          Content of Tab Pane 2
        </a-tab-pane>
        <a-tab-pane key="3" tab="按钮配置"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script lang="ts" src="./flow-node-operate.ts"></script>
<style lang="scss" src="./flow-node-operate.scss" scoped></style>
