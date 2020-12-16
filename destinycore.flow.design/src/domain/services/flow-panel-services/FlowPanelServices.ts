import { injectable } from "inversify";
import { IFlowPanelServices } from "./IFlowPanelServices";
import "reflect-metadata"
import { Edge, Graph } from "@antv/x6";
import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import { NodeTypeEnum } from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
@injectable()
export class FlowPanelServices implements IFlowPanelServices {
    Test(): void {
        console.log("++++++++++++++++++++++++++11111111111111111111111111")
    }
    checkEdgeConnected(_graph: Graph, addedge: any): CheckGraphEdgeConnectedReturnEnum {
        const allEdgesArr = _graph.getEdges();
        const sourceNode = addedge.edge.getSourceNode();
        const targetNode = addedge.edge.getTargetNode();
        if (addedge.edge.hasLoop()) {
            _graph.removeEdge(addedge.edge.id);
            return CheckGraphEdgeConnectedReturnEnum.normalNoOneself;
        }
        const isexitsarr = allEdgesArr.filter((_edge: any) => typeof sourceNode.id !== "undefined" && _edge.source.cell == sourceNode.id && (typeof targetNode.id !== "undefined" && _edge.target.cell == targetNode.id) && _edge.id !== addedge.edge.id);
        if (isexitsarr.length > 0) {
            _graph.removeEdge(addedge.edge.id);
            return CheckGraphEdgeConnectedReturnEnum.cannotLinktheSameNode
        }
        if ((targetNode && targetNode.data.NodeType === NodeTypeEnum.startNode)) {
            _graph.removeEdge(addedge.edge.id);
            return CheckGraphEdgeConnectedReturnEnum.noStart
        }
        // 避免连线节点形成闭环
        // 避免两个节点之间连接同样的线
        const filter = _graph.getEdges().filter((_edge: Edge) => {
            const target = _edge.getTargetNode();
            const source = _edge.getSourceNode();
            return (_edge.id !== addedge.edge.id) && (sourceNode.id === target?.id && targetNode.id === source?.id
                || sourceNode.id === source?.id && targetNode.id === target?.id);
        })
        if (filter.length > 0) {
            _graph.removeEdge(addedge.edge.id);
            return CheckGraphEdgeConnectedReturnEnum.loopNotAllowed
        }
        if (typeof addedge.edge.getTargetPortId() === "undefined") {
            _graph.removeEdge(addedge.edge.id);
            return CheckGraphEdgeConnectedReturnEnum.linkToPoint
        }
        return CheckGraphEdgeConnectedReturnEnum.None;
    }

}