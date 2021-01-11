import "reflect-metadata"

import DataRequest from "@/shared/data-request";
import { IAjaxResult } from "@/shared/response";
import { IFlowManagerServices } from "./IFlowManagerServices";
import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
import { injectable } from "inversify";
import request from "@/utils/request";

@injectable()
export class FlowManagerServices implements IFlowManagerServices {
    create(_workFlowDto: WorkFlowDto): Promise<IAjaxResult> {
        // console.log(_workFlowDto, "++++++++++++++++++++++++++11111111111111111111111111")
        return  DataRequest.Inst(request).postRequest("api/WorkFlow/CreateAsync",_workFlowDto);
    }
}