import { IEntity } from '@/sharad/baseentity/IEntity';

/**
 * Line And Node in Common Property
 */
export interface INodeLineCommonPropertyDto extends IEntity<string>
{
    /**
     * 类型
     */
    type:string;
    /**
     * 文本文字
     */
    label:string;
}