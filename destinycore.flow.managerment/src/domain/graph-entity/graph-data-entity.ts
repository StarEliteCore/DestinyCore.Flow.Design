import { INodeDto } from '@/domain/node-entity/node-entity';
import { ILineDto } from '@/domain/line-entity/line-entity';

/**
 * Graph.data数据接口定义
 */
export interface IGraphDataDto {
    /**
     * 节点的数组
     */
    nodes: Array<INodeDto>,
    /**
     * 线的数组
     */
    edges :Array<ILineDto>,
}

/**
 * Graph.data数据接口实现
 */
export class GraphDataDto implements IGraphDataDto {
    /**
     * 节点的数组
     */
    nodes: Array<INodeDto> =[];
    /**
     * 线的数组
     */
    edges: Array<ILineDto> =[];
}
