const state = {
  cartItems: []
}
const mutations = {
  UPDATE_CART (state: { cartItems: any }, payload: any) {
    state.cartItems = payload
  },
  ADD_PRODUCT_TO_CART (state: { cartItems: { product: any; quantity: any }[] }, { product, quantity }: any) {
    const productInCart = state.cartItems.find((item: { product: { id: any } }) => item.product.id === product.id)

    if (productInCart) {
      productInCart.quantity += quantity
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
      return
    }

    state.cartItems.push({
      product,
      quantity
    })
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  INCREMENT_PRODUCT_QUANTITY (state: { cartItems: any[] }, product: { id: any }) {
    const current = state.cartItems.find((item: { product: { id: any } }) => item.product.id === product.id)

    current.quantity += 1
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  },
  REMOVE_PRODUCT_FROM_CART (state: { cartItems: any[] }, product: { id: any }) {
    const current = state.cartItems.find((item: { product: { id: any } }) => item.product.id === product.id)

    current.quantity -= 1
    if (current.quantity === 0) {
      state.cartItems = state.cartItems.filter((item: { product: { id: any } }) => item.product.id !== product.id)
    }
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  }
}

const getters = {
  getTotalItemsInCart (state: { cartItems: any[] }) {
    let totalItems = 0

    state.cartItems.forEach((item: { quantity: number }) => {
      totalItems += item.quantity
    })

    return totalItems
  },
  getTotalPriceInCart (state: { cartItems: any[] }) {
    let totalPrice = 0

    state.cartItems.forEach((item: { product: { price: number }; quantity: number }) => {
      totalPrice += item.product.price * item.quantity
    })

    return totalPrice
  },
  getTotalAmountWithDiscountApplied (state: { cartItems: any[] }) {
    let totalPrice = 0

    state.cartItems.forEach((item: { product: { regularPrice: number; price: number }; quantity: number }) => {
      totalPrice += (item.product.regularPrice - item.product.price) * item.quantity
    })
    return totalPrice
  }
}

export default {
  state,
  mutations,
  getters
}
