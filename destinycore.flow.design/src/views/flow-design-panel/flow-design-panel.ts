import { Addon, Graph, Shape } from "@antv/x6";
import {
  ICellPortEntity,
  ILineEntity,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-line-entity/flow-design-line-entity";
import {
  IGroupsRelation,
  IPorts,
} from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity";
import Component from "vue-class-component";
import DecoratorProvider from "@/sharad/destinycoreIoc/decoratorProvider";
import { Guid } from "guid-typescript";
import IGraphConfig from "@/sharad/factory/Igraph";
import { INodeEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { IocTypes } from "@/sharad/destinycoreIoc/iocSymbolTypes";
import { LineListArr } from "@/domain/mock/linemock";
import { Node } from "@antv/x6/lib/model/node";
import { NodeListArr } from "@/domain/mock/nodemock";
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import Vue from "vue";
import { IGraphServices } from "@/domain/services/graph-services/IgraphServices";
import { IFlowManagerServices } from "@/domain/services/flow-manager-services/IFlowManagerServices";
import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
import { IFlowgraphEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flowgraphEntity";

@Component
export default class FlowDesignPanel extends Vue {
  private nodeArray: Array<INodeEntity> = [];
  private lineArray: Array<ILineEntity> = [];
  private workFlowDto: WorkFlowDto = new WorkFlowDto()
  private graph!: Graph;
  private addonDnd: any;
  // private history!: Graph.HistoryManager;
  private canRedo: boolean = false;
  private canUndo: boolean = false;
  // history(){
  //   return this.graph.history
  // }
  /**
   * 反序列化出的流程设计器对象
   */
  private flowgraphEntity: IFlowgraphEntity = {
    edges: [],
    nodes: []
  };
  @DecoratorProvider(IocTypes.GraphServices)
  private igraphServices!: IGraphServices;
  @DecoratorProvider(IocTypes.FlowPanelServices)
  private flowmanagerServices!: IFlowManagerServices
  // get canRedo() {
  //   return (typeof this.graph!=="undefined" &&  typeof this.graph.history!=="undefined") ? this.graph.history.canRedo() : false;
  // }
  // get canUndo() {
  //   return (typeof this.graph!=="undefined" &&  typeof this.graph.history!=="undefined") ? this.graph.history.canUndo() : false;
  // }
  mounted() {
    this.flowgraphEntity.nodes = NodeListArr;
    this.flowgraphEntity.edges = LineListArr;
    // console.log(this.iflowmanagerServices)
    /**
     * 获取实列第一种
     */
    // const services = serviceProvider.getService<ITestService>(IocTypes.TestService)
    const config: IGraphConfig = {
      container: "container",
      miniMapContainer: "destiny-minimap",
      nodes: [],
      edges: [],
    };
    /**
     * 初始化画布
     */
    this.graph = this.igraphServices.CreateGraph(config);// GraphConstruction.createGraph();
    // this.history = this.graph.history;
    this.graph.history.on("change", () => {
      this.canRedo = this.graph.history.canRedo();
      this.canUndo = this.graph.history.canUndo();
    })
    // console.log(this.graph)
    /**
     * 初始化画布节点或者线
     */
    // this.graph.fromJSON(this.flowgraphEntity);
    const validateNode = (node: Node) => {
      const result = this.igraphServices.validateNode(node);
      if (!result  && node.data.NodeType!== NodeTypeEnum.workNode) {
        this.$message.warning(
          typeof node.data.NodeType !== "undefined" &&
            node.data.NodeType === NodeTypeEnum.startNode
            ? "流程只允许有一个开始节点!"
            : "流程只允许有一个结束节点!",
          3
        );
        return false;
      }
      return true;
    }
    /**
      * 重写检查方法
      * @param this
      * @param node
      */
    this.addonDnd = new Addon.Dnd({
      target: this.graph,
      animation: true,
      validateNode
    });
  }
  /**
   * 开始拖拽
   * @param e 
   */
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
              { id: Guid.create().toString(), group: "left" },
              { id: Guid.create().toString(), group: "top" },
              { id: Guid.create().toString(), group: "right" },
              { id: Guid.create().toString(), group: "bottom" },
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
            items: [
              { id: Guid.create().toString(), group: "left" },
              { id: Guid.create().toString(), group: "top" },
              { id: Guid.create().toString(), group: "right" },
              { id: Guid.create().toString(), group: "bottom" },
            ],
          },
          data: {
            NodeType: NodeTypeEnum.startNode,
          },
        });
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
    this.flowmanagerServices.create(this.workFlowDto)
  }
  onRedo() {
    this.graph.history.redo();
  }
  onUndo() {
    // console.log(this.history.canUndo())
    // this.history.canUndo() && this.history.undo();
    this.graph.history.undo();
  }
}
