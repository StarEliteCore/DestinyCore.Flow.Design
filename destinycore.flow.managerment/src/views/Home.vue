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
import {
  NodeDto,
  INodeDto,
  ModelRectNodeDto
} from "@/domain/node-entity/node-entity";
import { IEdge } from "@antv/g6/lib/interface/item";
import { Guid } from "guid-typescript";
import { ILineDto, LineDto } from "@/domain/line-entity/line-entity";
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
  private lineData: Array<ILineDto> = new Array<LineDto>();
  mounted() {
    this.Init();
  }
  private Init() {
    const width = 1200;
    const height = 500;
    const _that = this;
    antvg6.registerBehavior("drag-point-add-edge", {
      getEvents() {
        return {
          click: "onMouseClick", //鼠标点击画布任意位置时
          mousedown: "onMouseDown", //鼠标按下时添加连线事件
          mousemove: "onMouseMove", //鼠标移动到画布时
          mouseup: "onMouseUp", //鼠标松开时修改连线事件
          "node:click": "onNodeClick", //单击节点事件
          "edge:click": "onEdgeClick", //单击线事件
          "node:dblclick": "onNodedbClick", //双击节点事件
          "node:dragend": "nodeDragend" //节点拖动完成事件
        };
      },
      /**
       * 鼠标点击画布任意位置时
       */
      onMouseClick(ev: any) {
        ev.preventDefault();
        if (!ev.item) {
          // console.log(this.graph);
          // console.log(ev.item);
          console.log(1);
        }
      },
      //#region  节点和节点之间添加连线
      /**
       * 鼠标按下时添加连线
       */
      onMouseDown(ev: any) {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const node = ev.item;
        if (node && ev.target.get("className").startsWith("link-point")) {
          const graph = self.graph as Graph;
          const model = node.getModel();
          let _line = new LineDto();
          _line.source = model.id;
          _that.lineData.push(_line);
          console.log(_line);
          if (!self.addingEdge && !self.edge) {
            self.edge = graph.addItem("edge", {
              id: _line.id,
              source: model.id,
              target: model.id
            });
            self.addingEdge = true;
          }
        }
      },
      /**
       * 鼠标松开时修改连线
       */
      onMouseUp(ev: any) {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const node = ev.item;
        const graph = self.graph as Graph;
        // 这里会走两次，第二次destroyed为true
        // 因此增加判断
        if (node && !node.destroyed && node.getType() === "node") {
          const model = node.getModel();

          // console.log(model);
          if (self.addingEdge && self.edge) {
            debugger;
            const edgemodel = (self.edge as IEdge).getModel();
             const degrindex =_that.lineData.findIndex(x=>x.id==edgemodel.id)
             
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
      },
      //#endregion
      /**
       * 鼠标移动到画布时
       */
      onMouseMove(ev: any) {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const point = { x: ev.x, y: ev.y };
        if (self.addingEdge && self.edge) {
          (self.graph as Graph).updateItem(self.edge as IEdge, {
            target: point
          });
        }
      },
      /**
       * 鼠标单击某个节点时
       */
      onNodeClick(ev: any) {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const graph = self.graph as Graph;
        const item = ev.item;
        if (item) {
          // 将当前是click的都设为false
          const clickNodes = graph.findAllByState("node", "click");
          clickNodes.forEach(cn => {
            graph.setItemState(cn, "click", false);
          });
          // 将当前是click的都设为false
          const clickEdgees = graph.findAllByState("edge", "click");
          clickEdgees.forEach(cn => {
            graph.setItemState(cn, "click", false);
          });
          // 将当前node设为click
          // console.log("to click item", item);
          graph.setItemState(item, "click", true);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const model = item.getModel();
          console.log(model);
        }
      },
      /**
       * 鼠标单击某根线时
       */
      onEdgeClick(ev: any) {
        ev.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const graph = self.graph as Graph;
        const item = ev.item;
        // 将当前是click的都设为false
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach(cn => {
          graph.setItemState(cn, "click", false);
        });
        const clickEdgees = graph.findAllByState("edge", "click");
        clickEdgees.forEach(cn => {
          graph.setItemState(cn, "click", false);
        });
        // 将当前node设为click
        graph.setItemState(item, "click", true);
        const model = item.getModel();
        // console.log(model);
      },
      /**
       * 双击Node事件
       */
      onNodedbClick(ev: any) {
        ev.preventDefault();
        console.log(123456789);
        console.log(ev);
        // // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const graph = self.graph as Graph;
        const item = ev.item;
        console.log(item.getModel());
        // // 将当前是click的都设为false
        // const clickNodes = graph.findAllByState("node", "click");
        // clickNodes.forEach(cn => {
        //   graph.setItemState(cn, "click", false);
        // });
        // const clickEdgees = graph.findAllByState("edge", "click");
        // clickEdgees.forEach(cn => {
        //   graph.setItemState(cn, "click", false);
        // });
        // // 将当前node设为click
        // graph.setItemState(item, "click", true);
        // const model = item.getModel();
        // console.log(model);
      },
      nodeDragend(ev: any) {
        const self = this;
        const node = ev.item.getModel();
        console.log("拖动完成了", node);
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
        default: [
          "drag-node",
          "drag-point-add-edge",
          "zoom-canvas",
          "drag-canvas"
        ]
      },
      /**
       * 默认线
       */
      defaultEdge: {
        type: "quadratic",
        style: {
          stroke: "#00B5FF",
          lineWidth: 2,
          endArrow: true
        }
      },
      /**
       * 节点样式修改
       */
      nodeStateStyles: {
        click: {
          fill: "#C6E5FF"
        }
      },
      /**
       * 线的样式修改
       */
      edgeStateStyles: {
        click: {
          fill: "F000",
          lineWidth: 5
        }
      }
    });
    this.graph.data(this.panelData);
    this.graph.render();
  }
  private addNode() {
    const node = new ModelRectNodeDto();
    node.id = Guid.create().toString();
    console.log(node.id);
    this.nodeData.push(node);
    this.graph.addItem("node", node);
  }
}
</script>
