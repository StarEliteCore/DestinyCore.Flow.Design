import { IEntity } from "@/sharad/baseentity/IEntity";
import { call } from "@antv/x6/lib/util/function/main";
import { NodeTypeEnum } from './flow-design-node-enum';
import { IPorts } from './flow-design-portsbase-entity';

/**
 * 节点和边的基类
 */
export interface INodeEntity extends IEntity<string> {
  /**
   * 子节点/边。
   */
  children: Array<string>;
  /**
   * 节点/边关联的业务数据。
   */
  data: INodeDataEntity;
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
   * 横向坐标
   */
  x: number;
  /**
   * 纵向坐标
   */
  y: number;
  /**
   * 链接桩数组
   */
  ports: IPorts
}

export interface INodeDataEntity {
  /**
   * 节点类型
   */
  NodeType: NodeTypeEnum;
  /**
   * 节点基础配置
   */
  BasicConfiguration:Object;
  /**
   * 节点审批策略
   */
  ApprovalStrategy:Object;
  /**
   * 节点审批按钮
   */
  NodeButton:string;
  /**
   * 抄送策略
   */
  CCStrategy:Object;
}
/**
 * 
 */
export class ApprovalStrategy {

}
/**
 * 节点抄送对象
 */
export class CCStrategy {

}