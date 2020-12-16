import { Addon, Graph, Shape } from "@antv/x6";
import {
  ICellPortEntity,
  ILineEntity,
} from "@/domain/entities/flow-design-entity/flow-design-line-entity/flow-design-line-entity";
import {
  IGroupsRelation,
  IPorts,
} from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity";

import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import Component from "vue-class-component";
import DecoratorProvider from "@/sharad/destinycoreIoc/decoratorProvider";
import { FlowPanelServices } from "@/domain/services/flow-panel-services/FlowPanelServices";
import GraphConstruction from "@/sharad/factory/graphFactory";
import { Guid } from "guid-typescript";
import IGraphConfig from "@/sharad/factory/Igraph";
import { INodeEntity } from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { ITestService } from "@/domain/services/ITestServiecs";
import { IocTypes } from "@/sharad/destinycoreIoc/iocSymbolTypes";
import { LineListArr } from "@/domain/mock/linemock";
import { Node } from "@antv/x6/lib/model/node";
import { NodeListArr } from "@/domain/mock/nodemock";
import { NodeTypeEnum } from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import Vue from "vue";

@Component
export default class FlowDesignPanel extends Vue {
  private nodeArray: Array<INodeEntity> = [];
  private lineArray: Array<ILineEntity> = [];
  private graph: any;
  private dnd: any;
  private graphdata: any = {
    nodes: NodeListArr,
    edges: LineListArr,
  };
  @DecoratorProvider(IocTypes.TestService)
  private itestService!: ITestService;
  @DecoratorProvider(IocTypes.FlowPanelServices)
  private flowPanelServices!: FlowPanelServices;
  mounted() {
    /**
     * 获取实列第一种
     */
    // const services = serviceProvider.getService<ITestService>(IocTypes.TestService)
    console.log(this.itestService);
    const _this = this;
    const config: IGraphConfig = {
      container: "container",
      miniMapContainer: "destiny-minimap",
      nodes: [],
      edges: [],
    };
    /**
     * 初始化画布
     */
    this.graph = GraphConstruction.createGraph(config);
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
      const result = this.flowPanelServices.checkEdgeConnected(
        this.graph,
        addedge
      );
      switch (result) {
        case CheckGraphEdgeConnectedReturnEnum.normalNoOneself:
          this.$message.warning("链接目标不可为自身!", 3);
          break;
        case CheckGraphEdgeConnectedReturnEnum.cannotLinktheSameNode:
          this.$message.warning("不可链接相同节点!", 3);
          break;
        case CheckGraphEdgeConnectedReturnEnum.noStart:
          this.$message.warning("链接目标不可为开始节点!", 3);
          break;
        case CheckGraphEdgeConnectedReturnEnum.loopNotAllowed:
          this.$message.warning("两个节点不允许循环连接!", 3);
          break;
        case CheckGraphEdgeConnectedReturnEnum.linkToPoint:
          this.$message.warning("请连接到连接点内!", 3);
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
    /**
     * 初始化画布节点或者线
     */
    this.graph.fromJSON(this.graphdata);
    /**
     * 重写检查方法
     * @param this
     * @param node
     */
    function validateNode(this: Graph, node: Node): any {
      /**
       * 判断开始/结束节点是否存在
       */
      if (
        node.data.NodeType === NodeTypeEnum.endNode ||
        node.data.NodeType === NodeTypeEnum.startNode
      ) {
        const isexitsIndex = this.getNodes().filter(
          (_node: any) =>
            typeof _node.data.NodeType !== "undefined" &&
            _node.data.NodeType === node.data.NodeType
        );
        if (isexitsIndex.length > 0) {
          _this.$message.warning(
            typeof node.data.NodeType !== "undefined" &&
              node.data.NodeType === NodeTypeEnum.startNode
              ? "流程只允许有一个开始节点!"
              : "流程只允许有一个结束节点!",
            3
          );
          _this.graph.removeNode(node.id);
          return false;
        }
      }
      return true;
    }
    this.dnd = new Addon.Dnd({
      target: this.graph,
      animation: true,
      validateNode,
    });
  }
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
  startDrag(e: any) {
    const target = e.currentTarget;
    const type = target.getAttribute("data-type");
    const node =
      type === "rect"
        ? new Shape.Rect({
            id: Guid.create.toString(),
            label: "任务节点",
            ports: {
              items: [
                { id: Guid.create().toString(), group: "in" },
                { id: Guid.create().toString(), group: "out" },
              ],
            },
            data: {
              NodeType: NodeTypeEnum.workNode,
            },
          })
        : new Shape.Circle({
            id: Guid.create.toString(),
            label: "开始节点",
            ports: {
              items: [{ id: Guid.create().toString(), group: "out" }],
            },
            data: {
              NodeType: NodeTypeEnum.startNode,
            },
          });
    this.dnd.start(node, e as any);
  }
  Save() {
    /**
     * 循环清洗节点数据
     */
    this.graph.getNodes().forEach((_item: any) => {
      /**
       * 创建链接桩数组
       */
      const itemarr: Array<IGroupsRelation> = [];
      /**
       * 循环链接桩数组
       */
      _item.ports.items.forEach((element: any) => {
        /**
         * 将画布中节点内的链接桩对象清洗出来
         */
        const item: IGroupsRelation = {
          id: element.id,
          group: element.group,
        };
        itemarr.push(item);
      });
      /**
       * 创建链接桩对象
       */
      const portmodel: IPorts = {
        items: itemarr,
      };
      /**
       * 定义一个节点对象
       */
      const node: INodeEntity = {
        id: _item.id,
        children: [],
        data: _item.data,
        label: _item.label,
        parent: "",
        shape: _item.shape,
        visible: _item.visible,
        x: _item.store.data.position.x,
        y: _item.store.data.position.y,
        ports: portmodel,
      };
      console.log(node);
      this.nodeArray.push(node);
    });
    this.graph.getEdges().forEach((_edge: any) => {
      const source: ICellPortEntity = {
        cell: _edge.source.cell,
        port: _edge.source.port,
      };
      const target: ICellPortEntity = {
        cell: _edge.target.cell,
        port: _edge.target.port,
      };
      const linemodel: ILineEntity = {
        id: _edge.id,
        data: _edge.data,
        source: source,
        target: target,
      };
      this.lineArray.push(linemodel);
    });
    console.log(JSON.stringify(this.lineArray));
    console.log(JSON.stringify(this.nodeArray));
  }
}
