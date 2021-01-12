import * as NodeTool from "@/domain/entities/flow-manager-entity/flow-design-config/node-button-config";

import { Addon, Edge, Graph } from "@antv/x6";
import {
  CellPortEntity,
  LineData,
  LineEntity,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-line-entity/flow-design-line-entity";
import {
  NodeDataEntity,
  NodeEntity,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";

import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import Component from "vue-class-component";
import DecoratorProvider from "@/shared/destinycoreIoc/decoratorProvider";
import { FlowgraphEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flowgraphEntity";
import { Guid } from "guid-typescript";
import { IFlowManagerServices } from "@/domain/services/flow-manager-services/IFlowManagerServices";
import IGraphConfig from "@/shared/factory/Igraph";
import { IGraphServices } from "@/domain/services/graph-services/IgraphServices";
import { INodeTool } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/node-button-config-entity";
import { IocTypes } from "@/shared/destinycoreIoc/iocSymbolTypes";
import { Node } from "@antv/x6/lib/model/node";
import NodeOperate from "./flow-node-operate/flow-node-operate.vue";
import NodeOperateInfo from "./flow-node-operate/flow-node-operate";
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import { Ports } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity";
import { Ref } from "vue-property-decorator";
import Vue from "vue";
import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
import { validateEdgeMessage } from "@/domain/entities/flow-manager-entity/flow-design-entity/check-flow-return-enum/validateEdgeMessage";

@Component({
  name: "FlowPnel",
  components: {
    NodeOperate,
  },
})
export default class FlowDesignPanel extends Vue {
  private nodeArray: Array<NodeEntity> = [];
  private lineArray: Array<LineEntity> = [];
  private workFlowDto: WorkFlowDto = new WorkFlowDto();
  private graph!: Graph;
  private addonDnd: any;
  private buttonNodeTool = NodeTool.buttonNodeToolList;
  // private history!: Graph.HistoryManager;
  private canRedo: boolean = false;
  private canUndo: boolean = false;
  /**
   * 节点双击弹框
   */
  @Ref("NodeOperateInfo")
  private nodeOperateInfo!: NodeOperateInfo;
  /**
   * 反序列化出的流程设计器对象
   */
  private flowgraphEntity: FlowgraphEntity = new FlowgraphEntity();

  @DecoratorProvider(IocTypes.GraphServices)
  private igraphServices!: IGraphServices;
  @DecoratorProvider(IocTypes.FlowPanelServices)
  private flowmanagerServices!: IFlowManagerServices;
  mounted() {
    const config: IGraphConfig = {
      container: "container",
      miniMapContainer: "destiny-minimap",
      nodes: [],
      edges: [],
    };
    /**
     * 初始化画布
     */
    this.graph = this.igraphServices.CreateGraph(config); // GraphConstruction.createGraph();
    this.graph.history.on("change", () => {
      this.canRedo = this.graph.history.canRedo();
      this.canUndo = this.graph.history.canUndo();
    });
    /**
     * 线连接到锚点事件
     */
    this.graph.on("edge:connected", ({ edge }) => {
      const validate: CheckGraphEdgeConnectedReturnEnum = this.igraphServices.checkEdgeConnected(
        edge
      );
      const actions = validateEdgeMessage.get(validate);
      if (typeof actions !== "undefined") {
        this.$Message.warning(actions);
      }
      console.log(edge)
    });
    /**
     * 双击节点事件
     */
    this.graph.on("node:dblclick", ({ node }) => {
      if ((node.data as NodeDataEntity).nodeType !== NodeTypeEnum.workNode) {
        this.$message.warning(
          typeof node.data.nodeType !== "undefined" &&
            node.data.nodeType === NodeTypeEnum.startNode
            ? "开始节点不允许配置属性!"
            : "结束节点不允许配置属性!",
          3
        );
        return;
      }
      this.nodeOperateInfo.Show(this.getNodeEntity(node));
    });
    /**
     * 双击节点事件
     */
    this.graph.on("edge:dblclick", ({ edge }) => {
      console.log(this.getLineEntity(edge))
      // this.nodeOperateInfo.Show(this.getNodeEntity(node));
    });
    /**
     * 初始化画布节点或者线
     */
    const validateNode = (node: Node) => {
      const result = this.igraphServices.validateNode(node);
      if (!result && node.data.nodeType !== NodeTypeEnum.workNode) {
        this.$message.warning(
          typeof node.data.nodeType !== "undefined" &&
            node.data.nodeType === NodeTypeEnum.startNode
            ? "流程只允许有一个开始节点!"
            : "流程只允许有一个结束节点!",
          3
        );
        return false;
      }
      return true;
    };
    /**
     * 重写检查方法
     * @param this
     * @param node
     */
    this.addonDnd = new Addon.Dnd({
      target: this.graph,
      animation: true,
      validateNode,
    });
  }
  /**
   * 开始拖拽
   * @param e
   */
  startDrag(e: any, item: INodeTool) {
    const node = this.igraphServices.addNode(item);
    this.addonDnd.start(node, e as any);
  }
  /**
   * 保存数据
   */
  Save() {
    /**
     * 循环清洗节点数据
     */
    this.graph.getNodes().forEach((_item: Node) => {
      this.nodeArray.push(this.getNodeEntity(_item));
    });
    this.graph.getEdges().forEach((_edge: any) => {
      this.lineArray.push(this.getLineEntity(_edge));
    });
    this.flowgraphEntity.nodes = this.nodeArray;
    this.flowgraphEntity.edges = this.lineArray;
    this.workFlowDto.flowDesignJson = JSON.stringify(this.flowgraphEntity);
    this.flowmanagerServices.create(this.workFlowDto);
  }
  /***
   *
   */
  onRedo() {
    this.graph.history.redo();
  }
  onUndo() {
    // console.log(this.history.canUndo())
    // this.history.canUndo() && this.history.undo();
    this.graph.history.undo();
  }
  /**
   *
   * @param _node 清洗对象私有方法
   */
  private getNodeEntity(_node: Node): NodeEntity {
    const node: NodeEntity = new NodeEntity();
    /**
     * 创建链接桩对象
     */
    const portmodel: Ports = new Ports();
    portmodel.items = node.ports.items;
    /**
     * 定义一个节点对象
     */
    node.id = _node.id;
    node.children = [];
    node.data = _node.data;

    node.parent = Guid.EMPTY;
    node.shape = _node.shape;
    node.visible = _node.visible;
    (node.x = _node.position().x), (node.y = _node.position().y);
    node.ports = portmodel;

    if (_node.attrs !== null && typeof _node.attrs !== "undefined") {
      node.label =
        typeof _node.attrs.label.text?.toString() !== "undefined"
          ? _node.attrs.label.text?.toString()
          : "";
    }
    return node;
  }
  /**
   *
   * @param _node 清洗对象私有方法
   */
  private getLineEntity(_edge: Edge): LineEntity {
    const edge: LineEntity = new LineEntity();
    const source = _edge.source as CellPortEntity;
    const target = _edge.target as CellPortEntity;
    edge.source = source;
    edge.target = target;
    edge.id = _edge.id.toString()
    edge.data=_edge.data as LineData;
    return edge;
  }
}
