import { Addon, Edge, Graph, Shape } from "@antv/x6";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Ref } from "vue-property-decorator";
import { IGroupsRelation, IPorts, } from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity";
import { circleNodeBaseConfig, rectNodeBaseConfig, } from "@/domain/entities/flow-design-config/nodeconfig";
import { Guid } from "guid-typescript";
import { INodeEntity } from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { Node } from "@antv/x6/lib/model/node";
import { edgeBaseConfig } from "@/domain/entities/flow-design-config/edgeconfig";
import { NodeTypeEnum } from '@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-node-enum';
import { ICellPortEntity, ILineEntity } from "@/domain/entities/flow-design-entity/flow-design-line-entity/flow-design-line-entity";
import { NodeListArr } from "@/domain/mock/nodemock";
import { LineListArr } from "@/domain/mock/linemock";
import serviceProvider from "@/sharad/destinycoreIoc/serviceProvider";
import { IocTypes } from "@/sharad/destinycoreIoc/iocSymbolTypes";
import { ITestService } from "@/domain/services/ITestServiecs";
import DecoratorProvider from "@/sharad/destinycoreIoc/decoratorProvider";
import { FlowPanelServices } from "@/domain/services/flow-panel-services/FlowPanelServices";
import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import GraphConstruction from "@/sharad/factory/graphFactory";
import IGraphConfig from "@/sharad/factory/Igraph";
// import Testvueioccore from "@/domain/services/Testvueioccore";
// @Module({
//   providers: [
//     Testvueioccore
//   ]
// })
@Component
export default class FlowDesignPanel extends Vue {
  private nodeArray: Array<INodeEntity> = [];
  private lineArray: Array<ILineEntity> = [];
  private graph: any;
  private dnd: any;
  private graphdata: any = {
    nodes: NodeListArr,
    edges: LineListArr
  }
  @DecoratorProvider(IocTypes.TestService)
  private itestService!: ITestService;
  @DecoratorProvider(IocTypes.FlowPanelServices)
  private flowPanelServices!: FlowPanelServices;
  // @Inject()
  // private itestvueioccore!: Testvueioccore;

