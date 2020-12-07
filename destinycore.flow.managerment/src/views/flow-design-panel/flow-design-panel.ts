import { Edge, EdgeView, Graph, Shape,Addon } from "@antv/x6";
import { Guid } from "guid-typescript";
import { IBaseEntity } from "@/domain/flow-design-entity/flow-design-node-entity/flow-design-base-entity";
import { Vue } from "vue-class-component";

export default class FlowDesignPanel extends Vue {
  private graph?: Graph;
  private dnd?: Addon.Dnd;
  private nodedata: Array<IBaseEntity> = [
    //测试节点1
    {
      id: "E7C2500E-4BE9-9699-1C3F-7E02DD5A9FD4",
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
      data: { x: "" },
      disposed: false,
      label: "节点1",
      parent: "",
      shape: "rect",
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
          { id: "D1178DB3-98CE-0FA3-BB59-63DC755EF795", group: "in" },
          { id: "A082D2FE-8673-71CE-9F77-4F4A69CDF28C", group: "out" },
        ],
      },
    },
    //测试节点2
    {
      id: "47499123-2675-FE77-5D6F-A82B002A3949",
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
      data: { x: "" },
      disposed: false,
      label: "node2",
      parent: "",
      shape: "rect",
      visible: true,
      zIndex: 1,
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
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
          { id: "950B1597-3B15-D261-62A3-A052AB0634C3", group: "in" },
          { id: "A0C7A17E-1312-595A-E9EC-6B671651BE50", group: "out" },
        ],
      },
    },
    //测试节点3
    {
      id: "2A785D80-A8DA-00A7-268C-B93005624738",
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
      data: { x: "" },
      disposed: false,
      label: "node2",
      parent: "",
      shape: "rect",
      visible: true,
      zIndex: 1,
      x: 260, // Number，必选，节点位置的 x 值
      y: 280, // Number，必选，节点位置的 y 值
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
          { id: "6E87D0E9-4F59-76C5-3054-AB34BA0D1DD1", group: "in" },
          { id: "CDC5658B-80EB-195E-0072-4500576E4796", group: "out" },
        ],
      },
    },
  ];
  private graphdata: any = {
    // 节点
    nodes: this.nodedata,
    // // // 边
    // edges: [
    //   {
    //     source: { cell: "E7C2500E-4BE9-9699-1C3F-7E02DD5A9FD4", port: "A082D2FE-8673-71CE-9F77-4F4A69CDF28C" }, // 源节点和链接桩 ID
    //     target: { cell: "47499123-2675-FE77-5D6F-A82B002A3949", prot: "950B1597-3B15-D261-62A3-A052AB0634C3" }, // 目标节点 ID 和链接桩 ID
    //   },
    // ],
  };

  mounted() {
    // console.log(this.graphdata)
    // debugger
    const contai = document.getElementById("container");
    if (contai != null) {
      this.graph = new Graph({
        container: contai,
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
        },
        clickThreshold: 1, //当鼠标移动次数超过指定的数字时，将不触发鼠标点击事件。
        width: 800,
        height: 600,
      });
      this.graph.drawBackground({
        color: "#C0F4DA",
      });
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
        debugger;
        console.log(addedge);
        console.log(this.graph);
        console.log(this.graph!.getEdges())
        console.log("鼠标到锚点的事件！！！！！！！！");
      });
      /**
       * 线鼠标抬起事件
       */
      this.graph.on("edge:mouseup", (addedge: any,view:EdgeView,edge:Edge) => {
        // debugger
        if(addedge.view.targetView === null){
          this.graph!.removeEdge(addedge.edge.id)
          console.log(this.graph!.getEdges())
        }
      });
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
      /**
       * 初始化画布节点或者线
       */
      this.graph.fromJSON(this.graphdata);

      this.dnd = new Addon.Dnd({ target: this.graph, animation: true })
      //  this.graph.addNode(this.nodetest)
    }
  }
  private reset() {
    // this.graph.drawBackground({ color: "#fff" });
    const nodes = this.graph!.getNodes();
    const edges = this.graph!.getEdges();

    nodes.forEach((node: any) => {
      node.attr("body/stroke", "#5F95FF");
    });

    edges.forEach((edge: any) => {
      edge.attr("line/stroke", "#5F95FF");
      edge.prop("labels/0", {
        attrs: {
          body: {
            stroke: "#5F95FF",
          },
        },
      });
    });
  }
  startDrag(e: any) {
    const target = e.currentTarget
    console.log(1111,target)
		const type = target.getAttribute('data-type')
		console.log(type);
		let rect = new Shape.Rect({
			width: 100,
			height: 40,
			attrs: {
				label: {
					text: 'Rect',
					fill: '#6a6c8a',
				},
				body: {
					stroke: '#31d0c6',
					strokeWidth: 2,
				},
			},
		});
		const node =
			type === 'rect'
				? new Shape.Rect({
					width: 80,
					height: 40,
					attrs: {
						label: {
							text: 'Rect',
							fill: '#6a6c8a',
						},
						body: {
							stroke: '#31d0c6',
							strokeWidth: 2,
						},
					},
				})
				: new Shape.Circle({
					width: 60,
					height: 60,
					attrs: {
						label: {
							text: 'Circle',
							fill: '#6a6c8a',
						},
						body: {
							stroke: '#31d0c6',
							strokeWidth: 2,
						},
					},
				})
    this.dnd!.start(node, e as any)
    console.log(this.graph!.getNodes())
	}
}
