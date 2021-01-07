import { ApprovalStrategy, INodeDataEntity, NodeBasicConfiguration } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { Component, Mixins } from "vue-property-decorator";

import FlowOperateMixins from "@/shared/mixins/flow.operate.mixins";
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";

@Component({
    name: "FlowNodeLineOperate",
})
export default class FlowNodeLineOperate extends Mixins(FlowOperateMixins) {
    ///
    private nodeData: INodeDataEntity = {
        nodeType: NodeTypeEnum.workNode,
        basicConfiguration: new NodeBasicConfiguration(),
        NodeButton: "",
        approvalStrategy:new ApprovalStrategy(),
    };
    Show(_nodeData: INodeDataEntity) {
        this.nodeData = _nodeData;
        this.IsShow = true;
    }
    handleOk(e: any) {
        console.log(e);
        this.IsShow = false;
        console.log(this.nodeData)
        // this.visible = false;
    }
    callback(key: string) {
        // this.IsShow = false;
    }
}