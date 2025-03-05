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
    <form @submit.prevent="submitForm">
      <input type="hidden" name="merchant_id" v-model="merchantId" />
      <input type="hidden" name="merchant_key" v-model="merchantKey" />
      <input type="hidden" name="return_url" v-model="returnUrl" />
      <input type="hidden" name="cancel_url" v-model="cancelUrl" />
      <input type="hidden" name="notify_url" v-model="notifyUrl" />
      <input type="hidden" name="amount" value="49.99" />
      <input type="hidden" name="item_name" value="Premium Plan Subscription" />

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
      <button type="button" @click="payWithApplePay" class="apple-pay">Pay with Apple Pay</button>
      <button type="submit" class="complete-payment">Complete Payment</button>
    </form>
    <p class="footer-note">Secure payment processed by Payfast.</p>
    <p class="footer">© 2025 PrimeFit. All rights reserved.</p>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import Toast from '@/components/Toast.vue';

export default {
  name:"PaymentView",
  components: {
    Toast,
  },
  data() {
    return {
      merchantId: 'YOUR_MERCHANT_ID',
      merchantKey: 'YOUR_MERCHANT_KEY',
      returnUrl: 'YOUR_RETURN_URL',
      cancelUrl: 'YOUR_CANCEL_URL',
      notifyUrl: 'YOUR_NOTIFY_URL',
      cardNumber: '4111 1111 1111 1111',
      expiryDate: '12/25',
      cvc: '123',
      selectedCrypto: '',
      showCryptoAddress: false,
      cryptoAddress: ''
    };
  },
  methods: {
    toggleCryptoAddress() {
      this.showCryptoAddress = this.selectedCrypto !== '';
    },
    submitForm() {
      // Basic validation
      let isValid = true;
      let errorMessage = '';

      if (!/^\d{16}$/.test(this.cardNumber)) {
        isValid = false;
        errorMessage += 'Please enter a valid 16-digit card number.\n';
      }

      const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!expiryPattern.test(this.expiryDate)) {
        isValid = false;
        errorMessage += 'Please enter a valid expiration date (MM/YY).\n';
      } else {
        const [month, year] = this.expiryDate.split('/');
        const expiry = new Date(`20${year}`, month);
        const now = new Date();
        if (expiry < now) {
          isValid = false;
          errorMessage += 'The card has expired.\n';
        }
      }

      if (!/^\d{3}$/.test(this.cvc)) {
        isValid = false;
        errorMessage += 'Please enter a valid 3-digit CVC.\n';
      }

      if (!isValid) {
        this.$refs.toast.showToast(errorMessage, 'error');
        return;
      }

      // Submit the form
      this.$refs.paymentForm.submit();
      this.$refs.toast.showToast('Payment submitted successfully!', 'success');
    },
    payWithApplePay() {
      if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
        const paymentRequest = {
          countryCode: 'ZAR',
          currencyCode: 'ZAR',
          total: {
            label: 'PRIMEFIT',
            amount: '49.99'
          },
          supportedNetworks: ['visa', 'masterCard', 'amex'],
          merchantCapabilities: ['capability3DS', 'capabilityEMV'],
        };

        const session = new ApplePaySession(1, paymentRequest);

        session.onvalidatemerchant = (event) => {
          const validationURL = event.validationURL;

          fetch('/validate-merchant', {
            method: 'POST',
            body: JSON.stringify({ validationURL }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            session.completeMerchantValidation(data);
          })
          .catch(error => {
            console.error('Error validating merchant:', error);
            session.abort();
          });
        };

        session.onpaymentauthorized = (event) => {
          const payment = event.payment;

          fetch('/process-payment', {
            method: 'POST',
            body: JSON.stringify(payment),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              session.completePayment(ApplePaySession.STATUS_SUCCESS);
              this.$refs.toast.showToast('Payment successful!', 'success');
            } else {
              session.completePayment(ApplePaySession.STATUS_FAILURE);
              this.$refs.toast.showToast('Payment failed. Please try again.', 'error');
            }
          })
          .catch(error => {
            console.error('Error processing payment:', error);
            session.completePayment(ApplePaySession.STATUS_FAILURE);
            this.$refs.toast.showToast('Error processing payment.', 'error');
          });
        };

        session.begin();
      } else {
        this.$refs.toast.showToast('Apple Pay is not available on this device.', 'error');
      }
    }
  }
};
</script>

<style scoped>
/* Your existing styles */
</style>

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
  background-color: #f7931a;
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
  border-color: #4caf50;
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
  background-color: #f1f1f1;
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
</style>