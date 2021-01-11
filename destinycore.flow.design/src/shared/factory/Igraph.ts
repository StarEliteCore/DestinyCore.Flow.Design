import { LineEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-line-entity/flow-design-line-entity";
import { NodeEntity } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-entity";

export default interface IGraphConfig{
    container:string;
    miniMapContainer?:string;
    nodes:Array<NodeEntity>;
    edges:Array<LineEntity>
}