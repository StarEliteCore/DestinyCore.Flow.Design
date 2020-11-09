// /**
//  * Graph对象初始化实体
//  */
// export interface IGraphInitializeDto {
//     /**
//      * 图的  DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象。
//      */
//     container: string;
//     /**
//      * 指定画布宽度，单位为 'px'。
//      */
//     width: number;
//     /**
//      * 指定画布高度，单位为 'px'。
//      */
//     height: number;
//     /**
//      * 是否开启画布自适应。开启后图自动适配画布大小。
//      */
//     fitView: boolean;
//     /**
//      * fitView 为 true 时生效。图适应画布时，指定四周的留白。
//      * - 可以是一个值, 例如：fitViewPadding: 20
//      * - 也可以是一个数组，例如：fitViewPadding: [ 20, 40, 50, 20 ]
//      * 当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距。
//      */
//     fitViewPadding: Array<number>;
//     /**
//      * v3.5.1 后支持。开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView
//      */
//     fitCenter: boolean;
//     /**
//      * 指定边是否连入节点的中心
//      */
//     linkCenter: boolean;
//     /**
//      * 各种元素是否在一个分组内，决定节点和边的层级问题，默认情况下所有的节点在一个分组中，所有的边在一个分组中，当这个参数为 false 时，节点和边的层级根据生成的顺序确定。当使用 Combo 时，必须将其设置为 false
//      */
//     groupByTypes: boolean;
//     /**
//      * 当图中元素更新，或视口变换时，是否自动重绘。建议在批量操作节点时关闭，以提高性能，完成批量操作后再打开，参见后面的 setAutoPaint() 方法。
//      */
//     autoPaint: boolean;
//     /**
//      * 设置画布的模式。详情可见  交互模式 Mode  文档。
//      */
//     modes: Object;
//     /**
//      * 各个状态下节点的样式，例如 hover、selected，3.1 版本新增。
//      */
//     nodeStateStyles: Object;
//     /**
//      * 各个状态下边的样式，例如 hover、selected，3.1 版本新增。
//      */
//     edgeStateStyles: Object;
//     /**
//      * 各个状态下 Combo 的样式，例如 hover、selected，3.5 版本新增。
//      */
//     comboStateStyles: Object;
//     /**
//      * 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
//      */
//     defaultNode: Object;
//     /**
//      * 	默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
//      */
//     defaultEdge: Object;
//     /**
//      * 默认状态下 Combo 的配置，比如 type, color。会被写入的 data 覆盖。3.5 版本新增。
//      */
//     defaultCombo: Object;
//     /**
//      * 向 graph 注册插件。插件机制请见：
//      */
//     plugins: [];
//     /**
//      * 是否启用全局动画。
//      */
//     animate: boolean;
//     /**
//      * 动画配置项，仅在 animate 为 true 时有效。关于 animateCfg 的更多配置项参见基础动画教程。
//      */
//     animateCfg: Object;
//     /**
//      * 最小缩放比例
//     */
//     minZoom: number;
//     /**
//      * 最大缩放比例
//     */
//     maxZoom: number;
//     /**
//      * 节点分组类型，支持 circle 和 rect
//     */
//     groupType: string;
//     /**
//      * groupStyle 用于指定分组的样式，详情参看 节点分组 Group 教程
//      */
//     groupStyle: Object;
//     /**
//      * 布局配置项，使用 type 字段指定使用的布局方式，type 可取以下值：random, radial, mds, circular, fruchterman, force, dagre，各布局详细的配置请参考  Layout API 文档
//      */
//     layout: Object;
//     /**
//      * 渲染方式，该配置项除 V3.3.x 外其他版本均支持。
//      */
//     renderer: string;
//     /**
//      * 	是否启用 stack，即是否开启 redo & undo 功能，该配置项 V3.6 及以上版本支持。
//      */
//     enabledStack: boolean;
//     /**
//      * redo & undo 最大步数, 只有当 enabledStack 为 true 时才起作用，该配置项 V3.6 及以上版本支持。
//      */
//     maxStep:number;
// }

