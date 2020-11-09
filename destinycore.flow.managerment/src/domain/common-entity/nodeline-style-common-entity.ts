/**
 * 节点和边的公共通用样式属性
 */
export interface INodeLineCommonStyle extends ICommonStroke {
  /**
   * 边宽度
   */
  lineWidth: string;
  /**
   * 阴影颜色
   */
  shadowColor: string;
  /**
   * 阴影范围
   */
  shadowBlur: string;
  /**
   * 阴影 x 方向偏移量
   */
  shadowOffsetX: string;
  /**
   * 阴影 y 方向偏移量
   */
  shadowOffsetY: string;
}
/**
 * 公共属性file
 */
export interface ICommonFill{
  /**
   * 	文本颜色
   */
  fill: string;
}
/**
 * 公共属性file
 */
export interface ICommonStroke{
  /**
   * 	边的颜色
   */
  stroke: string;
}

/**
 * 节点和边的labelCfg公共通用样式属性
 */
export interface INodeLineLabelCfgCommonStyle extends ICommonFill,ICommonStroke {
  /**
   * 文本描边粗细
   */
  lineWidth: string;
  /**
   * 文本透明度
   */
  opacity: string;
  /**
   * 文本内容的当前字体属性
   */
  font: string;
  /**
   * 文本字体大小
   */
  fontSize: string;
}

/**
 * 节点和边的labelCfg公共通用属性
 */
export interface INodeLineLabelCommonCfg {
  /**
   * 	文本相对于边的位置，目前支持的位置有: start，middle, end。默认为middle。
   */
  position: string;
  /**
   * 标签文字是否跟随边旋转，默认 false
   */
  offset: string;
  /**
   * 标签的样式属性
   */
  style: INodeLineLabelCfgCommonStyle;
}