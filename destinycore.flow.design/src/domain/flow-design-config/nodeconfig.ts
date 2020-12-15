import { Guid } from 'guid-typescript';
/**
 * Rect节点默认配置
 */
export const rectNodeBaseConfig = {
    attrs: {
        body: {
            fill: "rgba(95,149,255,0.05)",
            stroke: "#5f95ff",
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
                        magnet: true,
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                        fill: "#fff",
                        visibility: "hidden"
                    },
                },
                position: "left",
            },
            out: {
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#5f95ff",
                        strokeWidth: 1,
                        fill: "#fff",
                        visibility: "hidden"
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
            fill: "rgba(251,152,44,0.05)"
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
                        stroke: "#fb982c",
                        strokeWidth: 1,
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