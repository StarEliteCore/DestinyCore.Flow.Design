import { injectable } from "inversify";
import "reflect-metadata"
import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import GraphConstruction from "@/sharad/factory/graphFactory";
import IGraphConfig from "@/sharad/factory/Igraph";
import { Addon, Edge, Graph, Node } from "@antv/x6";
import { IGraphServices } from "./IgraphServices";

@injectable()
export class GraphServices implements IGraphServices {
    CreateAddon(_graph: Graph): void {
        const validateNode = (node: Node) => {
            if (
                node.data.NodeType === NodeTypeEnum.endNode ||
                node.data.NodeType === NodeTypeEnum.startNode
            ) {
                debugger
                console.log(this.graph)
                const isexitsIndex = this.graph.getNodes().filter(
                    (_node: any) =>
                        typeof _node.data.NodeType !== "undefined" &&
                        _node.data.NodeType === node.data.NodeType
                );
                if (isexitsIndex.length > 0) {
                    // this.$message.warning(
                    //   typeof node.data.NodeType !== "undefined" &&
                    //     node.data.NodeType === NodeTypeEnum.startNode
                    //     ? "流程只允许有一个开始节点!"
                    //     : "流程只允许有一个结束节点!",
                    //   3
                    // );
                    this.graph.removeNode(node.id);
                    return false;
                }

            }
            return true;
        }
        this.addonDnd = new Addon.Dnd({
            target: this.graph,
            animation: true,
            validateNode,
        });
    }
    addonDnd!: Addon.Dnd;
    graph!: Graph;
    /**
     * 创建Graph
     * @param _graphconfig 
     */
    CreateGraph(_graphconfig: IGraphConfig): Graph {
        this.graph = GraphConstruction.createGraph(_graphconfig);
        /**
         * 单击节点事件
         */
        this.graph.on("node:click", (nodecurren: any) => {
            console.log("节点被单击了！！！！！！！asd a ！", nodecurren);
            this.reset();
            nodecurren.node.attr("body", {
                stroke: "#41d0ce",
                strokeWidth: 2,
                fill: "#89e8de",
            });
        });
        /**
         * 双击节点事件
         */
        this.graph.on("node:dblclick", (nodecurren: any) => {
            console.log("节点被双击了！！！！！！！！", nodecurren);
        });
        /**
         * 线连接到锚点事件
         */
        this.graph.on("edge:connected", (addedge: any) => {
            const result = this.checkEdgeConnected(
                this.graph,
                addedge
            );
            switch (result) {
                case CheckGraphEdgeConnectedReturnEnum.normalNoOneself:
                    // this.$message.warning("链接目标不可为自身!", 3);
                    break;
                case CheckGraphEdgeConnectedReturnEnum.cannotLinktheSameNode:
                    // this.$message.warning("不可链接相同节点!", 3);
                    break;
                case CheckGraphEdgeConnectedReturnEnum.noStart:
                    // this.$message.warning("链接目标不可为开始节点!", 3);
                    break;
                case CheckGraphEdgeConnectedReturnEnum.loopNotAllowed:
                    // this.$message.warning("两个节点不允许循环连接!", 3);
                    break;
                case CheckGraphEdgeConnectedReturnEnum.linkToPoint:
                    // this.$message.warning("请连接到连接点内!", 3);
                    break;
            }
        });
        /**
         * 单击线事件
         */
        this.graph.on("edge:click", (edgecurren: any) => {
            console.log("单击了线！！！！！！！！", edgecurren);
            this.reset();
            edgecurren.edge.zIndex = 1000;
            edgecurren.edge.attr("line/stroke", "#41d0ce");
        });
        /*
         * 鼠标移动到节点显示连接桩
         */
        this.graph.on("node:mouseenter", (_nodecurren: any) => {
            // console.log(_nodecurren)
            this.graph.getNodes().forEach((_node: any) => {
                const ports = _node.getPorts();
                ports.forEach((_item: any) => {
                    _node.setPortProp(_item.id, "attrs/circle", {
                        style: { visibility: "visible" },
                    });
                });
            });
        });
        /**
         * 鼠标移动出节点隐藏连接桩
         */
        this.graph.on("node:mouseleave", (_nodecurren: any) => {
            this.graph.getNodes().forEach((_node: any) => {
                const ports = _node.getPorts();
                ports.forEach((_item: any) => {
                    _node.setPortProp(_item.id, "attrs/circle", {
                        style: { visibility: "hidden" },
                    });
                });
            });
        });
        return this.graph;
    }
    /**
     * 重写拖拽生成节点验证
     * @param node 
     */
    validateNode(node: Node): NodeTypeEnum {
        console.log(this);
        /**
         * 判断开始/结束节点是否存在
         */
        if (
            node.data.NodeType === NodeTypeEnum.endNode ||
            node.data.NodeType === NodeTypeEnum.startNode
        ) {
            const isexitsIndex = this.graph.getNodes().filter(
                (_node: any) =>
                    typeof _node.data.NodeType !== "undefined" &&
                    _node.data.NodeType === node.data.NodeType
            );
            if (isexitsIndex.length > 0) {
                
                this.graph.removeNode(node.id);
                return node.data.NodeType
            }

        }
        return node.data.NodeType
    }
    /***
     * 重置节点或者线的Style样式
     */
    private reset() {
        const nodes = this.graph.getNodes();
        const edges = this.graph.getEdges();
        nodes.forEach((node: any) => {
            /***
             * 判断节点类型
             */
            switch (node.shape) {
                case "rect":
                    node.attr("body", {
                        fill: "rgba(95,149,255,0.05)",
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                    });
                    break;
                case "circle":
                    node.attr("body", {
                        stroke: "#fb982c",
                        strokeWidth: 1,
                        fill: "rgba(251,152,44,0.05)",
                    });
                    break;
            }
        });
        edges.forEach((edge: any) => {
            edge.zIndex = 1;
            edge.attr("line/stroke", "#5f95ff");
            edge.prop("labels/0", {
                attrs: {
                    body: {
                        stroke: "#5f95ff",
                    },
                },
            });
        });
    }
    /**
     * 判断线连接节点条件
     * @param _graph 
     * @param addedge 
     */
    private checkEdgeConnected(_graph: Graph, addedge: any): CheckGraphEdgeConnectedReturnEnum {
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