import {
  INodeLineCommonStyle,
  INodeLineLabelCommonCfg,
} from "@/domain/common-entity/nodeline-style-common-entity";

import { IEntity } from '@/sharad/baseentity/IEntity';

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
}

/**
 * 边的样式属性
 */
export interface ILineStyle<T> extends INodeLineCommonStyle {
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


export interface ILine extends IEntity<string>{
    
}