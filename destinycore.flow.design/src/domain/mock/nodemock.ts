import { INodeEntity } from "@/domain/entities/flow-design-entity/flow-design-node-entity/flow-design-node-entity"

export const NodeListArr: Array<INodeEntity> =
    [
        {
            id: "69f75ac5-0183-4dd3-b1ef-76c4bcb0626b",
            children: [],
            data: {
                NodeType: 0
            },
            label: "开始节点",
            parent: "",
            shape: "circle",
            visible: true,
            x: 450,
            y: 70,
            ports: {
                items: [
                    {
                        id: "970fe791-2c75-02e9-8268-9cca00acf40f",
                        group: "out"
                    }
                ]
            }
        },
        {
            id: "b4942177-d83a-4b57-a2a8-92b9025d01eb",
            children: [],
            data: {
                NodeType: 5
            },
            label: "任务节点",
            parent: "",
            shape: "rect",
            visible: true,
            x: 560,
            y: 390,
            ports: {
                items: [
                    {
                        id: "ccf5adcf-b371-4cd7-5449-b9a73be7aea2",
                        group: "in"
                    },
                    {
                        id: "0dd207a7-c823-86e5-07c6-8c1c030a7e66",
                        group: "out"
                    }
                ]
            }
        },
        {
            id: "d95f50c9-ef03-40ce-9393-9b351f1aed21",
            children: [],
            data: {
                NodeType: 5
            },
            label: "任务节点",
            parent: "",
            shape: "rect",
            visible: true,
            x: 720,
            y: 350,
            ports: {
                items: [
                    {
                        id: "7a16791d-fbb8-ae50-59e4-a14d3d4cfdcf",
                        group: "in"
                    },
                    {
                        id: "f3db2162-ba58-efc4-f5a6-cb555ab8198d",
                        group: "out"
                    }
                ]
            }
        },
        {
            id: "7514c09b-f3db-41ba-8f17-68a037eb252a",
            children: [],
            data: {
                NodeType: 5
            },
            label: "任务节点",
            parent: "",
            shape: "rect",
            visible: true,
            x: 870,
            y: 160,
            ports: {
                items: [
                    {
                        id: "c05de3ad-8200-bf05-b3c0-70f66f2d11cc",
                        group: "in"
                    },
                    {
                        id: "6d77b008-341c-04e0-8a82-7737c3af1f29",
                        group: "out"
                    }
                ]
            }
        },
        {
            id: "086b3584-3bd8-498e-8267-59738a8256bb",
            children: [],
            data: {
                NodeType: 5
            },
            label: "任务节点",
            parent: "",
            shape: "rect",
            visible: true,
            x: 1060,
            y: 340,
            ports: {
                items: [
                    {
                        id: "4535715a-e7d9-73c3-0018-90e3ac8ea5fd",
                        group: "in"
                    },
                    {
                        id: "7f55dcbf-6f81-3d64-fa3a-d8e1d62437c9",
                        group: "out"
                    }
                ]
            }
        }
    ]