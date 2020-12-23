import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";

/**
 * 流程管理
 */
export interface IFlowManagerServices {
    create(_workFlowDto:WorkFlowDto): void;
}