import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
import { IAjaxResult } from "@/shared/response";

/**
 * 流程管理
 */
export interface IFlowManagerServices {
    create(_workFlowDto:WorkFlowDto): Promise<IAjaxResult>;
}