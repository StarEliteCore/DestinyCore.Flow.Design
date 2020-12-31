import { Component, Ref, Vue } from "vue-property-decorator";
@Component({
    name: "FlowOperateMixins",
})
export default class FlowOperateMixins extends Vue {
    /**
     * 是否顯示
     */
    protected IsShow: boolean = false;
    /**
     * 標題名稱
     */
    protected title: string = "";
    /**
     * 隱藏
     */
    protected disabled: boolean = false;
    /**
     * 回調事件
     */
    protected CB: Function = (res: boolean) => { };
    /**
     * 某些字段是否显示
     */
    protected IsShowColumn: boolean = true;
    protected OnHandleCancel() {
        /**
         * 取消顯示
         */
        this.IsShow = false;
    }
}
