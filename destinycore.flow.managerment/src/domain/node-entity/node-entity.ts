import { INodeLineCommonStyle, INodeLineLabelCfgCommonStyle, INodeLineLabelCommonCfg } from "@/domain/common-entity/nodeline-style-cfg-common-entity";
import { Guid } from "guid-typescript";
import { INodeLineCommonPropertyDto } from "@/domain/common-entity/nodeline-common-property-entity";
/**
 * 节点样式属性
 */
export interface INodeStyle extends INodeLineCommonStyle {
    /**
     * 节点填充色
     */
    fill: string;
}
export class NodeStyle implements INodeStyle {
    fill: string = "#9EC9FF";
    lineWidth: number = 2;
    shadowColor!: string;
    shadowBlur!: string;
    shadowOffsetX!: number;
    shadowOffsetY!: number;
    stroke!: string;
}
/**
 * 节点的LabelCfg属性接口定义
 */
export interface INodeLabelCfg extends INodeLineLabelCommonCfg {
    /**
     * 标签的样式属性
     */
    style: INodeLineLabelCfgCommonStyle;
}
/**
 * 节点样式属性
 */
export interface INodeDto extends INodeLineCommonPropertyDto {

    /**
     * 节点的样式属性
     */
    style: INodeStyle;
    /**
     * 节点 x 坐标
     */
    x: number;
    /**
     * 节点 y 坐标
     */
    y: number;
    /**
     * 节点的大小
     */
    size: number;
    /**
     * 指定边连如节点的连接点的位置（相对于该节点而言），
     * 可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点。
     */
    anchorPoints: [];
    /**
     * 文本配置项
     */
    labelCfg: INodeLabelCfg;
}

/**
 * 节点样式属性
 */
export class NodeDto implements INodeDto {
    style: INodeStyle = new NodeStyle();
    x: number = 30;
    y: number = 40;
    size: number = 50;
    anchorPoints: [] = [];
    labelCfg!: INodeLabelCfg;
    type: string = "circle";
    label: string = "任务节点";
    id: string = Guid.EMPTY;
}