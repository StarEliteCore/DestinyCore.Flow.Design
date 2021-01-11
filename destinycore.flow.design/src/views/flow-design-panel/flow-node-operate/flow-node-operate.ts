import { Component, Mixins } from "vue-property-decorator";

import FlowOperateMixins from "@/shared/mixins/flow.operate.mixins";
import { NodeEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";

@Component({
  name: "FlowNodeLineOperate",
})
export default class FlowNodeLineOperate extends Mixins(FlowOperateMixins) {
  private node: NodeEntity=new NodeEntity();
  private labelCol: Object = { span: 4 };
  private wrapperCol: Object = { span: 14 };
  Show(_node: NodeEntity) {
    this.node = _node;
    this.IsShow = true;
  }
  handleOk(e: any) {
    console.log(e);
    this.IsShow = false;
  }
  callback(key: string) {
    // this.IsShow = false;
  }
}
