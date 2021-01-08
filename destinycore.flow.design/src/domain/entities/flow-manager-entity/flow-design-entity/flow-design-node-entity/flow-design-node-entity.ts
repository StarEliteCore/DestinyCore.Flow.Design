import {
  ApprovalStrategyDefaultEnum,
  CirculationTypeEnum,
  NodeTypeEnum,
  ProcessingStrategyEnum,
  SignaturetypeEnum,
} from "./flow-design-node-enum";
import { IEntity } from "@/shared/baseentity/IEntity";
import { IPorts } from "./flow-design-portsbase-entity";

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
  ports: IPorts;
}

export interface INodeDataEntity {
  /**
   * 节点类型
   */
  nodeType: NodeTypeEnum;
  /**
   * 节点基础配置
   */
  basicConfiguration: NodeBasicConfiguration;
  /**
   * 节点审批策略
   */
  approvalStrategy: ApprovalStrategy;
  /**
   * 节点审批按钮
   */
  NodeButton: string;
  /**
   * 抄送策略
   */
  // CCStrategy: Object;
}
/**
 * 节点基础配置
 */
export class NodeBasicConfiguration {
  /**
   * 节点处理策略
   */
  processingStrategy: ProcessingStrategyEnum = ProcessingStrategyEnum.oneAgreed;
  /**
   * 审签类型
   */
  signatureType: SignaturetypeEnum = SignaturetypeEnum.noApprovalComments;
}
/**
 * 默认处理对象
 */
export class ApprovalStrategyDefault {
  /**
   * 默认处理者类型
   */
  approvalStrategyDefaultType: ApprovalStrategyDefaultEnum =ApprovalStrategyDefaultEnum.none;
  /**
   * 默认处理者Id
   */
  ids: Array<string> = new Array<string>();
}

/**
 *节点审批策略对象
 */
export class ApprovalStrategy {
  /**
   * 流转类型
   */
  circulationType: CirculationTypeEnum = CirculationTypeEnum.singleStep;
  /**
   * 默认处理者对象
   */
  approvalStrategyDefault: ApprovalStrategyDefault = new ApprovalStrategyDefault();
}
/**
 * 节点抄送对象
 */
// export class CCStrategy {}
