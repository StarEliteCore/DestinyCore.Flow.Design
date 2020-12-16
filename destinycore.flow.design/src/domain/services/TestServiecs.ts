import { inject, injectable } from "inversify";
import { ITestService } from "./ITestServiecs";
import "reflect-metadata"
import { IocTypes } from "@/sharad/destinycoreIoc/iocSymbolTypes";
import { IFlowPanelServices } from "./flow-panel-services/IFlowPanelServices";
@injectable()
export default class TestService  {
    @inject(IocTypes.FlowPanelServices)
    public _flowPanelServices!: IFlowPanelServices;
    Test(): void {
        this._flowPanelServices.Test()
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++")
    }
}