import { IFill, IStroke, IVisibility } from './flow-design-attrbase-entity';

import { IEntity } from '@/sharad/baseentity/IEntity';

export interface IPorts  {
    /**
     * 连接装群组
     */
    groups: IGroups
    /**
     * 节点Id和分组关系
     */
    items:Array<IGroupsRelation>
}
/**
 * 锚点分组
 */
export interface IGroups {
    /**
     * 连入锚点对象
     */
    in: IArrts;
    /**
     * 练出节点对象
     */
    out:IArrts;
}
/**
 * 锚点属性
 */
export interface IArrts{
    /**
     * 锚点属性
     */
    attrs:IPortsArrts;
    /**
     * 锚点位置
     */
    position:string
}
/**
 * 锚点
 */
export interface IPortsArrts {
    /**
     * 连接桩锚点属性
     */
    circle: IPortsArrtCircle
}
/**
 * 锚点属性定义
 */
export interface IPortsArrtCircle extends IFill, IStroke,IVisibility{
    /**
     * 
     */
    r: number;
    /**
     * 是否开启磁吸
     */
    magnet: boolean;
}
/**
 * 分组关系
 */
export interface  IGroupsRelation{
    /**
     * 锚点Id
     */
    id:string;
    /**
     * 分组名称
     */
    group:string;
}