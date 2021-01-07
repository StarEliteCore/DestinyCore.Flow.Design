import * as NodeTool from "@/domain/entities/flow-manager-entity/flow-design-config/node-button-config";

import { Addon, Graph } from "@antv/x6";
import {
  ICellPortEntity,
  ILineEntity,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-line-entity/flow-design-line-entity";
import {
  IGroupsRelation,
  IPorts,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity";
import {
  INodeDataEntity,
  INodeEntity,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";

import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import Component from "vue-class-component";
import DecoratorProvider from "@/shared/destinycoreIoc/decoratorProvider";
import { IFlowManagerServices } from "@/domain/services/flow-manager-services/IFlowManagerServices";
import { IFlowgraphEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flowgraphEntity";
import IGraphConfig from "@/shared/factory/Igraph";
import { IGraphServices } from "@/domain/services/graph-services/IgraphServices";
import { INodeTool } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/node-button-config-entity";
import { IocTypes } from "@/shared/destinycoreIoc/iocSymbolTypes";
import { Node } from "@antv/x6/lib/model/node";
import NodeOperate from "./flow-node-operate/flow-node-operate.vue";
import NodeOperateInfo from "./flow-node-operate/flow-node-operate"
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import { Ref } from "vue-property-decorator";
import Vue from "vue";
import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
import { validateEdgeMessage } from "@/domain/entities/flow-manager-entity/flow-design-entity/check-flow-return-enum/validateEdgeMessage";

@Component({
  name: "FlowPnel",
  components: {
    NodeOperate,
  },
}
)
export default class FlowDesignPanel extends Vue {
  private nodeArray: Array<INodeEntity> = [];
  private lineArray: Array<ILineEntity> = [];
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
  private flowgraphEntity: IFlowgraphEntity = {
    edges: [],
    nodes: [],
  };

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
      typeof actions !== "undefined" && this.$Message.warning(actions);
    });
    /**
     * 双击节点事件
     */
    this.graph.on("node:dblclick", ({ node }) => {
      console.log(node)
      if ((node.data as INodeDataEntity).nodeType !== NodeTypeEnum.workNode) {
        console.log(node.data.NodeType)
        this.$message.warning(typeof node.data.NodeType !== "undefined" &&
          node.data.NodeType === NodeTypeEnum.startNode ? "开始节点不允许配置属性!" : "结束节点不允许配置属性!",
          3);
        return;
      }
      this.nodeOperateInfo.Show((node.data as INodeDataEntity))
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
      // console.log(node);
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
}
