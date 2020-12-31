import { inject, injectable } from "inversify";
import { ITestService } from "./ITestServiecs";
import "reflect-metadata"
import { IocTypes } from "@/shared/destinycoreIoc/iocSymbolTypes";

@injectable()
export default class TestService  {
    Test(): void {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++")
    }
}