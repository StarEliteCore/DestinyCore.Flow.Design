import { Addon, Edge, EdgeView, Graph, Shape } from "@antv/x6";
import { Component, Ref, Vue } from "vue-property-decorator";
import {
  IGroupsRelation,
  IPorts,
} from "@/domain/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity";
import {
  circleNodeBaseConfig,
  rectNodeBaseConfig,
} from "@/domain/flow-design-config/nodeconfig";

import { Guid } from "guid-typescript";
import { INodeEntity } from "@/domain/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { Node } from "@antv/x6/lib/model";
import { edgeBaseConfig } from "@/domain/flow-design-config/edgeconfig";
import { NodeTypeEnum } from '@/domain/flow-design-entity/flow-design-node-entity/flow-design-node-enum';

@Component({
  name: "FlowDesignPanel",
})
export default class FlowDesignPanel extends Vue {
  private nodeArray: Array<INodeEntity> = [];
  private graph?: Graph;
  private dnd?: Addon.Dnd;
  private isgra: boolean = false;
  @Ref("refMiniMapContainer")
  private minimapContainer!: HTMLDivElement;
  mounted() {
    // let a= create(TestA)

    /**
     * 设置Edge默认样式及通用属性
     */
    Shape.Edge.config(edgeBaseConfig);
    /**
     * 设置Rect默认样式及通用属性
     */
    Shape.Rect.config(rectNodeBaseConfig);
    /**
     * 设置Circle默认样式及通用属性
     */
    Shape.Circle.config(circleNodeBaseConfig);
    const contai = document.getElementById("container");
    const containerHtml = document.getElementById("container");
    const width: number =
      containerHtml !== null ? containerHtml.clientWidth : 1450;
    const height: number =
      containerHtml !== null ? containerHtml.clientHeight : 750;
    console.log("子组件");
    if (contai != null && typeof width !== null && height != null) {
      this.graph = new Graph({
        container: contai,
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
          type: "mesh",
          args: {
            color: "#ddd", // 网格线/点颜色
            thickness: 1, // 网格线宽度/网格点大小
          },
        },
        clickThreshold: 1, //当鼠标移动次数超过指定的数字时，将不触发鼠标点击事件。
        width: width,
        height: height,
        /**
         * 拖放功能
         */
        scroller: {
          enabled: true,
          pageVisible: true,
          pageBreak: false,
          pannable: true,
        },
        /** 
         * 是否高亮
        */
        // highlighting: {
        //   // nodeAvailable: {
        //   //   name: 'className',
        //   //   args: {
        //   //     className: 'available',
        //   //   },
        //   // },
        //   magnetAvailable: {
        //     name: 'className',
        //     args: {
        //       className: 'available',
        //     },
        //   },
        //   magnetAdsorbed: {
        //     name: 'className',
        //     args: {
        //       className: 'adsorbed',
        //     },
        //   },
        // },
        /**
         * 小地图
         */
        minimap: {
          enabled: true,
          container: this.minimapContainer,
          width: 200,
          height: 200,
          padding: 10,
          minScale: 10,
        },
        // selecting: {
        //   enabled: true,
        //   multiple: true,
        //   rubberband: true,
        //   movable: true,
        // selectCellOnMoved: true,
        // showNodeSelectionBox: true,
        // showEdgeSelectionBox: true
        // },
        /**
         * 鼠标滚轮加ctrl 放大或缩小
         */
        mousewheel: {
          enabled: true,
          modifiers: ["ctrl", "meta"],
        },
      });
      this.graph.drawBackground({
        color: "#f0edc1",
      });
      this.graph.resize();
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
        /**
         * 判断是否连接到链接桩内或者是自己，如果是自己上述满足一个则删除线
         */
        if (addedge.edge.hasLoop()) {
          this.graph!.removeEdge(addedge.edge.id);
          this.$message.warning("链接目标不可为自身!", 3)
          return;
        }
        const sourceNode = addedge.edge.getSourceNode();
        const targetNode = addedge.edge.getTargetNode();
        if ((targetNode && targetNode.data.NodeType === NodeTypeEnum.startNode)) {
          this.graph!.removeEdge(addedge.edge.id);
          this.$message.warning("链接目标不可为开始节点!", 3)
          return;
        }
        if (typeof addedge.edge.getTargetPortId() === "undefined") {
          this.graph!.removeEdge(addedge.edge.id);
          this.$message.warning("请链接到连接点内!", 3)
          return;
        }
      });

      /**
       * 线鼠标抬起事件
       */
      this.graph.on(
        "edge:mouseup",
        (addedge: any, view: EdgeView, edge: Edge) => {
          /**
           * 如果没有目标点删除线
           */
          if (addedge.edge.getTargetCell() == null) {
            this.graph!.removeEdge(addedge.edge.id);
          }
        }
      );
      /**
       * 节点鼠标按下事件
       */
      // this.graph.on("node:mousedown", (addedge: any, view: EdgeView, edge: Edge) => {
      //   debugger
      //   const ports = contai.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
      //   debugger
      //   this.showPorts(ports, true)
      // });
      /**
       * 单击线事件
       */
      this.graph.on("edge:click", (edgecurren: any) => {
        console.log("单击了线！！！！！！！！", edgecurren);
        edgecurren.edge.attr("line/stroke", "#41d0ce");
      });
      /*
       * 鼠标移动到节点显示连接桩
       */
      this.graph.on("node:mouseenter", (nodecurren: any) => {
        this.graph!.getNodes().forEach((_node) => {
          const ports = _node.getPorts();
          ports.forEach(_item => {
            _node.setPortProp(_item.id!, "attrs/circle", { style: { visibility: "visible" } })
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
      this.graph.on("node:mouseleave", (nodecurren: any) => {
        // const ports = nodecurren.node.getPorts();
        // const htmlports = contai.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
        // this.showPorts(htmlports, false)
        this.graph!.getNodes().forEach((_node) => {
          const ports = _node.getPorts();
          ports.forEach(_item => {
            _node.setPortProp(_item.id!, "attrs/circle", { style: { visibility: "hidden" } })
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
      // this.graph.fromJSON(this.graphdata);
      this.dnd = new Addon.Dnd({ target: this.graph, animation: true });
      // this.graph.addNode(this.nodetest)
    }
  }
  /**
   * 重写添加节点到画布内 (this.dnd = new Addon.Dnd({ target: this.graph, animation: true, getDropNode: this.getDropNode }))
   */
  // private getDropNode(node: Node): Node {
  //   // console.log(node)
  //   // console.log(this.graph!.getNodes())
  //   return node.clone();
  // }
  // private showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
  //   // console.log(ports)
  //   for (let i = 0, len = ports.length; i < len; i = i + 1) {
  //     // console.log(ports[i]);
  //     if(ports[i].getAttribute("port-group")==="in")
  //     {
  //       ports[i].style.visibility = show ? 'visible' : 'hidden';

  //       // debugger
  //       ports[i].setAttribute("magnet","true");
  //       ports[i].setAttribute("visibility","visible");
  //       console.log(ports[i])
  //     }
  //   }
  // }
  /***
   * 鼠标移入和移除节点时候链接桩点显示或不显示
   */
  private showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    // debugger
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
      // if (ports[i].getAttribute("port-group") === "in" && show) {
      //   ports[i].setAttribute("magnet", "false")
      // }
      // if (ports[i].getAttribute("port-group") === "in" && !show) {
      //   ports[i].setAttribute("magnet", "true")
      // }
      // console.log(ports[i])
    }
  }
  private reset() {
    // this.graph.drawBackground({ color: "#fff" });
    const nodes = this.graph!.getNodes();
    const edges = this.graph!.getEdges();
    nodes.forEach((node: any) => {
      /***
       * 判断节点类型
       */
      switch (node.shape) {
        case "rect":
          node.attr("body", {
            fill: "#e6f6fd",
            stroke: "#1890ff",
            strokeWidth: 1,
          });
          break;
        case "circle":
          node.attr("body", {
            stroke: "#fb982c",
            strokeWidth: 1,
            fill: "#fef7e7",
          });
          break;
      }
    });
    edges.forEach((edge: any) => {
      edge.attr("line/stroke", "#aab7c4");
      edge.prop("labels/0", {
        attrs: {
          body: {
            stroke: "#9EFEAE",
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
    this.dnd!.start(node, e as any);
  }
  Save() {
    /**
     * 循环清洗节点数据
     */
    this.graph!.getNodes().forEach((_item: any) => {
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
        children: _item.children,
        data: _item.data,
        label: _item.label,
        parent: _item.parent,
        shape: _item.shape,
        visible: _item.visible,
        x: _item.store.data.position.x,
        y: _item.store.data.position.y,
        ports: portmodel,
      };
    });
    console.log(this.nodeArray);
  }
}
