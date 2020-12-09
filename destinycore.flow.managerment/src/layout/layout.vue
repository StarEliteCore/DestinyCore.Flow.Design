<template>
  <a-layout id="main-app-layout" class="layout">
    <a-layout-sider class="main-app-layout__sider">Sider</a-layout-sider>
    <a-layout class="main-app-layout--right">
      <a-layout-header>
        Header
      </a-layout-header>
      <a-layout-content class="main-app-layout__content">
        <router-view v-if="!loading" class="admin-layout_content"></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" src="./layout.ts"></script>
<style lang="scss" src="./layout.scss" scoped></style>
<style lang="scss">
  @import "~@/assets/styles/index.scss";

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>