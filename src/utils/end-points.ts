export const endpoints = {
  auth: {
    sendOtp: `auth/send-otp`,
    verification: "auth/verification",
  },
  order: {
    getOrder: "orders/get-order/:id",
    changeStatusorder: "orders/change-order-status-public/:id",
    getCurrentOrders: "orders/current-orders",
    getPreviousOrders: "orders/previous-orders",
    addOrder: "orders",
    getCurrentBasket: "orders/getCurrentBasket/:cartId",
    getCurrentCartWithProductModel: "orders/getCurrentCartWithModel/:id",
    addToCart: "orders/addToCart",
    reomoveFormCart: "orders/removeFromCart",
    getCurrentOrder: "orders/get-current-order",
    addtoCartAfterLogin: "orders/add-to-cart-after-login/:id",
  },
  address: {
    address: "address",
    addAddress: "address",
    getActiveAddress: "address/get-active-address",
  },

  user: {
    user: "users/public-user/user",
  },
  category: {
    getCatergoris: "category",
  },
  product: {
    getProduct: "product/public/:model",
    getProducts: "product/public",
    getProductsNotReserved:
      "product/public/product-not-reserved/get-products-notReserved",
    searchProduct: "product/public/product-search/product-search/",
  },
};
