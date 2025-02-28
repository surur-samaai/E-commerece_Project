<template>
  <div id="body">
    <header>
      <div class="navbar-left">
        <h1>
          <img src="/images/logo.png" alt="logo" id="logo" />
        </h1>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/shop">Shop</router-link>
          <router-link to="/articles">Articles</router-link>
          <router-link to="/plans">Subscriptions</router-link>
        </nav>
      </div>

      <div class="navbar-right">
        <button class="login-btn">Log In</button>
      </div>
    </header>
    <section class="top">
      <h1>Choose Your Perfect Subscription Plan</h1>
      <p>
        Get access to premium gym equipment for your home or business with
        flexible rental options.
      </p>
    </section>

    <div class="container">
      <div class="duration-switch">
        <button
          v-for="duration in durations"
          :key="duration.id"
          :class="{ active: activeDuration === duration.id }"
          @click="setActiveDuration(duration.id)"
        >
          {{ duration.label }}
        </button>
      </div>

      <div class="plans">
        <div
          class="plan"
          v-for="plan in plans"
          :key="plan.name"
          :class="{ active: selectedPlan === plan.name }"
        >
          <h2>{{ plan.name }}</h2>
          <p class="price">{{ plan.price }}</p>
          <ul>
            <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
          </ul>
          <button class="select-plan" @click="selectPlan(plan.name)">Select Plan</button>
        </div>
      </div>
    </div>

    <h1>Why Choose PrimeFit</h1>
    <div class="why-choose">
      <div v-for="(reason, index) in reasons" :key="index">
        <span>{{ reason.icon }}</span>
        <h2>{{ reason.title }}</h2>
        <p class="text">{{ reason.description }}</p>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h2>PrimeFit</h2>
          <p>
            Your complete fitness solution for equipment, apparel, rentals, and
            training.
          </p>
        </div>
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="#">About Us</router-link></li>
            <li><router-link to="#">Contact</router-link></li>
            <li><router-link to="#">FAQ</router-link></li>
            <li><router-link to="#">Terms & Conditions</router-link></li>
            <li><router-link to="#">Privacy Policy</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Connect</h3>
          <ul class="social-links">
            <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i class="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="#"><i class="fab fa-youtube"></i> YouTube</a></li>
            <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="footer-bottom">
        <p>© 2025 PrimeFit. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "PlansView",
  data() {
    return {
      activeDuration: '12-month',
      selectedPlan: null,
      durations: [
        { id: '12-month', label: '12 Months' },
        { id: '24-month', label: '24 Months' },
        { id: '36-month', label: '36 Months' },
      ],
      plans: [
        {
          name: 'Basic',
          price: 'R500/month',
          features: [
            '✔ 3 pieces of equipment',
            '✔ Monthly maintenance',
            '✔ Workout Videos',
          ],
        },
        {
          name: 'Pro',
          price: 'R1 250/month',
          features: [
            '✔ 5 pieces of equipment',
            '✔ Gym Clothing',
            '✔ Sports nutrition',
            '✔ Free Monthly Accessories',
          ],
        },
        {
          name: 'Premium',
          price: 'R2 500/month',
          features: [
            '✔ 7 pieces of equipment',
            '✔ Free Delivery',
            '✔ Gym Clothing',
            '✔ Personal training session + Sports nutrition',
          ],
        },
      ],
      reasons: [
        { icon: '🚚', title: 'Free Delivery', description: 'We deliver and install all equipment' },
        { icon: '🔧', title: 'Regular Maintenance', description: 'Keep the equipment in perfect condition' },
        { icon: '🔄', title: 'Flexible Swaps', description: 'Exchange equipment whenever you want' },
        { icon: '🤝', title: 'Expert Support', description: 'Get help from our fitness specialists' },
      ],
    };
  },
  methods: {
    setActiveDuration(duration) {
      this.activeDuration = duration;
      this.updatePlans();
    },
    selectPlan(planName) {
      this.selectedPlan = planName;
    },
    updatePlans() {
      const prices = {
        '12-month': {
          Basic: 'R500/month',
          Pro: 'R1 250/month',
          Premium: 'R2 500/month',
        },
        '24-month': {
          Basic: 'R450/month',
          Pro: 'R1 125/month',
          Premium: 'R2 250/month',
        },
        '36-month': {
          Basic: 'R400/month',
          Pro: 'R1 000/month',
          Premium: 'R2 000/month',
        },
      };

      const features = {
        '12-month': [
          [
            '✔ 3 pieces of equipment',
            '✔ Monthly maintenance',
            '✔ Workout Videos',
          ],
          [
            '✔ 5 pieces of equipment',
            '✔ Gym Clothing',
            '✔ Sports nutrition',
            '✔ Free Monthly Accessories',
          ],
          [
            '✔ 7 pieces of equipment',
            '✔ Free Delivery',
            '✔ Gym Clothing',
            '✔ Personal training session + Sports nutrition',
          ],
        ],
        '24-month': [
          [
            '✔ 4 pieces of equipment',
            '✔ Bi-Monthly maintenance',
            '✔ Workout Videos + Diet Plan',
          ],
          [
            '✔ 6 pieces of equipment',
            '✔ Gym Clothing + Extra Accessories',
            '✔ Personalized Nutrition Plan',
            '✔ Free Gym Bag',
          ],
          [
            '✔ 8 pieces of equipment',
            '✔ Priority Free Delivery',
            '✔ Gym Clothing & Shoes',
            '✔ 2 Personal training sessions + Custom Sports Nutrition Plan',
          ],
        ],
        '36-month': [
          [
            '✔ 5 pieces of equipment',
            '✔ Quarterly maintenance',
            '✔ Workout Videos + Advanced Diet Plan',
          ],
          [
            '✔ 7 pieces of equipment',
            '✔ Premium Gym Clothing & Accessories',
            '✔ Custom Nutrition & Workout Plan',
            '✔ Free Supplements Starter Pack',
          ],
          [
            '✔ 10 pieces of equipment',
            '✔ Priority Express Free Delivery',
            '✔ Full Premium Gym Outfit',
            '✔ 4 Personal training sessions + Elite Sports Nutrition Plan',
          ],
        ],
      };

      const duration = this.activeDuration;

      this.plans.forEach((plan, index) => {
        plan.price = prices[duration][plan.name];
        plan.features = features[duration][index];
      });
    },
  },
  mounted() {
    this.updatePlans();
  },
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
  padding: 0;
  text-align: center;
}

