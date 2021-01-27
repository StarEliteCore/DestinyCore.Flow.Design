import { Component, Mixins, Prop } from "vue-property-decorator";
import { Graph, Node } from "@antv/x6";
import {
  ProcessingStrategyArray,
  circulationTypeArray,
  processorTypeArray,
  signatureTypeArray,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-config";

import FlowOperateMixins from "@/shared/mixins/flow.operate.mixins";
import { NodeEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";

@Component({
  name: "FlowNodeLineOperate",
})
export default class FlowNodeLineOperate extends Mixins(FlowOperateMixins) {
  public node: NodeEntity = new NodeEntity();
  private labelCol: Object = { span: 4 };
  private wrapperCol: Object = { span: 14 };
  private signatureTypeArr: Array<any> = signatureTypeArray;
  private ProcessingStrategyArr: Array<any> = ProcessingStrategyArray;
  private circulationTypeArr: Array<any> = circulationTypeArray;
  private processorTypeArr: Array<any> = processorTypeArray;
  @Prop()
  private graph!: Graph;
  Show(_node: NodeEntity) {
    this.node = _node;
    this.IsShow = true;
    // console.log(this.graph);
    // console.log(this.node.data);
  }
  handleOk(e: any) {
    console.log(e);
    // console.log(this.node)
    this.graph.getNodes().filter((_node: Node) => {
      if (_node.id == this.node.id) {
        _node.setAttrs({
          label: {
            text: this.node.label
          }
        });//修改label标签名称
        _node.setData(this.node.data,{overwrite:true})//更新data数据
        // _node.data = this.node.data;
      }
    });
    this.IsShow = false;
  }
  callback(key: string) {
    console.log(key);
    // this.IsShow = false;
  }
}
