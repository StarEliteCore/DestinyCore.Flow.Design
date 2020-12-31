import { IEntity } from "@/shared/baseentity/IEntity";
/**
 * 线保存的实体
 */
export interface ILineEntity extends IEntity<string> {
    /**
     * 线内存的业务数据
     */
    data:Object;
    /**
     * 源节点Id对象
     */
    source:ICellPortEntity;
    /**
     * 目标节点Id
     */
    target:ICellPortEntity;
}

export interface ICellPortEntity{
    /**
     * 节点Id
     */
    cell:string;
    /**
     * 链接桩Id
     */
    port:string;
}