import { Addon, Edge, EdgeView, Graph, Shape } from "@antv/x6";

import { Guid } from "guid-typescript";
import { Vue } from "vue-class-component";

export default class FlowDesignPanel extends Vue {
  constructor()
  {
    super()
  }
  private graph?: Graph;
  private dnd?: Addon.Dnd;
  //#region 

  // private nodedata: Array<IBaseEntity> = [
  //   //测试节点1
  //   {
  //     id: "E7C2500E-4BE9-9699-1C3F-7E02DD5A9FD4",
  //     attrs: {
  //       body: {
  //         fill: "#C1F1C5",
  //         stroke: "#5F95FF",
  //       },
  //       label: {
  //         fontSize: 12,
  //         fill: "black",
  //       },
  //     },
  //     data: { x: "" },
  //     disposed: false,
  //     label: "节点1",
  //     parent: "",
  //     shape: "rect",
  //     visible: true,
  //     zIndex: 1,
  //     x: 40, // Number，必选，节点位置的 x 值
  //     y: 40, // Number，必选，节点位置的 y 值
  //     width: 80, // Number，可选，节点大小的 width 值
  //     height: 40, // Number，可选，节点大小的 height 值
  //     ports: {
  //       groups: {
  //         in: {
  //           attrs: {
  //             circle: {
  //               r: 6,
  //               magnet: false,
  //               stroke: "#31d0c6",
  //               strokeWidth: 2,
  //               fill: "#fff",
  //             },
  //           },
  //           position: "left",
  //         },
  //         out: {
  //           attrs: {
  //             circle: {
  //               r: 6,
  //               magnet: true,
  //               stroke: "#31d0c6",
  //               strokeWidth: 2,
  //               fill: "#fff",
  //             },
  //           },
  //           position: "right",
  //         },
  //       },
  //       items: [
  //         { id: "D1178DB3-98CE-0FA3-BB59-63DC755EF795", group: "in" },
  //         { id: "A082D2FE-8673-71CE-9F77-4F4A69CDF28C", group: "out" },
  //       ],
  //     },
  //   },
  //   //测试节点2
  //   {
  //     id: "47499123-2675-FE77-5D6F-A82B002A3949",
  //     attrs: {
  //       body: {
  //         fill: "#C1F1C5",
  //         stroke: "#5F95FF",
  //       },
  //       label: {
  //         fontSize: 12,
  //         fill: "black",
  //       },
  //     },
  //     data: { x: "" },
  //     disposed: false,
  //     label: "node2",
  //     parent: "",
  //     shape: "rect",
  //     visible: true,
  //     zIndex: 1,
  //     x: 160, // Number，必选，节点位置的 x 值
  //     y: 180, // Number，必选，节点位置的 y 值
  //     width: 80, // Number，可选，节点大小的 width 值
  //     height: 40, // Number，可选，节点大小的 height 值
  //     ports: {
  //       groups: {
  //         in: {
  //           attrs: {
  //             circle: {
  //               r: 6,
  //               magnet: false,
  //               stroke: "#31d0c6",
  //               strokeWidth: 2,
  //               fill: "#fff",
  //             },
  //           },
  //           position: "left",
  //         },
  //         out: {
  //           attrs: {
  //             circle: {
  //               r: 6,
  //               magnet: true,
  //               stroke: "#31d0c6",
  //               strokeWidth: 2,
  //               fill: "#fff",
  //             },
  //           },
  //           position: "right",
  //         },
  //       },
  //       items: [
  //         { id: "950B1597-3B15-D261-62A3-A052AB0634C3", group: "in" },
  //         { id: "A0C7A17E-1312-595A-E9EC-6B671651BE50", group: "out" },
  //       ],
  //     },
  //   },
  //   //测试节点3
  //   {
  //     id: "2A785D80-A8DA-00A7-268C-B93005624738",
  //     attrs: {
  //       body: {
  //         fill: "#E7FEEB",
  //         stroke: "#9EFEAE",
  //       },
  //       label: {
  //         fontSize: 12,
  //         fill: "black",
  //       },
  //     },
  //     data: { x: "" },
  //     disposed: false,
  //     label: "node2",
  //     parent: "",
  //     shape: "rect",
  //     visible: true,
  //     zIndex: 1,
  //     x: 260, // Number，必选，节点位置的 x 值
  //     y: 280, // Number，必选，节点位置的 y 值
  //     width: 80, // Number，可选，节点大小的 width 值
  //     height: 40, // Number，可选，节点大小的 height 值
  //     ports: {
  //       groups: {
  //         in: {
  //           attrs: {
  //             circle: {
  //               r: 6,
  //               magnet: false,
  //               stroke: "#31d0c6",
  //               strokeWidth: 2,
  //               fill: "#fff",
  //             },
  //           },
  //           position: "left",
  //         },
  //         out: {
  //           attrs: {
  //             circle: {
  //               r: 6,
  //               magnet: true,
  //               stroke: "#31d0c6",
  //               strokeWidth: 2,
  //               fill: "#fff",
  //             },
  //           },
  //           position: "right",
  //         },
  //       },
  //       items: [
  //         { id: "6E87D0E9-4F59-76C5-3054-AB34BA0D1DD1", group: "in" },
  //         { id: "CDC5658B-80EB-195E-0072-4500576E4796", group: "out" },
  //       ],
  //     },
  //   },
  // ];
  // private nodedatamodel: IBaseEntity = {
  //   id: "E7C2500E-4BE9-9699-1C3F-7E08DD5A9FD4",
  //   attrs: {
  //     body: {
  //       fill: "#C1F1C5",
  //       stroke: "#5F95FF",
  //     },
  //     label: {
  //       fontSize: 12,
  //       fill: "black",
  //     },
  //   },
  //   data: { x: "" },
  //   disposed: false,
  //   label: "节点1",
  //   parent: "",
  //   shape: "rect",
  //   visible: true,
  //   zIndex: 1,
  //   x: 200, // Number，必选，节点位置的 x 值
  //   y: 200, // Number，必选，节点位置的 y 值
  //   width: 80, // Number，可选，节点大小的 width 值
  //   height: 40, // Number，可选，节点大小的 height 值
  //   ports: {
  //     groups: {
  //       in: {
  //         attrs: {
  //           circle: {
  //             r: 6,
  //             magnet: false,
  //             stroke: "#31d0c6",
  //             strokeWidth: 2,
  //             fill: "#fff",
  //           },
  //         },
  //         position: "left",
  //       },
  //       out: {
  //         attrs: {
  //           circle: {
  //             r: 6,
  //             magnet: true,
  //             stroke: "#31d0c6",
  //             strokeWidth: 2,
  //             fill: "#fff",
  //           },
  //         },
  //         position: "right",
  //       },
  //     },
  //     items: [
  //       { id: "D1178DB3-98CE-0FA3-BB59-63DC755EF895", group: "in" },
  //       { id: "A082D2FE-8673-71CE-9F77-4F4A69CDF28C", group: "out" },
  //     ],
  //   },
  // };

