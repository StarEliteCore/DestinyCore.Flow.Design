import "reflect-metadata"
import { IFlowManagerServices } from "./IFlowManagerServices";
import { injectable } from "inversify";
import { WorkFlowDto } from "@/domain/entities/flow-manager-entity/workFlowDto";
@injectable()
export class FlowManagerServices implements IFlowManagerServices {
    create(_workFlowDto: WorkFlowDto): void {

        console.log(_workFlowDto, "++++++++++++++++++++++++++11111111111111111111111111")
    }
}