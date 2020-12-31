import { INodeDataEntity, NodeBasicConfiguration } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import FlowOperateMixins from "@/shared/mixins/flow.operate.mixins";
import { Component, Mixins } from "vue-property-decorator";

@Component({
    name: "FlowNodeLineOperate",
})
export default class FlowNodeLineOperate extends Mixins(FlowOperateMixins) {
    ///
    private nodeData: INodeDataEntity = {
        NodeType: NodeTypeEnum.workNode,
        BasicConfiguration: new NodeBasicConfiguration(),
        NodeButton: "",
    };
    Show(_nodeData: INodeDataEntity) {
        this.nodeData = _nodeData;
        this.IsShow = true;
    }
    handleOk(e: any) {
        console.log(e);
        this.IsShow = false;
        // this.visible = false;
    }
    callback(key: string) {
        // this.IsShow = false;
    }
}