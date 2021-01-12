import { Guid } from "guid-typescript";
import { IEntity } from "@/shared/baseentity/IEntity";
import { BelongConditionEnum, BelongConditionTypeEnum, NextHandlerEnum, WorkFlowFilterConnectEnum } from "./flow-design-line-enum";

/**
 * 线保存的实体
 */
export class LineEntity implements IEntity<string> {
  id: string = Guid.EMPTY;
  /**
   * 线内存的业务数据
   */
  data: LineData = new LineData();
  /**
   * 源节点Id对象
   */
  source: CellPortEntity = new CellPortEntity();
  /**
   * 目标节点Id
   */
  target: CellPortEntity = new CellPortEntity();
}

export class CellPortEntity {
  /**
   * 节点Id
   */
  cell: string = Guid.EMPTY;
  /**
   * 链接桩Id
   */
  port: string = Guid.EMPTY;
}
/**
 * 基础条件
 */
export class BasicCondition {
  /**
   * 左括号
   */
  leftBracket: string = "";
  /**
   * 右括号
   */
  rightBracket: string = "";
  /**
   * 下一步条件
   */
  nextHandler: NextHandlerEnum = NextHandlerEnum.sender;
  /**
   * 包含条件枚举
   */
  BelongCondition: BelongConditionEnum = BelongConditionEnum.belongTo;
  /**
   * 条件类型
   */
  BelongConditionType: BelongConditionTypeEnum = BelongConditionTypeEnum.department;
  /**
   * 链接条件类型
   */
  WorkFlowFilterConnect: WorkFlowFilterConnectEnum = WorkFlowFilterConnectEnum.and;
}
/**
 * 线内业务对象
 */
export class LineData {
  /**
   * 
   */
  BasicConditions: Array<BasicCondition> = new Array<BasicCondition>();
}