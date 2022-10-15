<template>
  <header>
    <div class="container">
      <div class="header-main">
        <div class="logo-wrapper" @click="goToHomePage">
          <div class="logo"></div>
          <span>DEMO</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import router, { ROUTING } from '../router';

const route = useRoute();
const goToHomePage = () => {
  if (route.path === ROUTING.start)
    return;
  router.push(ROUTING.start)
}
</script>

<style lang="scss" src="../scss/Header.scss"></style>
