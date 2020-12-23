import { Graph, Shape } from "@antv/x6";
import {
  circleNodeBaseConfig,
  rectNodeBaseConfig,
} from "@/domain/entities/flow-manager-entity/flow-design-config/nodeconfig";

import IGraphConfig from "./Igraph";
import { edgeBaseConfig } from "@/domain/entities/flow-manager-entity/flow-design-config/edgeconfig";

export default class GraphConstruction {
  static createGraph(_graph: IGraphConfig): Graph {
    const container = this.getcontainerHtml(_graph.container);
    const containerHtml = document.getElementById("graph");
    const width: number =
      containerHtml !== null ? containerHtml.clientWidth : 1450;
    const height: number =
      containerHtml !== null ? containerHtml.clientHeight : 750;

    const minimap =
      _graph.miniMapContainer !== "undefined"
        ? this.getcontainerHtml(_graph.miniMapContainer!)
        : undefined;
    this.InitGraphStyle();
    const graph = new Graph({
      container: container!,
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
        enabled: minimap !== null ? true : false,
        container: minimap!,
        width: 200,
        height: 200,
        padding: 10,
        minScale: 10,
      },
      /**
       * 多选和单选节点
       */
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
      /**
       *
       */
      connecting: {
        // 边的起点或者终点只能是节点或者连接桩。
        dangling: false,
        snap: {
          // 距离节点或者连接桩 5px 时会触发自动吸附
          radius: 10,
        },
        // createEdge() {//设置连接时为虚线
        //   return _this.graph.createEdge({
        //     attrs: {
        //       line: {
        //         strokeDasharray: '5 5'
        //       },
        //     },
        //   })
        // },
        // TODO: 检测连接 也可以在connected事件判断
        // validateConnection({ edge, sourceCell, targetCell }) {
        //   if (edge &&
        //     (
        //       edge.hasLoop() ||
        //       edge.getTargetPortId() === "undefined" ||
        //       edge.getTargetPortId() === null ||
        //       (
        //         sourceCell && (sourceCell.data.nodeType === ENodeType.end) &&
        //         targetCell && (targetCell.data.nodeType === ENodeType.start)
        //       )
        //     )
        //   ) {
        //     return false;
        //   }
        //   return true;
        // }
      },
    });
    graph.drawBackground({
      color: "#fff",
    });
    window.addEventListener("resize", () => {
      const resizecontainerHtml = document.getElementById("graph");
      const resizewidth: number =
        resizecontainerHtml !== null ? resizecontainerHtml.clientWidth : 1450;
      const resizeheight: number =
        resizecontainerHtml !== null ? resizecontainerHtml.clientHeight : 750;
      // console.log(resizewidth, resizeheight);
      graph.resize(resizewidth, resizeheight);
    });
    return graph;
  }
  private static getcontainerHtml(_containerid: string): HTMLElement | null {
    return document.getElementById(_containerid);
  }
  private static InitGraphStyle() {
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
  }
}