// export class GraphDto implements IGraphInitializeDto {
//     constructor(
//         _container: string,
//         _width: number,
//         _height: number,
//         )      
//     {
//         this.container=_container;
//         this.width=_width;
//         this.height=_height;
//     }             
//     /**
//      * 图的  DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象。
//      */
//     container: string;
//     /**
//      * 指定画布宽度，单位为 'px'。
//      */
//     width: number;
//     /**
//      * 指定画布高度，单位为 'px'。
//      */
//     height: number;
//     /**
//      * 是否开启画布自适应。开启后图自动适配画布大小。
//      */
//     fitView: boolean=false;
//     /**
//      * fitView 为 true 时生效。图适应画布时，指定四周的留白。
//      * - 可以是一个值, 例如：fitViewPadding: 20
//      * - 也可以是一个数组，例如：fitViewPadding: [ 20, 40, 50, 20 ]
//      * 当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距。
//      */
//     fitViewPadding: Array<number>=[];
//     /**
//      * v3.5.1 后支持。开启后，图将会被平移，图的中心将对齐到画布中心，但不缩放。优先级低于 fitView
//      */
//     fitCenter: boolean=false;
//     /**
//      * 指定边是否连入节点的中心
//      */
//     linkCenter: boolean=false;
//     /**
//      * 各种元素是否在一个分组内，决定节点和边的层级问题，默认情况下所有的节点在一个分组中，所有的边在一个分组中，当这个参数为 false 时，节点和边的层级根据生成的顺序确定。当使用 Combo 时，必须将其设置为 false
//      */
//     groupByTypes: boolean=false;
//     /**
//      * 当图中元素更新，或视口变换时，是否自动重绘。建议在批量操作节点时关闭，以提高性能，完成批量操作后再打开，参见后面的 setAutoPaint() 方法。
//      */
//     autoPaint: boolean=false;
//     /**
//      * 设置画布的模式。详情可见  交互模式 Mode  文档。
//      */
//     modes: Object={};
//     /**
//      * 各个状态下节点的样式，例如 hover、selected，3.1 版本新增。
//      */
//     nodeStateStyles: Object={};
//     /**
//      * 各个状态下边的样式，例如 hover、selected，3.1 版本新增。
//      */
//     edgeStateStyles: Object={};
//     /**
//      * 各个状态下 Combo 的样式，例如 hover、selected，3.5 版本新增。
//      */
//     comboStateStyles: Object={};
//     /**
//      * 默认状态下节点的配置，比如 type, size, color。会被写入的 data 覆盖。
//      */
//     defaultNode: Object={};
//     /**
//      * 	默认状态下边的配置，比如 type, size, color。会被写入的 data 覆盖。
//      */
//     defaultEdge: Object={};
//     /**
//      * 默认状态下 Combo 的配置，比如 type, color。会被写入的 data 覆盖。3.5 版本新增。
//      */
//     defaultCombo: Object={};
//     /**
//      * 向 graph 注册插件。插件机制请见：
//      */
//     plugins: []=[];
//     /**
//      * 是否启用全局动画。
//      */
//     animate: boolean=false;
//     /**
//      * 动画配置项，仅在 animate 为 true 时有效。关于 animateCfg 的更多配置项参见基础动画教程。
//      */
//     animateCfg: Object={};
//     /**
//      * 最小缩放比例
//     */
//     minZoom: number=0.2;
//     /**
//      * 最大缩放比例
//     */
//     maxZoom: number=10;
//     /**
//      * 节点分组类型，支持 circle 和 rect
//     */
//     groupType: string="circle";
//     /**
//      * groupStyle 用于指定分组的样式，详情参看 节点分组 Group 教程
//      */
//     groupStyle: Object={};
//     /**
//      * 布局配置项，使用 type 字段指定使用的布局方式，type 可取以下值：random, radial, mds, circular, fruchterman, force, dagre，各布局详细的配置请参考  Layout API 文档
//      */
//     layout: Object={};
//     /**
//      * 渲染方式，该配置项除 V3.3.x 外其他版本均支持。
//      */
//     renderer: string="canvas";
//     /**
//      * 	是否启用 stack，即是否开启 redo & undo 功能，该配置项 V3.6 及以上版本支持。
//      */
//     enabledStack: boolean=false;
//     /**
//      * redo & undo 最大步数, 只有当 enabledStack 为 true 时才起作用，该配置项 V3.6 及以上版本支持。
//      */
//     maxStep:number=10;
// }