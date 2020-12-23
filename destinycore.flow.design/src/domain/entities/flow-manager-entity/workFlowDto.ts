import { IEntity } from "@/sharad/baseentity/IEntity";
import { Guid } from "guid-typescript";
/**
 * 流程管理
 */
export class WorkFlowDto implements IEntity<string>
{
    /**
     * 主键Id
     */
    id: string = Guid.EMPTY;
    /**
     * 流程名称
     */
    flowName: string = "";
    /**
     * 流程设计时Json
     */
    flowDesignJson: string = "";
    /**
     * 绑定表单
     */
    flowFormId: string = Guid.EMPTY;
    /**
     * 流程分类
     */
    typeId: string = Guid.EMPTY;
    /**
     * 流程管理人员
     */
    flowManagerId: string = "";
    /**
     * 流程实例管理人员
     */
    flowInstanceManagerId: string = "";
    /**
     * 流程图标
     */
    flowIcon: string = "";
    /**
     * 流程图标颜色
     */
    flowColour: string = "";
}