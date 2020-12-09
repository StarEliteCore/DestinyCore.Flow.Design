import { Vue } from 'vue-class-component';

export default class LayoutComponent extends Vue {
    private loading :boolean=true;
    mounted() {
        console.log("父组件")
        debugger
        this.loading=false;
    }

}