<template>
  <div class="container">
    <TopBar />
    <Steps :currentStep="1" />
    <div class="cart-wrapper">
      <h3 class="title">
        <span>Twój koszyk <span v-if="getTotalItemsInCart">({{ getTotalItemsInCart }})</span></span>
        <span>
          <span class="title-text">Nie zwlekaj z zakupem, dodanie artykułów do koszyka nie oznacza ich rezerwacji</span>
        </span>
      </h3>
      <div v-if="!itemsInCart.length">
        <div class="d-flex justify-center">Twój koszyk jest pusty</div>
      </div>
      <div v-if="itemsInCart.length">
        <div v-for="(item, index) in itemsInCart"
             :key="index"
             class="cart-product">
          <div class="name-quantity">
            <div class="box">
              <div>
                <p class="list-title">Produkty</p>
                <div class="product-details">
                  <img src="../assets/images/ordered-product.svg" />
                  <div>
                    <p>
                      <span class="product-name">{{ item.product.name }}</span>
                      <span class="size">Rozmiar S</span>
                      <span class="delivery">Dostawa w 1-2 dni robocze</span>
                    </p>
                    <p class="details-actions">
                      <span><img src="../assets/images/close.svg" /> Usuń produkt</span>
                      <span><img src="../assets/images/heart.svg" /> Dodaj do ulubionych</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="box">
              <div>
                <p class="list-title">Ilość</p>
                <div class="quantity">
                  <button @click="decrementProductQuantity(item.product)">-</button>
                  <input type="number" v-model.number="item.quantity" min="1" max="10">
                  <button @click="incrementProductQuantity(item.product)">+</button>
                </div>
              </div>
            </div>
          </div>
          <div class="box price">
            <div>
              <p class="list-title">Wartość</p>
              <p class="price inverted">
                <span>{{ item.quantity * item.product.regularPrice }}</span>
                <span>{{ item.quantity * item.product.price }}</span>
              </p>
              <p class="discount">
                {{ 100 - ((item.product.price / item.product.regularPrice) * 100) }}% taniej
              </p>
            </div>
          </div>
        </div>
        <div class="checkout-btn-wrapper">
          <div class="discount">
            <div>
              <div class="code">Kod kuponu</div>
              <div class="code-apply">Zastosuj kupon</div>
            </div>
            <span class="amount">
             <span>Do zapłaty:</span> <span>{{ getTotalPriceInCart }}</span>
          </span>
          </div>
        </div>
        <div class="submit-btn-wrapper">
          <div class="continue">
            <span>KONTYNUUJ ZAKUPY</span>
          </div>
          <button @click="goDelivery">Dostawa i płatność</button>
        </div>
        <BottomLogos />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '../store'
import BottomLogos from '../components/BottomLogos.vue'
import Steps from '../components/Steps.vue'
import TopBar from '../components/TopBar.vue'
import router, { ROUTING } from '../router'

const store = useStore();
const itemsInCart = computed(() => store.state.cart.cartItems);
const getTotalPriceInCart = computed(() => store.getters.getTotalPriceInCart);
const getTotalItemsInCart = computed(() => store.getters.getTotalItemsInCart);

const incrementProductQuantity = (product: any) => store.commit('INCREMENT_PRODUCT_QUANTITY', product);

const decrementProductQuantity = (product: any) => store.commit('REMOVE_PRODUCT_FROM_CART', product);

const goDelivery = () => {
  router.push(ROUTING.delivery)
}
</script>
<style lang="scss" src="../scss/Cart.scss"></style>
