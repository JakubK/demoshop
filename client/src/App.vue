<template>
  <div class="app">
    <div class="app-main">
      <AppHeader />
      <router-view />
    </div>
    <Footer />
  </div>
</template>


<script lang="ts" setup>
import AppHeader from './components/Header.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue';
import { useStore } from './store';


const store = useStore();
const UPDATE_CART = (cart: any) => store.commit('UPDATE_CART', cart);
const getCardDataFromStorage = () => {
  if (localStorage.getItem('cart') === null)
    return;
  const cart = JSON.parse(localStorage.getItem('cart')!)
  UPDATE_CART(cart)
}

onMounted(() => {
  getCardDataFromStorage();
})

</script>

<style lang="scss" src="./scss/App.scss"/>