  @Ref("refMiniMapContainer")
  private minimapContainer!: HTMLDivElement;
  mounted() {
    /**
     * 获取实列第一种
     */
    // const services = serviceProvider.getService<ITestService>(IocTypes.TestService)
    // services.Test();
    console.log(this.itestService)
    const contai = document.getElementById("container");
    const containerHtml = document.getElementById("graph");
    const width: number =
      containerHtml !== null ? containerHtml.clientWidth : 1450;
    const height: number =
      containerHtml !== null ? containerHtml.clientHeight : 750;
    const _this = this;
    // window.addEventListener("resize", () => {
    //   console.log(document.getElementById("graph")!.clientWidth)
    // })
    if (contai != null && typeof width !== null && height != null) {
      const config: IGraphConfig = {
        container: "container",
        miniMapContainer: "destiny-minimap",
        nodes: [],
        edges: []
      }
      /**
       * 初始化画布
       */
      this.graph = GraphConstruction.createGraph(config)
      //#region 

      // new Graph({
      //   container: contai,
      //   grid: {
      //     size: 10, // 网格大小 10px
      //     visible: true, // 绘制网格，默认绘制 dot 类型网格
      //     type: "mesh",
      //     args: {
      //       color: "#ddd", // 网格线/点颜色
      //       thickness: 1, // 网格线宽度/网格点大小
      //     },
      //   },
      //   clickThreshold: 1, //当鼠标移动次数超过指定的数字时，将不触发鼠标点击事件。
      //   width: width,
      //   height: height,
      //   /**
      //    * 拖放功能
      //    */
      //   scroller: {
      //     enabled: true,
      //     pageVisible: true,
      //     pageBreak: false,
      //     pannable: true,
      //   },
      //   /** 
      //    * 是否高亮
      //   */
      //   // highlighting: {
      //   //   // nodeAvailable: {
      //   //   //   name: 'className',
      //   //   //   args: {
      //   //   //     className: 'available',
      //   //   //   },
      //   //   // },
      //   //   magnetAvailable: {
      //   //     name: 'className',
      //   //     args: {
      //   //       className: 'available',
      //   //     },
      //   //   },
      //   //   magnetAdsorbed: {
      //   //     name: 'className',
      //   //     args: {
      //   //       className: 'adsorbed',
      //   //     },
      //   //   },
      //   // },
      //   /**
      //    * 小地图
      //    */
      //   minimap: {
      //     enabled: true,
      //     container: this.minimapContainer,
      //     width: 200,
      //     height: 200,
      //     padding: 10,
      //     minScale: 10,
      //   },
      //   /**
      //    * 多选和单选节点
      //    */
      //   // selecting: {
      //   //   enabled: true,
      //   //   multiple: true,
      //   //   rubberband: true,
      //   //   movable: true,
      //   // selectCellOnMoved: true,
      //   // showNodeSelectionBox: true,
      //   // showEdgeSelectionBox: true
      //   // },
      //   /**
      //    * 鼠标滚轮加ctrl 放大或缩小
      //    */
      //   mousewheel: {
      //     enabled: true,
      //     modifiers: ["ctrl", "meta"],
      //   },
      //   /**
      //    * 
      //    */
      //   connecting: {
      //     // 边的起点或者终点只能是节点或者连接桩。
      //     dangling: false,
      //     snap: {
      //       // 距离节点或者连接桩 5px 时会触发自动吸附
      //       radius: 10
      //     },
      //     // createEdge() {//设置连接时为虚线
      //     //   return _this.graph.createEdge({
      //     //     attrs: {
      //     //       line: {
      //     //         strokeDasharray: '5 5'
      //     //       },
      //     //     },
      //     //   })
      //     // },
      //     // TODO: 检测连接 也可以在connected事件判断
      //     // validateConnection({ edge, sourceCell, targetCell }) {
      //     //   if (edge &&
      //     //     (
      //     //       edge.hasLoop() ||
      //     //       edge.getTargetPortId() === "undefined" ||
      //     //       edge.getTargetPortId() === null ||
      //     //       (
      //     //         sourceCell && (sourceCell.data.nodeType === ENodeType.end) &&
      //     //         targetCell && (targetCell.data.nodeType === ENodeType.start)
      //     //       )
      //     //     )
      //     //   ) {
      //     //     return false;
      //     //   }
      //     //   return true;
      //     // }
      //   },
      // });
      //#endregion
      window.addEventListener("resize", () => {
        const resizecontainerHtml = document.getElementById("graph");
        const resizewidth: number =
          resizecontainerHtml !== null ? resizecontainerHtml.clientWidth : 1450;
        const resizeheight: number =
          resizecontainerHtml !== null ? resizecontainerHtml.clientHeight : 750;
        console.log(resizewidth, resizeheight)
        this.graph.resize(resizewidth, resizeheight);
      })
      this.graph.drawBackground({
        color: "#fff",
      });
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
        // const allEdgesArr = this.graph.getEdges();
        // const sourceNode = addedge.edge.getSourceNode();
        // const targetNode = addedge.edge.getTargetNode();
        /**
         * 判断是否连接到链接桩内或者是自己，如果是自己上述满足一个则删除线
         */
        // if (addedge.edge.hasLoop()) {
        //   this.graph.removeEdge(addedge.edge.id);
        //   this.$message.warning("链接目标不可为自身!", 3)
        //   return;
        // }
        // const isexitsarr = allEdgesArr.filter((_edge: any) => typeof sourceNode.id !== "undefined" && _edge.source.cell == sourceNode.id && (typeof targetNode.id !== "undefined" && _edge.target.cell == targetNode.id) && _edge.id !== addedge.edge.id);
        // if (isexitsarr.length > 0) {
        //   this.graph.removeEdge(addedge.edge.id);
        //   this.$message.warning("不可链接相同节点!", 3)
        //   return;
        // }
        // if ((targetNode && targetNode.data.NodeType === NodeTypeEnum.startNode)) {
        //   this.graph.removeEdge(addedge.edge.id);
        //   this.$message.warning("链接目标不可为开始节点!", 3)
        //   return;
        // }
        // // 避免连线节点形成闭环
        // // 避免两个节点之间连接同样的线
        // const filter = this.graph.getEdges().filter((_edge: Edge) => {
        //   const target = _edge.getTargetNode();
        //   const source = _edge.getSourceNode();
        //   return (_edge.id !== addedge.edge.id) && (sourceNode.id === target?.id && targetNode.id === source?.id
        //     || sourceNode.id === source?.id && targetNode.id === target?.id);
        // })
        // if (filter.length > 0) {
        //   this.graph.removeEdge(addedge.edge.id);
        //   this.$message.warning("两个节点之间不允许循环!", 3)
        //   return
        // }
        // if (typeof addedge.edge.getTargetPortId() === "undefined") {
        //   this.graph.removeEdge(addedge.edge.id);
        //   this.$message.warning("请链接到连接点内!", 3)
        //   return;
        // }
        const result = this.flowPanelServices.checkEdgeConnected(this.graph, addedge);
        switch (result) {
          case CheckGraphEdgeConnectedReturnEnum.normalNoOneself:
            this.$message.warning("链接目标不可为自身!", 3)
            break;
          case CheckGraphEdgeConnectedReturnEnum.cannotLinktheSameNode:
            this.$message.warning("不可链接相同节点!", 3)
            break;
          case CheckGraphEdgeConnectedReturnEnum.noStart:
            this.$message.warning("链接目标不可为开始节点!", 3)
            break;
          case CheckGraphEdgeConnectedReturnEnum.loopNotAllowed:
            this.$message.warning("两个节点不允许循环连接!", 3)
            break;
          case CheckGraphEdgeConnectedReturnEnum.linkToPoint:
            this.$message.warning("请连接到连接点内!", 3)
            break;
        }
      });

