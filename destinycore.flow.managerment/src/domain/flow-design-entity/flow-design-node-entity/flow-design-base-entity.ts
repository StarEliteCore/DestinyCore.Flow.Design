import { IArrtsEntity } from '../flow-design-attrbase-entity';
import { IEntity } from "@/sharad/baseentity/IEntity";
import { IPorts } from '../flow-design-portsbase-entity';

/**
 * 节点和边的基类
 */
export interface IBaseEntity extends IEntity<string> {
  /**
   * 节点/边属性样式。
   */
  attrs: IArrtsEntity;
  //   /**
  //    * 子节点/边。
  //    */
  //   children: Array<string>;
  /**
   * 节点/边关联的业务数据。
   */
  data: any;
  /**
   * 是否可选
   */
  disposed: boolean;
  /**
   * 名称
   */
  label: string;
  /**
   * 父节点。
   */
  parent: string;
  /**
   * 渲染节点/边的图形。
   */
  shape: string;
  /**
   * 节点/边是否可见。
   */
  visible: boolean;
  /**
   * 节点/边在画布中的层级，默认根据节点/边添加顺序自动确定。
   */
  zIndex: number;
  /**
   * 横向坐标
   */
  x: number;
  /**
   * 纵向坐标
   */
  y: number;
  /**
   * 宽度
   */
  width: number;
  /**
   * 高度
   */
  height: number;
  /**
   * 链接桩数组
   */
  ports:IPorts
}
/**
 * markup 指定了渲染节点/边时使用的 SVG/HTML 片段
 */
// export interface IMarkup {
//   /**
//    * SVG/HTML 元素标签名。
//    */
//   tagName: string;
//   /**
//    * 与 tagName 对应的元素命名空间，默认使用 SVG 元素命名空间 "http://www.w3.org/2000/svg"，
//    * 当 tagName 指定的标签是 HTML 元素时，需要使用 HTML 元素的命名空间 "http://www.w3.org/1999/xhtml"。
//    */
//   ns: string;
//   /**
//    * SVG/HTML 元素的唯一标识，通过该唯一标识为该元素指定属性样式。
//    * 例如，为 Shape.Rect 节点指定 <rect> 和 <text> 元素的属性样式。
//    */
//   selector: string;
//   /**
//    * 群组选择器，
//    * 通过群组选择器可以为该群组对应的多个元素指定样式。例如，下面定义中两个 <rect> 具备相同的 groupSelector 值 'group1'。
//    */
//   groupSelector: string;
//   /**
//    * 该 SVG/HTML 元素的默认属性键值对，通常用于定义那些不变的通用属性，这些默认样式也可以在实例化节点时被覆盖。
//    * 需要注意的是，markup 的 attrs 属性只支持原生的 SVG 属性，也就是说 X6 的自定义
//    */
//   attrs: Object;
//   /**
//    * 该 SVG/HTML 元素的行内样式键值对。
//    */
//   style: Object;
//   /**
//    * 该 SVG/HTML 元素的 CSS 样式名。
//    */
//   className: string;
//   /**
//    * 该 SVG/HTML 元素的文本内容。
//    */
//   textContent: string;
//   children: Object;
// }
