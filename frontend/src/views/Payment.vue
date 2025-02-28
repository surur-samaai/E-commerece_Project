<template>
  <div id="body">
    <div class="container">
  <h1>Complete Your Payment</h1>
  <div class="plan">
    <h2>Premium Plan</h2>
    <p>Monthly subscription • Cancel anytime</p>
    <p class="amount">R49.99</p>
  </div>
  <h3>Credit Card</h3>
  <div class="card-info">
    <i class="fa-brands fa-cc-visa"></i>
    <i class="fa-brands fa-cc-mastercard"></i>
    <i class="fa-brands fa-cc-amex"></i>
  </div>
  <form @submit.prevent="submitPayment">
    <input type="text" v-model="cardNumber" placeholder="Card Number" required />
    <div class="expiry-cvc">
      <input type="text" v-model="expiry" placeholder="MM/YY" required />
      <input type="text" v-model="cvc" placeholder="CVC" required />
    </div>
    <h3>Cryptocurrency</h3>
    <select v-model="selectedCrypto" @change="toggleCryptoInput" required>
      <option value="" disabled selected>Select a cryptocurrency</option>
      <option value="bitcoin">Pay with Bitcoin</option>
      <option value="ethereum">Pay with Ethereum</option>
      <option value="bitcash">Pay with BitCash</option>
    </select>
    <input
      type="text"
      v-model="cryptoAddress"
      class="crypto-address"
      placeholder="Enter your cryptocurrency address"
      v-show="selectedCrypto"
      required
    />
    <h3>Other Payment Options</h3>
    <button type="button" class="apple-pay">Pay with Apple Pay</button>
    <button type="submit" class="complete-payment">Complete Payment</button>
  </form>
  <p class="footer-note">Secure payment processed by Payfast.</p>
  <p class="footer">© 2025 PrimeFit. All rights reserved.</p>
</div>
  </div>
</template>
<script>
export default {
  name: "PaymenView",
  data() {
  return {
    cardNumber: "",
    expiry: "",
    cvc: "",
    selectedCrypto: "",
    cryptoAddress: ""
  };
},
methods: {
  toggleCryptoInput() {
    if (!this.selectedCrypto) {
      this.cryptoAddress = "";
    }
  },
  submitPayment() {
    alert("Payment Submitted!");
  }
}
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
#body {
font-family: Arial, sans-serif;
background-color: #333;
display: flex;
justify-content: center;
align-items: center;
margin: 0;
}
.container {
background-color: #fff;
padding: 30px;
margin: 30px;
border-radius: 8px;
height: fit-content;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
width: 400px;
}
h1 {
text-align: center;
margin-bottom: 20px;
}
.plan p.amount {
text-align: right;
margin-bottom: 20px;
}
.amount {
text-align: right;
font-size: 24px;
font-weight: bold;
}
.card-info {
display: flex;
justify-content: left;
gap: 5px;
margin-bottom: 10px;
}
input, select {
width: calc(100% - 20px);
padding: 10px;
margin: 10px 0;
border: 1px solid crimson;
border-radius: 5px;
}
.expiry-cvc {
display: flex;
gap: 10px;
justify-content: space-between;
}
.expiry-cvc input {
width: calc(50% - 10px);
}
button {
width: 100%;
padding: 10px;
margin: 10px 0;
border: none;
border-radius: 5px;
cursor: pointer;
}
.crypto-button {
background-color: #F7931A;
color: white;
}
.apple-pay {
background-color: #000;
color: white;
}
.complete-payment {
background-color: crimson;
color: white;
}
.footer-note, .footer {
text-align: center;
font-size: 12px;
margin-top: 20px;
}
</style>