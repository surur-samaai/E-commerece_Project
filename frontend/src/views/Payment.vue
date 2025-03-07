<template>
  <div id="body">
    <div class="container">
      <Toast ref="toast" />
      <h1>Complete Your Payment</h1>
      <div class="plan">
        <h2>Premium Plan</h2>
        <p>Monthly subscription • Cancel anytime</p>
        <p class="amount">R49.99</p>
      </div>
      <h3>Credit / Debit Card</h3>
      <div class="card-info">
        <i class="fa-brands fa-cc-visa"></i>
        <i class="fa-brands fa-cc-mastercard"></i>
        <i class="fa-brands fa-cc-amex"></i>
      </div>
      <form @submit.prevent="showPaymentModal">
        <input type="text" v-model="cardNumber" placeholder="Card Number" required />
        <div class="expiry-cvc">
          <input type="text" v-model="expiryDate" placeholder="MM/YY" required />
          <input type="text" v-model="cvc" placeholder="CVC" required />
        </div>
        <h3>Cryptocurrency</h3>
        <select v-model="selectedCrypto" @change="toggleCryptoAddress">
          <option value="" disabled selected>Select a cryptocurrency</option>
          <option value="bitcoin">Pay with Bitcoin</option>
          <option value="ethereum">Pay with Ethereum</option>
          <option value="bitcash">Pay with BitCash</option>
        </select>
        <input type="text" v-if="showCryptoAddress" v-model="cryptoAddress" placeholder="Enter your cryptocurrency address" required />
        <h3>Other Payment Options</h3>
        <button type="submit" class="complete-payment">Complete Payment</button>
      </form>
      <p class="footer-note">Secure payment processed by Payfast.</p>
      <p class="footer">© 2025 PrimeFit. All rights reserved.</p>
    </div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>Payment Successful</h2>
        <p>Your payment of R49.99 has been processed successfully.</p>
        <button @click="closeModal">OK</button>
      </div>
    </div>
  </div>
</template>
<script>
import Toast from '@/components/Toast.vue';
export default {
  name: "PaymentView",
  components: {
    Toast,
  },
  data() {
    return {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      selectedCrypto: '',
      showCryptoAddress: false,
      cryptoAddress: '',
      showModal: false
    };
  },
  methods: {
    toggleCryptoAddress() {
      this.showCryptoAddress = this.selectedCrypto !== '';
    },
    showPaymentModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>
<style scoped>
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
.plan p {
  display: block;
  text-align: left;
  margin-bottom: 20px;
}
.plan p.amount {
  text-align: right;
}
.amount {
  font-size: 24px;
  font-weight: bold;
}
.card-info {
  display: flex;
  justify-content: left;
  gap: 5px;
  margin-bottom: 10px;
}
.card-logo {
  margin: 0 10px;
  width: 30px;
}
input {
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
.footer-note {
  text-align: center;
  margin: 10px 0;
  font-size: 12px;
}
.footer {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}
select {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid crimson;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0. 5);
}
option {
  font-size: 16px;
  padding: 8px;
  background-color: #fff;
  color: #333;
}
option:hover {
  background-color: #F1F1F1;
}
.crypto-address {
  display: none;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid crimson;
  border-radius: 5px;
  font-size: 16px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.modal button {
  margin-top: 10px;
  padding: 10px;
  background: crimson;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>











Message Asiphesona Dumzela, Ethan Paulsen, Moegamat Surur Samaai









