import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "LayoutComponent"
})
export default class LayoutComponent extends Vue {
  private loading: boolean = true;
  mounted() {
    console.log("父组件")
    this.loading = false;
  }

} 