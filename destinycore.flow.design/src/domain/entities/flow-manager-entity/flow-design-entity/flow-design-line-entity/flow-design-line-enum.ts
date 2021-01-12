/***
 * 包含条件枚举
 */
export enum BelongConditionEnum {
    /**
     * 属于
     */
    belongTo = 0,
    /**
     * 不属于
     */
    notBelongTo = 5,
}
/***
 * 条件类型（组织架构/部门领导）
 */
export enum BelongConditionTypeEnum {
    /**
     * 组织架构
     */
    department = 0,
    /**
     * 组织架构领导
     */
    departmentLeader = 5,
}
/***
 * 下一步条件枚举（发送人/发起人）
 */
export enum NextHandlerEnum {
    /**
     * 发起人
     */
    sponsor = 0,
    /**
     * 发送人
     */
    sender = 5,
}
/***
 * 链接条件类型
 */
export enum WorkFlowFilterConnectEnum {
    /**
     * 并且
     */
    and = 0,
    /**
     * 或者
     */
    or = 5,
}