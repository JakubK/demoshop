<template>
  <div class="container">
    <Steps :currentStep="3" />
    <div class="summary-wrapper">
      <div class="row">
        <div>
          <h3 class="title">
            Zamówienie
          </h3>
          <div class="product-details summary" v-for="(item, index) in itemsInCart" :key="index">
            <div class="prod">
              <img src="../assets/images/ordered-product.svg" />
              <p>
                <span class="product-name">{{ item.product.name }}</span>
                <span class="size">Rozmiar S</span>
                <span class="delivery">Dostawa w 1-2 dni robocze</span>
              </p>
            </div>
            <div class="prod-price">
              <p class="price inverted">
                <span>{{ item.quantity * item.product.regularPrice }}</span>
                <span>{{ item.quantity * item.product.price }}</span>
              </p>
              <p class="promo summary-promo">
                {{ 100 - ((item.product.price / item.product.regularPrice) * 100) }}% taniej
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 class="title">
            Dane odbiorcy przesyłki
          </h3>
          <p>
            Jan Kowalski<br>
            Wrzosowa 46/76<br>
            76-567 Wrzosów
          </p>
          <br>
          <h3 class="title mt">
            Dostawa
          </h3>
          <div class="radio-wrapper">
            <div class="radio selected">
              <div>
                <span>Kurier DHL</span>
                <p>Przewidywana dostawa w 1-2 dni robocze </p>
              </div>
              <div>
                <span>15,90 zł</span>
                <img src="../assets/images/dhl.svg" />
              </div>
            </div>
          </div>
          <br>
          <h3 class="title mt">
            Metoda płatności
          </h3>
          <div class="radio-wrapper">
            <div class="radio selected">
              <div>
                <span>Szybka płatność</span>
                <p>Przelew internetowy, BLIK, karta płatnicza, Google Pay, Apple Pay</p>
              </div>
              <div>
                <img src="../assets/images/blue-media.svg" />
              </div>
            </div>
          </div>
          <br>
          <div class="summary-details">
            <p>
              <span>suma zamówienia:</span>
              <span>{{ getTotalPriceInCart }}</span>
            </p>
            <p>
              <span>dostawa:</span>
              <span>15,90 PLN</span>
            </p>
            <p>
              <span>do zapłaty łącznie (brutto):</span>
              <span class="amount-to-pay">{{ getTotalPriceInCart + deliveryAmount }}</span>
            </p>
            <p class="save">
              <span>oszczędzasz:</span>
              <span>{{ getTotalAmountWithDiscountApplied }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="submit-btn-wrapper checkout border-top">
        <div>
          <div class="continue">
            <span @click="goHome">WRÓĆ DO SKLEPU</span>
          </div>
          <div>
            <p>
              Składając zamówienie na BlueShop, akceptujesz <a>Postanowienia Polityki Prywatności</a>,
              <a>Regulamin</a> oraz zasady odstąpienia od umowy.
            </p>
          </div>
        </div>
        <button @click="checkout" :disabled="processing">
          <span>Potwierdź i zapłać używając Blue Media</span>
          <i class="loader" v-if="processing"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import Steps from '../components/Steps.vue'
import { useStore } from '../store'
import axiosInstance from '../api'
import { ENDPOINTS } from '../const/endpoints.const'
import { computed, ref } from 'vue'
import router, { ROUTING } from '../router'

const deliveryAmount = ref(15.90);
const processing = ref(false);

const store = useStore();
const itemsInCart = computed(() => store.state.cart.cartItems);
const getTotalPriceInCart = computed(() => store.getters.getTotalPriceInCart);
const getTotalAmountWithDiscountApplied = computed(() => store.getters.getTotalAmountWithDiscountApplied);

const goHome = () => {
  router.push(ROUTING.start);
}

const checkout = () => {
  const payload = {
    amount: getTotalPriceInCart.value + deliveryAmount.value,
    email: 'demoshop@bm.pl'
  }

  processing.value = true
  axiosInstance.post(ENDPOINTS.buy, payload)
    .then(response => {
      const { redirectUrl } = response?.data || {}

      if (typeof redirectUrl === 'string' && redirectUrl.length) {
        store.commit('UPDATE_CART', null);
        localStorage.removeItem('cart')
        window.location.href = redirectUrl
      }
    })
    .catch(error => {
      console.log('err', error)
    })
    .finally(() => {
      processing.value = false
    })
}
</script>
<style lang="scss" src="../scss/Summary.scss"></style>
