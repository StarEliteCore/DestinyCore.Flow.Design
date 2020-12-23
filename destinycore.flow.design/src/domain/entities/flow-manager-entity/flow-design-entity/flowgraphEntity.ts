import { ILineEntity } from "./flow-design-line-entity/flow-design-line-entity";
import { INodeEntity } from "./flow-design-node-entity/flow-design-node-entity";

export interface IFlowgraphEntity {
    nodes: Array<INodeEntity>;
    edges: Array<ILineEntity>;
}