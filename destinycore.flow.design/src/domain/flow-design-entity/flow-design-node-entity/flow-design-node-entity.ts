import { IEntity } from "@/sharad/baseentity/IEntity";
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
  data: Object;
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
