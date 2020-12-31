import iocContainer from "./destinyIocContainerBind";
/**
 * 服务供应商
 */
class ServiceProvider {
    getService<T>(_symbol: any): T {
        return iocContainer.get<T>(_symbol);
    }
}
/**
 * 实例化服务供应商
 */
const serviceProvider = new ServiceProvider();
/**
 * 导出服务供应商
 */
export default serviceProvider;