  // private graphdata: any = {
  //   //节点
  //   nodes: this.nodedata,
  //   // // 边
  //   edges: [
  //     {
  //       source: { cell: "E7C2500E-4BE9-9699-1C3F-7E02DD5A9FD4", port: "A082D2FE-8673-71CE-9F77-4F4A69CDF28C" }, // 源节点和链接桩 ID
  //       target: { cell: "47499123-2675-FE77-5D6F-A82B002A3949", prot: "950B1597-3B15-D261-62A3-A052AB0634C3" }, // 目标节点 ID 和链接桩 ID
  //     },
  //   ],
  // };
  //#endregion
  mounted() {
    // let a= create(TestA)

    /**
     * 设置Edge默认样式及通用属性
     */
    Shape.Edge.config(
      // Shape
      {
        router: "manhattan",
      }
    )
    /**
     * 设置Rect默认样式及通用属性
     */
    Shape.Rect.config(
      {
        attrs: {
          body: {
            fill: "#C1F1C5",
            stroke: "#5F95FF",
          },
          label: {
            fontSize: 12,
            fill: "black",
          },
        },
        visible: true,
        zIndex: 1,
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        ports: {
          groups: {
            in: {
              attrs: {
                circle: {
                  r: 6,
                  magnet: false,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
              position: "left",
            },
            out: {
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                },
              },
              position: "right",
            },
          },
          items: [
            { id: Guid.create(), group: "in" },
            { id: Guid.create(), group: "out" },
          ],
        },
      }
    )
    /**
     * 设置Circle默认样式及通用属性
     */
    Shape.Circle.config(
      {
        attrs: {
          label: {
            fontSize: 12,
            fill: 'black',
          },
          body: {
            stroke: '#ffc26d',
            strokeWidth: 1,
            fill: "#fff3ea"
          },
        },
        visible: true,
        zIndex: 1,
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 50, // Number，可选，节点大小的 width 值
        height: 50, // Number，可选，节点大小的 height 值
        parent: "",//
        ports: {
          groups: {
            out: {
              attrs: {
                circle: {
                  r: 3,
                  magnet: true,
                  stroke: "#31d0c6",
                  strokeWidth: 2,
                  fill: "#fff",
                  visibility: "hidden"
                },
              },
              position: "right",
            },
          },
          items: [
            { id: Guid.create().toString(), group: "out" },
          ],
        },
      }
    )
    const contai = document.getElementById("container");
    const containerHtml = document.getElementById("graph-panel");
    const width: number = containerHtml !== null ? containerHtml.clientWidth : 1450;
    const height: number = containerHtml !== null ? containerHtml.clientHeight : 750;
    console.log("子组件")
    console.log(width);
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
        snapline: {
          enabled: true,
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
        nodecurren.node.attr("body/stroke", "orange");
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
        console.log();
        addedge.edge.attrs.line.stroke = "#31d0c6";
        console.log(this.graph);
        console.log(this.graph!.getNodes())
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
        edgecurren.edge.attr("line/stroke", "orange");
        edgecurren.edge.prop("labels/0", {
          attrs: {
            body: {
              stroke: "orange",
            },
          },
        });
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

  //   // console.log(this.graph!.getNodes())
  //   //this.graph!.addNode(this.nodedatamodel);
  //   debugger
  //   return node;
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
      node.attr("body/stroke", "#31d0c6");
    });
    edges.forEach((edge: any) => {
      edge.attr("line/stroke", "#31d0c6");
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
    let rect = new Shape.Rect({
      width: 100,
      height: 40,
      attrs: {
        label: {
          text: 'Rect',
          fill: '#6a6c8a',
        },
        body: {
          fill: "#C1F1C5",
          stroke: '#31d0c6',
          strokeWidth: 2,
        },
      },
    });
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
}
