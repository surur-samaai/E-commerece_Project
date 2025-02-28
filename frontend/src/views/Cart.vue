<template>
  <div id="body">
  <div class="container">
    <div class="cart-items">
      <h1>Shopping Cart</h1>
      <div class="product" v-for="(product, index) in products" :key="index">
        <div class="product-image"></div>
        <div class="product-details">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <span class="price">{{ product.price }}</span>
        </div>
        <div class="quantity-controls">
          <button @click="decreaseQuantity(index)">-</button>
          <span class="quantity">{{ product.quantity }}</span>
          <button @click="increaseQuantity(index)">+</button>
          <button class="remove" @click="removeProduct(index)">:wastebasket:</button>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="order-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>{{ subtotal }}</span>
        </div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>{{ delivery }}</span>
        </div>
        <div class="summary-row">
          <span>Tax</span>
          <span>{{ tax }}</span>
        </div>
        <hr />
        <div class="summary-row total">
          <span>Total</span>
          <span>{{ total }}</span>
        </div>
        <button class="checkout">Proceed to Checkout</button>
        <div class="card-info">
          <i class="fa-brands fa-cc-visa"></i>
          <i class="fa-brands fa-cc-mastercard"></i>
          <i class="fa-brands fa-cc-amex"></i>
          <i class="fa-brands fa-cc-paypal"></i>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "CartView",
  data() {
    return {
      products: [
        { name: "Premium Dumbbells Set", description: "10kg - 30kg adjustable", price: "R299.99", quantity: 1 },
        { name: "Resistance Bands Pack", description: "Set of 5 bands", price: "R49.99", quantity: 2 },
      ],
      delivery: "R39.99",
      tax: "R36.86",
    };
  },
  computed: {
    subtotal() {
      return this.products.reduce((sum, product) => sum + parseFloat(product.price.replace('R', '')) * product.quantity, 0).toFixed(2);
    },
    total() {
      return (parseFloat(this.subtotal) + parseFloat(this.delivery.replace('R', '')) + parseFloat(this.tax.replace('R', ''))).toFixed(2);
    },
  },
  methods: {
    increaseQuantity(index) {
      this.products[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
      }
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
  },
};
</script>
<style scoped>
h1 {
  color: #2C3E50;
}
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  width: 80%;
  margin: auto;
  display: flex;
  background: linear-gradient(to bottom, #FFFFFF, #F4F4F4);
  padding: 20px;
  border-radius: 15px;
  gap: 20px;
}
.cart-items {
  width: 80%;
  border-radius: 20px;
  padding: 20px;
  height: 400px;
  border: 1px solid crimson;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.wrapper {
  width: 40%;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  padding-left: 10px;
  text-align: left;
  color: crimson;
}
.product {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
}
.product-image {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background-color: #E0E0E0;
}
.product-details {
  flex-grow: 1;
  padding: 0 15px;
}
.price {
  font-weight: bold;
  color: black;
}
.quantity-controls {
  display: flex;
  align-items: center;
}
.quantity-controls button {
  background: #E0E0E0;
  color: black;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}
.quantity {
  margin: 0 5px;
}
.remove {
  border: none;
  color: black;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}
.order-summary {
  height: 90%;
  background-color: white;
  border-radius: 20px;
  border: 1px solid crimson;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 100%;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.total {
  font-weight: bold;
  font-size: 1.1em;
}
.checkout {
  width: 100%;
  background: crimson;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}
.card-info {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
</style>