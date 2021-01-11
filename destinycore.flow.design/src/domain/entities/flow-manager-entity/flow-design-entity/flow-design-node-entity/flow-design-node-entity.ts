import {
  ApprovalStrategyDefaultEnum,
  CirculationTypeEnum,
  NodeTypeEnum,
  ProcessingStrategyEnum,
  ProcessorTypeEnum,
  SignaturetypeEnum,
} from "./flow-design-node-enum";

import { Guid } from "guid-typescript";
import { IEntity } from "@/shared/baseentity/IEntity";
import { Ports } from "./flow-design-portsbase-entity";

/**
 * 节点和边的基类
 */
export class NodeEntity implements IEntity<string> {
  id: string = Guid.EMPTY;
  /**
   * 子节点/边。
   */
  children: Array<string> = [];
  /**
   * 节点/边关联的业务数据。
   */
  data: INodeDataEntity = new NodeDataEntity();
  /**
   * 名称
   */
  label: string = "";
  /**
   * 父节点。
   */
  parent: string = "";
  /**
   * 渲染节点/边的图形。
   */
  shape: string = "";
  /**
   * 节点/边是否可见。
   */
  visible: boolean = true;
  /**
   * 横向坐标
   */
  x: number = 10;
  /**
   * 纵向坐标
   */
  y: number = 10;
  /**
   * 链接桩数组
   */
  ports: Ports = new Ports();
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
export class NodeDataEntity implements INodeDataEntity {
  /**
   * 节点类型
   */
  nodeType: NodeTypeEnum = NodeTypeEnum.workNode;
  /**
   * 节点基础配置
   */
  basicConfiguration: NodeBasicConfiguration = new NodeBasicConfiguration();
  /**
   * 节点审批策略
   */
  approvalStrategy: ApprovalStrategy = new ApprovalStrategy();
  /**
   * 节点审批按钮
   */
  NodeButton: string = "";
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
  approvalStrategyDefaultType: ApprovalStrategyDefaultEnum =
    ApprovalStrategyDefaultEnum.none;
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
  /**
   * 节点处理者类型
   */
  processorType: ProcessorTypeEnum = ProcessorTypeEnum.allUser;
}
/**
 * 节点抄送对象
 */
// export class CCStrategy {}
