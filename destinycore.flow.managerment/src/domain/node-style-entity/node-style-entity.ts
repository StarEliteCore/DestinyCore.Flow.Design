import { INodeLineCommonStyle } from "@/domain/common-entity/nodeline-style-common-entity";

/**
 * 节点样式属性
 */
export interface INodeStyle extends INodeLineCommonStyle {
    /**
     * 节点填充色
     */
    fill:string;
}