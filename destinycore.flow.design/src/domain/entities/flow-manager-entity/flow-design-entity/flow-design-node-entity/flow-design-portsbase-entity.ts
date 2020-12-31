import { IEntity } from '@/shared/baseentity/IEntity';
export interface IPorts  {
    /**
     * 连接装群组
     */
    //groups: IGroups//暂时弃用
    /**
     * 节点Id和分组关系
     */
    items:Array<IGroupsRelation>
}
/**
 * 分组关系
 */
export interface  IGroupsRelation extends IEntity<string>{
    /**
     * 分组名称
     */
    group:string;
}