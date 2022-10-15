<template>
  <div class="container">
    <TopBar />
    <TopMenu />
    <Breadcrumbs />
    <div class="main">
      <Sidebar />
      <Products />
    </div>
    <BottomLogos />
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '../components/Sidebar.vue'
import Products from '../components/Products.vue'
import BottomLogos from '../components/BottomLogos.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
import TopMenu from '../components/TopMenu.vue'
import TopBar from '../components/TopBar.vue'
</script>

<style lang="scss" src="../scss/Products.scss"></style>