      /**
       * 线鼠标抬起事件
       */
      // this.graph.on(
      //   "edge:mouseup",
      //   (addedge: any) => {
      //     /**
      //      * 如果没有目标点删除线
      //      */
      //     if (addedge.edge.getTargetCell() == null) {
      //       this.graph.removeEdge(addedge.edge.id);
      //     }
      //   }
      // );
      /**
       * 单击线事件
       */
      this.graph.on("edge:click", (edgecurren: any) => {
        console.log("单击了线！！！！！！！！", edgecurren);
        this.reset();
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
            _node.setPortProp(_item.id, "attrs/circle", { style: { visibility: "visible" } })
          })
        })
        // const ports = nodecurren.node.getPorts();
        // const htmlports = contai.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
        // this.showPorts(htmlports, true)
        // nodecurren.node.getPorts().forEach((_item: any) => {
        //   if (_item.group === "in") {
        //     // debugger
        //     nodecurren.node.setPortProp(_item.id, "attrs/circle/magnet", false);
        //   }
        // });
      });
      /**
       * 鼠标移动出节点隐藏连接桩
       */
      this.graph.on("node:mouseleave", (_nodecurren: any) => {
        // console.log(_nodecurren)
        // const ports = nodecurren.node.getPorts();
        // const htmlports = contai.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
        // this.showPorts(htmlports, false)
        this.graph.getNodes().forEach((_node: any) => {
          const ports = _node.getPorts();
          ports.forEach((_item: any) => {
            _node.setPortProp(_item.id, "attrs/circle", { style: { visibility: "hidden" } })
          })
        })
        // nodecurren.node.ports.forEach((_item: any) => {
        //   ///设置入点链接桩为false不可以实现点击拖拽生成线
        //   nodecurren.node.setPortProp(_item.id, "attrs/circle/magnet", true);
        // });
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
        if (node.data.NodeType === NodeTypeEnum.endNode || node.data.NodeType === NodeTypeEnum.startNode) {
          const isexitsIndex = this.getNodes().filter((_node: any) => typeof _node.data.NodeType !== "undefined" && _node.data.NodeType === node.data.NodeType);
          if (isexitsIndex.length > 0) {
            _this.$message.warning((typeof node.data.NodeType !== "undefined" && node.data.NodeType === NodeTypeEnum.startNode) ? "流程只允许有一个开始节点!" : "流程只允许有一个结束节点!", 3)
            _this.graph.removeNode(node.id);
            return false
          }
        }
        return true;
      }
      this.dnd = new Addon.Dnd({ target: this.graph, animation: true, validateNode });
    }
  }
  /**
   * 重写添加节点到画布内 (this.dnd = new Addon.Dnd({ target: this.graph, animation: true, getDropNode: this.getDropNode }))
   */
  private getDropNode(node: Node): Node {
    // console.log(node)
    // console.log(this.graph!.getNodes())
    /**
     * 判断开始/结束节点是否存在
     */
    if (node.data.NodeType === NodeTypeEnum.endNode || node.data.NodeType === NodeTypeEnum.startNode) {
      const isexitsIndex = this.graph.getNodes().filter((_node: any) => typeof _node.data.NodeType !== "undefined" && _node.data.NodeType === node.data.NodeType);
      if (isexitsIndex.length > 0) {
        this.$message.warning((node.data.NodeType && node.data.NodeType === NodeTypeEnum.startNode) ? "流程只允许有一个开始节点!" : "流程只允许有一个结束节点!", 3)
        this.graph.removeNode(node.id);
        return node
      }
    }
    return node.clone();
  }
  private validateNodes(graph: Graph, node: Node, _this: any): any {
    // console.log(node)
    // console.log(this.graph!.getNodes())
    /**
     * 判断开始/结束节点是否存在
     */
    if (node.data.NodeType === NodeTypeEnum.endNode || node.data.NodeType === NodeTypeEnum.startNode) {
      const isexitsIndex = graph.getNodes().filter((_node: any) => typeof _node.data.NodeType !== "undefined" && _node.data.NodeType === node.data.NodeType);
      if (isexitsIndex.length > 0) {
        _this.$message.warning((node.data.NodeType === NodeTypeEnum.startNode) ? "流程只允许有一个开始节点!" : "流程只允许有一个结束节点!", 3)
        this.graph.removeNode(node.id);
        return false
      }
    }
    return true;
  }
  /***
   * 鼠标移入和移除节点时候链接桩点显示或不显示
   */
  private showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    // debugger
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
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
            NodeType: NodeTypeEnum.workNode
          }
        })
        : new Shape.Circle({
          id: Guid.create.toString(),
          label: "开始节点",
          ports: {
            items: [{ id: Guid.create().toString(), group: "out" }],
          },
          data: {
            NodeType: NodeTypeEnum.startNode
          }
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
      console.log(node)
      this.nodeArray.push(node)
    });
    this.graph.getEdges().forEach((_edge: any) => {
      const source: ICellPortEntity = {
        cell: _edge.source.cell,
        port: _edge.source.port,
      }
      const target: ICellPortEntity = {
        cell: _edge.target.cell,
        port: _edge.target.port,
      }
      const linemodel: ILineEntity = {
        id: _edge.id,
        data: _edge.data,
        source: source,
        target: target
      }
      this.lineArray.push(linemodel);
    });
    console.log(JSON.stringify(this.lineArray))
    console.log(JSON.stringify(this.nodeArray))
    // console.log(this.nodeArray);
  }
}
