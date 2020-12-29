import { CheckGraphEdgeConnectedReturnEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/check-flow-return-enum/checkGraph-return-enum";
import { NodeTypeEnum } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/flow-design-node-enum";
import { INodeTool } from "@/domain/entities/flow-manager-entity/flow-design-entity/flow-design-node-entity/node-button-config-entity";
import IGraphConfig from "@/sharad/factory/Igraph";
import { Addon, Edge, Graph ,Node} from "@antv/x6";
export interface IGraphServices {
    /**
     * 创建画布对象
     * @param _graphconfig 
     */
    CreateGraph(_graphconfig:IGraphConfig): Graph;
    validateNode(node: Node):boolean;
    graph: Graph;
    addonDnd:Addon.Dnd;
    CreateAddon(_graph:Graph):void;
    addNode(_node: INodeTool): Node | undefined;
    checkEdgeConnected( edge: Edge): CheckGraphEdgeConnectedReturnEnum;
}