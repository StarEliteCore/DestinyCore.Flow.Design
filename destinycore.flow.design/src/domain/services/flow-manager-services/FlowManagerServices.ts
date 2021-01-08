import "reflect-metadata"
import { IFlowManagerServices } from "./IFlowManagerServices";
import { injectable } from "inversify";
import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
import DataRequest from "@/shared/data-request";
import request from "@/utils/request";
import { IAjaxResult } from "@/shared/response";
@injectable()
export class FlowManagerServices implements IFlowManagerServices {
    create(_workFlowDto: WorkFlowDto): Promise<IAjaxResult> {
        console.log(_workFlowDto, "++++++++++++++++++++++++++11111111111111111111111111")
        return  DataRequest.Inst(request).postRequest("api/WorkFlow/CreateAsync",_workFlowDto);
    }
}