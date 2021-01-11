/***
 * 节点类型
 */
export enum NodeTypeEnum {
  /**
   * 开始节点
   */
  startNode = 0,
  /**
   * 运转节点
   */
  workNode = 5,
  /**
   * 结束节点
   */
  endNode = 10,
}


/**
 * 节点形状类型
 */
export enum ENodeShape {
  circle,
  rect,
  polygon
}

/**
 * 节点处理策略
 */
export enum ProcessingStrategyEnum {
  /**
   * 一人同意即可
   */
  oneAgreed = 0,
  /**
   * 所有人同意
   */
  allAgreed = 5,
}
/**
 * 审签类型
 */
export enum SignaturetypeEnum {
  /**
   * 无签批意见栏
   */
  noApprovalComments = 0,
  /**
   * 有签批意见 - 无须签章
   */
  withApprovalCommentsNoNeedToSign = 5,
  /**
   * 有签批意见 - 须签章
   */
  withApprovalCommentsSignatureRequired = 10,
}
/**
 * 流转类型枚举
 */
export enum CirculationTypeEnum{
  /**
   * 单一分支
   */
  singleStep=0,
  /**
   * 根据条件判断无后续步骤提示
   */
  OperateAccordingToConditionsNoStepTips=5,
}
/**
 * 默认处理类型
 */
export enum ApprovalStrategyDefaultEnum{
  /**
   * 无
   */
  none,
  /**
   * 角色组
   */
  roleGroup=5,
  /**
   * 组织架构
   */
  organization=10,
  /**
   * 职位
   */
  position=15,
}