h1,
p {
  color: white;
}

.text {
  color: #333;
}

header {
  background-color: #3333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
}

#logo {
  height: 80px;
  width: 80px;
  vertical-align: middle;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-left h1 {
  margin: 0;
  font-size: 2em;
  font-weight: bold;
}

nav {
  margin-left: 20px;
}

nav a {
  margin: 0 15px;
  display: inline-block;
  padding: 10px 20px;
  text-decoration: none;
  color: white;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

nav a:hover {
  background-color: white;
  color: crimson;
  border-radius: 20px;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-right button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}

.navbar-right .login-btn {
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.top {
  margin: 10px 0;
  height: 200px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  background-color: #333;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.duration-switch {
  margin-top: 30px;
  margin-bottom: 20px;
}

.duration-switch button {
  cursor: pointer;
  font-weight: bold;
  margin: 0 10px;
  padding: 10px;
  border: none;
  background-color: white;
  color: crimson;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.duration-switch .active {
  background-color: crimson;
  color: white;
}

.plans {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.plan {
  background-color: white;
  border: 2px solid crimson;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  margin: 15px;
  width: 30%;
  height: 300px;
  transition: background-color 0.3s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.plan.active {
  background-color: #333;
  color: white;
}

label {
  text-align: center;
  justify-items: center;
}

.plan h2 {
  margin: 0;
}

.price {
  font-size: 24px;
  color: #333;
  font-weight: bold;
}

.features {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.features input {
  display: none;
}

.features label {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.select-plan {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  margin-top: 10%;
  border: none;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}

.plan.active .select-plan  {
  background-color: crimson;
  color: white;
}

.plan.active p.price {
  color: white;
}

.select-plan:hover {
  background-color: crimson;
}

.plan ul {
  list-style: none;
  padding: 0;
}

.plan li {
  padding: 5px 0;
}

.why-choose {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
}

.why-choose div {
  background-color: #f9f9f9;
  border: 2px solid crimson;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 300px;
  height: 100px;
  text-align: center;
  display: block;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.why-choose div:hover {
  transform: scale(1.05);
}

.footer {
  background-color: #333;
  color: white;
  padding: 40px 20px;
  border-top: 2px solid crimson;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-right: 20px;
}

.footer-section h2,
.footer-section h3 {
  font-size: 1.6em;
  margin-bottom: 10px;
}

.footer-section p {
  font-size: 1em;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  font-size: 1.2em;
}

.footer-section ul li a:hover {
  color: #f39c12;
}

.social-links {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-links li {
  display: inline-block;
}

.social-links li a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.social-links li i {
  font-size: 1.4em;
}

.footer-bottom {
  text-align: center;
  font-size: 1em;
  margin-top: 20px;
}

.footer-bottom p {
  margin: 0;
}
</style>