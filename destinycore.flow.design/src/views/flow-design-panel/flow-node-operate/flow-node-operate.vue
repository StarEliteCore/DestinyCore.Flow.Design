<template>
  <div>
    <a-modal
      :width="750"
      :maskClosable="false"
      v-model="IsShow"
      :title="title"
      @ok="handleOk"
    >
      <a-tabs default-active-key="1" @change="callback">
        <a-tab-pane key="1" tab="基础配置" force-render>
          <a-form-model
            :model="node"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="节点标识">
              <a-input v-model="node.id" />
            </a-form-model-item>
            <a-form-model-item label="节点名称">
              <a-input v-model="node.label" />
            </a-form-model-item>
            <a-form-model-item label="处理策略">
              <a-select v-model="node.data.basicConfiguration.processingStrategy" placeholder="请选择处理策略">
                <a-select-option
                  v-for="item in signatureTypeArr"
                  :value="item.key"
                  :key="item.key">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="审签类型">
              <a-select v-model="node.data.basicConfiguration.signatureType" placeholder="请选择审签类型">
                <a-select-option
                  v-for="item in signatureTypeArr"
                  :value="item.key"
                  :key="item.key">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="审批策略" force-render>
          <a-form-model
            :model="node"
            :label-col="labelCol"
            :wrapper-col="wrapperCol">
            <a-form-model-item label="流转类型">
              <a-select v-model="node.data.approvalStrategy.circulationType" placeholder="请选择流转类型">
                <a-select-option
                  v-for="item in circulationTypeArr"
                  :value="item.key"
                  :key="item.key">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="3" tab="按钮配置"> Content of Tab Pane 3 </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script lang="ts" src="./flow-node-operate.ts"></script>
<style lang="scss" src="./flow-node-operate.scss" scoped></style>
