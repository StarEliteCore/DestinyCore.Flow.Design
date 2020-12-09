import { Graph } from "@antv/x6";
import { IBaseEntity } from "@/domain/flow-design-entity/flow-design-node-entity/flow-design-node-entity";
import { Vue } from "vue-class-component";

export default class FlowDesignPanel extends Vue {
  private graph: any;
  private nodedata: Array<IBaseEntity> = [
    {
      id: "node1",
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
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              }
            },
            position: "left"
          },
          out: {
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: '#31d0c6',
                strokeWidth: 2,
                fill: '#fff',
              },
            },
            position: 'right',
          }
        },
        items: [
          { id: 'port1', group: 'in', },
          { id: 'port2', group: 'out', }
        ]
      }
    },
    {
      id: "node2",
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
      ports: [
        {
          id: "ceshis",
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: "#31d0c6",
              strokeWidth: 2,
              fill: '#fff',
            }
          },
        }
      ]
    },
  ];
  private graphdata: any = {
    // 节点
    nodes: [
      {
        id: "node1",
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
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
              position: 'left',
            },
            out: {
              attrs: {
                circle: {
                  r: 6,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                },
              },
              position: 'right',
            },
          },
          items: [
            {
              id: 'port1',
              group: 'in',
            },
            {
              id: 'port2',
              group: 'out',
            },
          ]
        }
      },
      {
        id: "node2",
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
        ports: [
          {
            id: "ceshis",
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                stroke: "#31d0c6",
                strokeWidth: 2,
                fill: '#fff',
              }
            },
          }
        ]
      },
    ],//this.nodedata,
    // 边
    edges: [
      {
        source: "node1", // String，必须，起始节点 id
        target: "node2", // String，必须，目标节点 id
      },
    ],
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
        clickThreshold: 1,//当鼠标移动次数超过指定的数字时，将不触发鼠标点击事件。
        width: 800,
        height: 600,
      });
      this.graph.drawBackground({
        color: "#C0F4DA",
      });
      this.graph.on("node:click", (nodecurren: any, view: any) => {
        this.reset();
        console.log(111, nodecurren.node)
        nodecurren.node.attr("body/stroke", "orange");
      });
      this.graph.on("node:dblclick", (nodecurren: any, view: any) => {
        console.log("被双击了！！！！！！！！");
        // console.log(nodecurren.node);
      });
      this.graph.on('edge:click', (edgecurren: any) => {
        this.reset()
        edgecurren.edge.attr('line/stroke', 'orange')
        edgecurren.edge.prop('labels/0', {
          attrs: {
            body: {
              stroke: 'orange',
            },
          },
        })
      })

      this.graph.fromJSON(this.graphdata);
      //  this.graph.addNode(this.nodetest)


    }
  }
  private reset() {
    // this.graph.drawBackground({ color: "#fff" });
    const nodes = this.graph.getNodes();
    const edges = this.graph.getEdges();

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
}
