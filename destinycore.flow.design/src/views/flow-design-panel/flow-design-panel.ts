import { edgeBaseConfig } from '@/domain/flow-design-config/edgeconfig';
import { circleNodeBaseConfig, rectNodeBaseConfig } from '@/domain/flow-design-config/nodeconfig';
import { INodeEntity } from '@/domain/flow-design-entity/flow-design-node-entity/flow-design-node-entity';
import { Addon, Edge, EdgeView, Graph, Shape } from "@antv/x6";
import { Node } from "@antv/x6/lib/model"
import { Guid } from "guid-typescript";
import { Component, Ref, Vue } from "vue-property-decorator";
import { IPorts } from "@/domain/flow-design-entity/flow-design-node-entity/flow-design-portsbase-entity"
@Component({
  name: "FlowDesignPanel"
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
    const width: number = containerHtml !== null ? containerHtml.clientWidth : 1450;
    const height: number = containerHtml !== null ? containerHtml.clientHeight : 750;
    console.log("子组件")
    if (contai != null && typeof width !== null && height != null) {
      this.graph = new Graph({
        container: contai,
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
          type: 'mesh',
          args: {
            color: '#ddd', // 网格线/点颜色
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
         * 小地图
         */
        minimap: {
          enabled: true,
          container: this.minimapContainer,
          width: 100,
          height: 100,
          padding: 10,
        },
        /**
         * 鼠标滚轮加ctrl 放大或缩小
         */
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
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
        // addedge.edge.attrs.line.stroke = "#31d0c6";
        console.log("鼠标到锚点的事件！！！！！！！！");
      });
      /**
       * 线鼠标抬起事件
       */
      this.graph.on("edge:mouseup", (addedge: any, view: EdgeView, edge: Edge) => {
        const ports = contai.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
        if (addedge.view.targetView === null) {
          this.graph!.removeEdge(addedge.edge.id)
          console.log(this.graph!.getEdges())
        }
        // this.showPorts(ports, false)
      });
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
        this.reset();
        edgecurren.edge.attr("line/stroke", "#41d0ce");
      });
      /*
       * 鼠标移动到节点显示连接桩
       */
      this.graph.on("node:mouseenter", (nodecurren: any) => {
        const ports = nodecurren.node.getPorts();
        ports.forEach((_item: any) => {
          if (_item.group === "in") {
            ///设置入点链接桩为false不可以实现点击拖拽生成线
            nodecurren.node.setPortProp(_item.id!, ['attrs', 'circle'], { magnet: false });
          }
          if (_item.group === "out") {
            nodecurren.node.setPortProp(_item.id!, ['attrs', 'circle'], { style: { visibility: "visible" } })//鼠标移入显示链接桩
          }
        })
      })
      /**
       * 鼠标移动出节点隐藏连接桩
       */
      this.graph.on("node:mouseleave", (nodecurren: any) => {
        const ports = nodecurren.node.getPorts();
        ports.forEach((_item: any) => {
          if (_item.group === "in") {
            ///设置入点链接桩为false不可以实现点击拖拽生成线
            nodecurren.node.setPortProp(_item.id!, ['attrs', 'circle'], { magnet: true });
          }
          if (_item.group === "out") {
            nodecurren.node.setPortProp(_item.id!, ['attrs', 'circle'], { style: { visibility: "hidden" } })//鼠标移除隐藏链接桩
          }
        })
      })
      /**
       * 初始化画布节点或者线
       */
      // this.graph.fromJSON(this.graphdata);
      this.dnd = new Addon.Dnd({ target: this.graph, animation: true })
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

          // stroke: "#31d0c6",
          //           strokeWidth: 2,
          //           fill: "#fff",
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
    const target = e.currentTarget
    const type = target.getAttribute('data-type')
    const node =
      type === 'rect'
        ? new Shape.Rect({
          id: Guid.create.toString(),
          label: "任务节点",
          ports: {
            items: [
              { id: Guid.create().toString(), group: "in" },
              { id: Guid.create().toString(), group: "out" },
            ],
          },
        })
        : new Shape.Circle({
          id: Guid.create.toString(),
          label: "开始节点",
          ports: {
            items: [
              { id: Guid.create().toString(), group: "out" },
            ],
          },
        })
    this.dnd!.start(node, e as any)
  }
  Save() {
    console.log(this.graph!.getNodes());
    this.graph!.getNodes().forEach((_item: any) => {
      const items: IPorts = {
        items: _item.ports.items
      };
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
        ports: items
      }
      console.log(node)
      console.log(this.nodeArray.push(node))
      // console.log(_item)
    })
  }
}
