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
    fill: string = "#FFF";
    lineWidth: number = 2;
    shadowColor!: string;
    shadowBlur!: string;
    shadowOffsetX!: number;
    shadowOffsetY!: number;
    stroke: string = "#00B5FF";
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
 * 节点通用属性
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
    size: Object;
    /**
     * 指定边连如节点的连接点的位置（相对于该节点而言），
     * 可以为空。例如: [0, 0]，代表节点左上角的锚点，[1, 1],代表节点右下角的锚点。
     */
    anchorPoints: [];
    /**
     * 文本配置项
     */
    labelCfg: INodeLabelCfg;
    /**
     * 节点配置其他条件等等
     */
    proPerties: Object;
}

/**
 * 通用节点属性
 */
export class NodeDto implements INodeDto {
    style: INodeStyle = new NodeStyle();
    x: number = 90;
    y: number = 40;
    size: Object = [100, 50];
    anchorPoints: [] = [];
    labelCfg!: INodeLabelCfg;
    type: string = "modelRect";
    label: string = "任务节点";
    id: string = Guid.EMPTY;
    linkPoints: Object = {
        top: false,
        right: true,
        bottom: false,
        left: false,
        size: 12,
        fill: "#00B5FF",
        stroke: "#00B5FF"
    };
    /**
     * 节点配置其他条件等等
     */
    proPerties: Object = {};
}

/**
 * ModelRect节点样式属性
 */
export class ModelRectNodeDto extends NodeDto {
    preRect: Object = {};
    /**
     * 节点中 icon 配置
     */
    logoIcon: Object = {
        // 是否显示 icon，值为 false 则不渲染 icon
        show: false,
        x: 0,
        y: 0,
        // icon 的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
        width: 16,
        height: 16,
        // 用于调整图标的左右位置
        offset: 0
    };
    /**
     * 节点中表示状态的 icon 配置
     */
    stateIcon: Object = {
        // 是否显示 icon，值为 false 则不渲染 icon
        show: false,
        x: 0,
        y: 0,
        // icon 的地址，字符串类型
        img: 'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
        width: 16,
        height: 16,
        // 用于调整图标的左右位置
        offset: -5
    };
    /**
     * 节点主要文本下方的描述文本
     */
    description: string = "";
    /**
     * 描述文本的配置项(modelRect 节点特有)
     */
    descriptionCfg: Object = {};
}