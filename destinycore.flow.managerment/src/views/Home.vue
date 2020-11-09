<template>
  <div class="home">
    <div>
      <div><button @click="addNode">添加节点</button></div>
    </div>
    <div id="panel" style="border:solid red 1px;"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import antvg6, { Graph } from "@antv/g6";
import {
  IGraphDataDto,
  GraphDataDto
} from "@/domain/graph-entity/graph-data-entity";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NodeDto, INodeDto } from "@/domain/node-entity/node-entity";
import { IEdge } from "@antv/g6/lib/interface/item";
import { Guid } from "guid-typescript";
@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private graph: any;
  private panelData: IGraphDataDto = new GraphDataDto();
  private nodeData: Array<INodeDto> = new Array<NodeDto>();
  mounted() {
    this.Init();
  }
  private Init() {
    const width = 1200;
    const height = 500;
    antvg6.registerBehavior("drag-point-add-edge", {
      getEvents() {
        return {
          click: "onMouseClick",
          mousedown: "onMouseDown",
          mousemove: "onMouseMove",
          mouseup: "onMouseUp",
          "node:click": "onNodeClick",
          "edge:click": "onEdgeClick"
        };
      },
      onMouseDown(ev: any) {
        ev.preventDefault();

        const self = this;
        const node = ev.item;
        if (node && ev.target.get("className").startsWith("link-point")) {
          const graph = self.graph as Graph;
          const model = node.getModel();
          if (!self.addingEdge && !self.edge) {
            self.edge = graph.addItem("edge", {
              source: model.id,
              target: model.id
            });
            self.addingEdge = true;
          }
        }
      },
      onMouseMove(ev: any) {
        ev.preventDefault();
        const self = this;
        const point = { x: ev.x, y: ev.y };
        if (self.addingEdge && self.edge) {
          (self.graph as Graph).updateItem(self.edge as IEdge, {
            target: point
          });
        }
      },
      onMouseUp(ev: any) {
        ev.preventDefault();
        const self = this;
        const node = ev.item;
        const graph = self.graph as Graph;
        // 这里会走两次，第二次destroyed为true
        // 因此增加判断
        if (node && !node.destroyed && node.getType() === "node") {
          const model = node.getModel();
          console.log(model);
          if (self.addingEdge && self.edge) {
            graph.updateItem(self.edge as IEdge, {
              target: model.id
            });
            self.edge = null;
            self.addingEdge = false;
          }
        } else {
          if (self.addingEdge && self.edge) {
            graph.removeItem(self.edge as IEdge);
            self.edge = null;
            self.addingEdge = false;
          }
        }
      }
    });
    /**
     * 定义工具栏
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const toolbar = new antvg6.ToolBar();
    const grid = new antvg6.Grid();
    /**
     * 缩略图
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const minimap = new antvg6.Minimap({
      size: [100, 100]
    });
    this.graph = new antvg6.Graph({
      container: "panel", //绑定的容器div的id
      width: width, //宽
      height: height, //高
      plugins: [minimap, toolbar, grid], //工具栏等一些工具引入
      fitCenter: false, //是否居中显示
      fitView: false, //元素是否自适应画布
      fitViewPadding: 20, //元素自适应画布时的四周留白像素值
      modes: {
        // 支持的 behavior
        default: ["drag-node", "drag-point-add-edge"]
      },
      defaultNode: {
        style: {
          fill: "#FFF"
        },
        linkPoints: {
          top: true,
          right: true,
          bottom: true,
          left: true,
          size: 10,
          fill: "#fff"
        }
      }
    });
    this.graph.data(this.panelData);
    this.graph.render();
  }
  private addNode() {
    const node = new NodeDto();
    node.id = Guid.create().toString();
    this.nodeData.push(node);
    this.graph.addItem("node", node);
    console.log(this.graph);
    console.log(123456);
  }
}
</script>
