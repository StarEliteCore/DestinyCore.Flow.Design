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
            layout="vertical"
            :model="node"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="节点标识：">
              <a-input v-model="node.id" />
            </a-form-model-item>
            <a-form-model-item label="节点名称：">
              <a-input v-model="node.label" />
            </a-form-model-item>

            <div class="ant-form-inline">
              <a-form-model-item
                label="处理策略："
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15 }"
                class="ant-col ant-col-12"
              >
                <a-select
                  v-model="node.data.basicConfiguration.processingStrategy"
                  placeholder="请选择处理策略"
                >
                  <a-select-option
                    v-for="item in ProcessingStrategyArr"
                    :value="item.key"
                    :key="item.key"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item
                label="审签类型："
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 15 }"
                class="ant-col ant-col-10"
              >
                <a-select
                  v-model="node.data.basicConfiguration.signatureType"
                  placeholder="请选择审签类型"
                >
                  <a-select-option
                    v-for="item in signatureTypeArr"
                    :value="item.key"
                    :key="item.key"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </div>
            <div class="ant-form-inline">
              <a-form-model-item
                label = '意见显示：'
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 15 }"
                class="ant-col ant-col-12"
              >
                <a-switch />
              </a-form-model-item>
              <a-form-model-item
                label = '是否归档：'
                :labelCol="{ span: 6 }"
                :wrapperCol="{ span: 15 }"
                class="ant-col ant-col-10"
              >
                <a-switch />
              </a-form-model-item>
            </div>
            <div class="ant-form-inline">
                <a-form-model-item label="表单："
                  :labelCol="{ span: 8 }"
                  :wrapperCol="{ span: 15 }"
                  class="ant-col ant-col-12"
                >
                    <a-select>

                    </a-select>
                </a-form-model-item>
                <a-form-model-item 
                  class="ant-col ant-col-10"
                >
                  <a-select>
                    
                  </a-select>
                </a-form-model-item>
            </div>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane key="2" tab="审批策略" force-render>
          <a-form-model
            :model="node"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="流转类型">
              <a-select
                v-model="node.data.approvalStrategy.circulationType"
                placeholder="请选择流转类型"
              >
                <a-select-option
                  v-for="item in circulationTypeArr"
                  :value="item.key"
                  :key="item.key"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="处理者类型">
              <a-select
                v-model="node.data.approvalStrategy.processorType"
                placeholder="请选择处理者类型"
              >
                <a-select-option
                  v-for="item in processorTypeArr"
                  :value="item.key"
                  :key="item.key"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="处理者步骤">
              <a-select
                placeholder="请选择处理者步骤"
              >
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="默认处理者">
              <a-select
                placeholder="请选择默认处理者"
              >
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="运行时选择">
              <a-switch />
              <a-checkbox >有默认处理人时直接发送</a-checkbox>
            </a-form-model-item>
            <a-form-model-item label="选择范围"
              :labelCol="{ span: 8 }"
              :wrapperCol="{ span: 15 }"
              class="ant-col ant-col-12"
            >
              <a-select/>
              
            </a-form-model-item>
            <a-form-model-item 
                  class="ant-col ant-col-10"
                >
                  <a-select>
                    
                  </a-select>
            </a-form-model-item>
            <a-form-model-item label="跳过策略">
              <a-checkbox >发送人和接收人是同一人时</a-checkbox>
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
