<template>
  <div>
    <div class="top-bar-wrapper">
      <div>
        <span class="store-name">Blue shop</span>
      </div>
      <div>
        <div class="search">
          Szukaj
        </div>
        <div class="shopping-cart" @click="goToCart">
          <div class="counter" v-if="getTotalItemsInCart > 0">{{ getTotalItemsInCart }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed } from 'vue';
import { useStore } from '../store'
import router, { ROUTING } from '../router'

const store = useStore();
const getTotalItemsInCart = computed(() => store.getters.getTotalItemsInCart);
const goToCart = () => {
  router.push(ROUTING.cart)
}
</script>

<style lang="scss" src="../scss/TopBar.scss"></style>
