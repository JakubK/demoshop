import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import cart from './modules/cart';
export const key: InjectionKey<Store<any>> = Symbol();

export const useStore = () => {
  return baseUseStore(key)
}

export default createStore({
  modules: {
    cart
  }
});