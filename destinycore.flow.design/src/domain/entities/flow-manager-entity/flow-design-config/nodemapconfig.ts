import { Shape } from "@antv/x6";
import { Guid } from "guid-typescript";
import { NodeTypeEnum } from "../flow-design-entity/flow-design-node-entity/flow-design-node-enum";
/**
 * 任务节点默认配置
 */
const rectAddconfig = new Shape.Rect({
    id: Guid.create.toString(),
    label: "任务节点",
    ports: {
        items: [
            { id: Guid.create().toString(), group: "left" },
            { id: Guid.create().toString(), group: "top" },
            { id: Guid.create().toString(), group: "right" },
            { id: Guid.create().toString(), group: "bottom" },
        ],
    },
    data: {
        nodeType: NodeTypeEnum.workNode,
    },
})
///开始节点默认配置
const circleAddconfig = new Shape.Rect({
    id: Guid.create.toString(),
    label: "开始节点",
    ports: {
        items: [
            { id: Guid.create().toString(), group: "left" },
            { id: Guid.create().toString(), group: "top" },
            { id: Guid.create().toString(), group: "right" },
            { id: Guid.create().toString(), group: "bottom" },
        ],
    },
    data: {
        nodeType: NodeTypeEnum.startNode,
    },
})
/**
 * 节点默认配置
 */
const nodeMap = new Map();
nodeMap.set("rect", rectAddconfig)
nodeMap.set("circle", circleAddconfig)
export default nodeMap;


