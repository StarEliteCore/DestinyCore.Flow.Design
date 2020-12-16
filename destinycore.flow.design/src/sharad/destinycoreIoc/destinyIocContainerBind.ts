import { FlowPanelServices } from "@/domain/services/flow-panel-services/FlowPanelServices";
import { IFlowPanelServices } from "@/domain/services/flow-panel-services/IFlowPanelServices";
import { ITestService } from "@/domain/services/ITestServiecs";
import TestService from "@/domain/services/TestServiecs";
import { Container } from "inversify";
import { IocTypes } from "./iocSymbolTypes";

const iocContainer = new Container();
iocContainer.bind<ITestService>(IocTypes.TestService).to(TestService);
iocContainer.bind<IFlowPanelServices>(IocTypes.FlowPanelServices).to(FlowPanelServices)
export default iocContainer;