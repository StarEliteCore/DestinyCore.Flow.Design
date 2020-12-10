import { Guid } from 'guid-typescript';
/**
 * Rect节点默认配置
 */
export const rectNodeBaseConfig = {
    attrs: {
        body: {
            fill: "#e6f6fd",
            stroke: "#1890ff",
            strokeWidth: 1,
        },
        label: {
            fontSize: 12,
            fill: "black",
        },
    },
    visible: true,
    zIndex: 1,
    x: 40, // Number，必选，节点位置的 x 值
    y: 40, // Number，必选，节点位置的 y 值
    width: 80, // Number，可选，节点大小的 width 值
    height: 40, // Number，可选，节点大小的 height 值
    ports: {
        groups: {
            in: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: false,
                        stroke: "#31d0c6",
                        strokeWidth: 2,
                        fill: "#fff",
                    },
                },
                position: "left",
            },
            out: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#31d0c6",
                        strokeWidth: 2,
                        fill: "#fff",
                    },
                },
                position: "right",
            },
        },
        items: [
            { id: Guid.create(), group: "in" },
            { id: Guid.create(), group: "out" },
        ],
    },

}
/**
 * Circle节点默认配置
 */
export const circleNodeBaseConfig = {
    attrs: {
        label: {
            fontSize: 12,
            fill: 'black',
        },
        body: {
            stroke: '#fb982c',
            strokeWidth: 1,
            fill: "#fef7e7"
        },
    },
    visible: true,
    zIndex: 1,
    x: 40, // Number，必选，节点位置的 x 值
    y: 40, // Number，必选，节点位置的 y 值
    width: 50, // Number，可选，节点大小的 width 值
    height: 50, // Number，可选，节点大小的 height 值
    parent: "",//
    ports: {
        groups: {
            out: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#31d0c6",
                        strokeWidth: 2,
                        fill: "#fff",
                        visibility: "hidden"
                    },
                },
                position: "right",
            },
        },
        items: [
            { id: Guid.create().toString(), group: "out" },
        ],
    },
}