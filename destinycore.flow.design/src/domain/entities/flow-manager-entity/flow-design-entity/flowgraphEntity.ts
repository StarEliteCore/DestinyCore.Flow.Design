import { LineEntity } from "./flow-design-line-entity/flow-design-line-entity";
import { NodeEntity } from "./flow-design-node-entity/flow-design-node-entity";
import { call } from "@antv/x6/lib/util/function/main";

export class FlowgraphEntity {
  nodes: Array<NodeEntity> = new Array<NodeEntity>();
  edges: Array<LineEntity> = new Array<LineEntity>();
}
