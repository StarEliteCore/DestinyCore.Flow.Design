<template>
  <div class="home">
    <div>
      <div><button @click="addNode">添加节点</button></div>
    </div>
    <div id="panel" style="border: solid red 1px"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private graph: any;
  private data: any;
  created() {
    this.data = {
      // 节点
      nodes: [
        {
          id: "node1", // String，可选，节点的唯一标识
          x: 40, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "hello", // String，节点标签
        },
        {
          id: "node2", // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },
      ],
      // 边
      edges: [
        {
          source: "node1", // String，必须，起始节点 id
          target: "node2", // String，必须，目标节点 id
        },
      ],
    };
  }
}
</script>
