import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CartVue from "../views/Cart.vue";
import DeliveryVue from "../views/Delivery.vue";
import ProductsViewVue from "../views/ProductsView.vue";
import ProductViewVue from "../views/ProductView.vue";
import ReturnVue from "../views/Return.vue";
import SummaryVue from "../views/Summary.vue";

export const ROUTING = {
  start: '/',
  product: '/produkt',
  cart: '/koszyk',
  delivery: '/delivery',
  summary: '/podsumowanie',
  return: '/powrot-z-bramki'
}

const routes: RouteRecordRaw[] = [
  {
    path: '/delivery',
    name: 'Delivery',
    component: DeliveryVue
  },
  {
    path: ROUTING.start,
    name: 'Products',
    component: ProductsViewVue
  },
  
  {
    path: ROUTING.product,
    name: 'Products',
    component: ProductViewVue
  },
  {
    path: ROUTING.cart,
    name: 'Cart',
    component: CartVue
  },
  {
    path: ROUTING.summary,
    name: 'Delivery',
    component: SummaryVue
  },
  {
    path: ROUTING.return,
    name: 'Return',
    component: ReturnVue
  }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;
