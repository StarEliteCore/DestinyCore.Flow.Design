import { Guid } from "guid-typescript";
import { IEntity } from "@/shared/baseentity/IEntity";

/**
 * 线保存的实体
 */
export class LineEntity implements IEntity<string> {
  id: string = Guid.EMPTY;
  /**
   * 线内存的业务数据
   */
  data: Object = {};
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
