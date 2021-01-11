import { Component, Mixins } from "vue-property-decorator";
import { ProcessingStrategyArray, circulationTypeArray, processorTypeArray, signatureTypeArray } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-config";

import FlowOperateMixins from "@/shared/mixins/flow.operate.mixins";
import { NodeEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";

@Component({
  name: "FlowNodeLineOperate",
})
export default class FlowNodeLineOperate extends Mixins(FlowOperateMixins) {
  private node: NodeEntity = new NodeEntity();
  private labelCol: Object = { span: 4 };
  private wrapperCol: Object = { span: 14 };
  private signatureTypeArr: Array<any> = signatureTypeArray;
  private ProcessingStrategyArr: Array<any> = ProcessingStrategyArray;
  private circulationTypeArr: Array<any> = circulationTypeArray;
  private processorTypeArr: Array<any> = processorTypeArray;
  Show(_node: NodeEntity) {
    this.node = _node;
    this.IsShow = true;
    console.log(this.node.data)
  }
  handleOk(e: any) {
    console.log(e);
    this.IsShow = false;
  }
  callback(key: string) {
    console.log(key)
    // this.IsShow = false;
  }
}
