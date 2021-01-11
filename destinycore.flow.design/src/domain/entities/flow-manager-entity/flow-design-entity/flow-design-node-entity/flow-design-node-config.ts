import { CirculationTypeEnum, ProcessingStrategyEnum, SignaturetypeEnum } from "./flow-design-node-enum";
/**
 * 节点处理策略
 */
export const ProcessingStrategyArray=[
    {key:ProcessingStrategyEnum.oneAgreed,label:"一人同意即可"},
    {key:ProcessingStrategyEnum.allAgreed,label:"所有人同意"},
]
/**
 * 节点审签类型
 */
export const signatureTypeArray=[
    {key:SignaturetypeEnum.noApprovalComments,label:"无签批意见栏"},
    {key:SignaturetypeEnum.withApprovalCommentsNoNeedToSign,label:"有签批意见-无须签章"},
    {key:SignaturetypeEnum.withApprovalCommentsSignatureRequired,label:"有签批意见-须签章"},
]
/**
 * 节点流转类型
 */
export const circulationTypeArray=[
    {key:CirculationTypeEnum.singleStep,label:"单一分支"},
    {key:CirculationTypeEnum.OperateAccordingToConditionsNoStepTips,label:"根据条件判断无后续步骤提示"},
]