<template>
  <div class="home">
    <div id="panel"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import antvg6 from "@antv/g6";
@Options({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private graph: any;
  private visualcanvasdata = {
    // nodes: [
    // ],
    // edges:[
    // ],
  };
  mounted() {
    console.log(123456);
    this.Init();
  }
  private Init() {
    const width =
      document.getElementById("visualcanvasparent")?.scrollWidth || 1200;
    const height =
      document.getElementById("visualcanvasparent")?.scrollHeight || 500;
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
        default: ["drag-canvas", "drag-node", "zoom-canvas", "click-select"]
      },
      defaultEdge: {
        type: "polyline",
        style: {
          radius: 10,
          offset: 30,
          endArrow: true,
          stroke: "#F6BD16"
        }
      }
    });

    this.graph.data(this.visualcanvasdata);
    this.graph.render();
    console.log(123456);
  }
}
</script>
