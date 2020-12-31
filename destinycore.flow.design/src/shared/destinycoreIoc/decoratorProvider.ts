
import { interfaces } from "inversify";
import "reflect-metadata";
import iocContainer from "./destinyIocContainerBind";
export default function DecoratorProvider<T>(params: interfaces.ServiceIdentifier<T>) {
    return function (target: any, attr: any) {
        target[attr] = iocContainer.get<T>(params);
    }
}