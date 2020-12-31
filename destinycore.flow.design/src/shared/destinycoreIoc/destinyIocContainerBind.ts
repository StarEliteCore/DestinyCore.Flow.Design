import { FlowManagerServices } from "@/domain/services/flow-manager-services/FlowManagerServices";
import { IFlowManagerServices } from "@/domain/services/flow-manager-services/IFlowManagerServices";

import { GraphServices } from "@/domain/services/graph-services/graphServices";
import { IGraphServices } from "@/domain/services/graph-services/IgraphServices";
import { ITestService } from "@/domain/services/ITestServiecs";
import TestService from "@/domain/services/TestServiecs";
import { Container } from "inversify";
import { IocTypes } from "./iocSymbolTypes";

const iocContainer = new Container();
iocContainer.bind<ITestService>(IocTypes.TestService).to(TestService);
iocContainer.bind<IFlowManagerServices>(IocTypes.FlowPanelServices).to(FlowManagerServices)
iocContainer.bind<IGraphServices>(IocTypes.GraphServices).to(GraphServices)
export default iocContainer;