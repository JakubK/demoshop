<template>
  <div class="container">
    <TopBar />
    <TopMenu />
    <Breadcrumbs :isSingleProduct="true" />
    <div class="main">
      <Sidebar :filters-hidden="true" />
      <Product />
    </div>
    <BottomLogos />
  </div>
</template>

<script lang="ts" setup>

import Sidebar from '../components/Sidebar.vue'
import Product from '../components/Product.vue'
import BottomLogos from '../components/BottomLogos.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import TopMenu from '../components/TopMenu.vue'
import TopBar from '../components/TopBar.vue'

</script>

<style lang="scss" src="../scss/Product.scss"></style>
