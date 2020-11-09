import {
  INodeLineCommonStyle,
  INodeLineLabelCfgCommonStyle,
  INodeLineLabelCommonCfg,
} from "@/domain/common-entity/nodeline-style-cfg-common-entity";

import { IEntity } from '@/sharad/baseentity/IEntity';
import { INodeLineCommonPropertyDto } from '@/domain/common-entity/nodeline-common-property-entity';

/**
 * 边的LabelCfg属性接口定义
 */
export interface ILineLabelCfg extends INodeLineLabelCommonCfg {
  /**
   * 标签在 x 方向的偏移量
   */
  refX: number;
  /**
   * 标签在 y 方向的偏移量
   */
  refY: number;
  /**
   * 标签的样式属性
   */
  style:INodeLineLabelCfgCommonStyle;
}

/**
 * 边的样式属性
 */
export interface ILineStyle extends INodeLineCommonStyle {
  /**
   * 边响应鼠标事件时的检测宽度，当 lineWidth 太小而不易选中时，可以通过该参数提升击中范围
   */
  lineAppendWidth: number;
  /**
   * 边的结束端是否有箭头
   */
  endArrow: boolean;
  /**
   * 边透明度
   */
  strokeOpacity: number;
}

/**
 * 线的Dto
 */

export interface ILineDto extends INodeLineCommonPropertyDto{
  /**
   * 标签文本 label 及其配置 labelCfg
   */
  labelCfg: ILineLabelCfg;
  /**
   * 样式属性 style
   */
  style: ILineStyle,
  /**
   * 起始点 id
   */
  source:string,
  /**
   * 结束点 id
   */
  target:string,
  /**
   * 边的起始节点上的锚点的索引值
   */
  sourceAnchor:number,
  /**
   * 边的终止节点上的锚点的索引值
   */
  targetAnchor:number,
}