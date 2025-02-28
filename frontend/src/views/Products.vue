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
        <button class="cart-icon"><i class="fa fa-shopping-cart"></i></button>
      </div>
    </header>

    <div class="container">
      <h1>Fitness Equipment</h1>
      <div class="top-nav">
        <div class="tabs">
          <button v-for="(tab, index) in tabs" :key="index" @click="updateProductDisplay(tab)"
            :class="{ active: activeTab === tab }">
            {{ tab }}
          </button>
        </div>
        <div class="filters">
          <select id="sortSelect" v-model="sortOption">
            <option value="all">All Prices</option>
            <option value="priceLow">Sort by: Price Low to High</option>
            <option value="priceHigh">Sort by: Price High to Low</option>
          </select>
        </div>
      </div>
      <div class="products">
        <div class="product-card" v-for="product in filteredProducts" :key="product.name">
          <div class="product-image">
            <img :src="product.images[0]" :alt="product.name" />
          </div>
          <h2>{{ product.name }}</h2>
          <span>R{{ product.price.toFixed(2) }}</span>
          <a href="#" class="view-product" @click.prevent="showProductDetails(product)">View Product</a>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
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
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li><router-link to="/terms">Terms & Conditions</router-link></li>
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>Connect</h3>
          <ul class="social-links">
            <li>
              <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-facebook-f"></i> Facebook</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-youtube"></i> YouTube</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-twitter"></i> Twitter</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="footer-bottom">
        <p>2025 PrimeFit. All rights reserved.</p>
      </div>
    </footer>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-left">
          <h2>{{ selectedProduct.name }}</h2>
          <div class="product-info" v-if="selectedProduct && selectedProduct">
            <p>{{ formattedDetails.paragraph }}</p>
            <table v-if="formattedDetails.details.length">
              <thead>
                <tr>
                  <th colspan="2">Additional Information</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in formattedDetails.details" :key="index">
                  <td><strong>{{ item.label }}:</strong></td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <span>R{{ selectedProduct.price.toFixed(2) }}</span>
          <button @click="addToCart(product)">Add to Cart</button>
        </div>
        <div class="modal-right">
          <div v-for="(image, index) in selectedProduct.images.slice(1, 3)" :key="index">
            <img :src="image" :alt="selectedProduct.name + ' image ' + (index + 2)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsView",
  data() {
    return {
      tabs: ["All Products", "Gym Equipment", "Gym Attire", "Fitness Trackers"],
      activeTab: "All Products",
      sortOption: "all",
      selectedProduct: null,
      showModal: false,
      Products: [
        // Gym Equipment
        {
          name: "Adjustable Dumbbell Set",
          description: "No matter how you train, our adjustable dumbbells make getting a complete workout smoother than you ever imagined. Weight: 21 kg. Dimensions: 40.5 × 19 × 17.8 cm. Set Includes: 2x 20-kg Dumbbells, 2 Cradles.",
          price: 15.373,
          category: "Gym Equipment",
          images: [
            "/images/products/Gym-Equipment/adjustable dumbell.jpg",
            "/images/products/Gym-Equipment/dumbell-1.jpg",
            "/images/products/Gym-Equipment/dumbell-2.jpg",
          ],
        },
        {
          name: "Adjustable Bench",
          description: "Bring commercial-rated toughness and club-quality function to your home with our stylish Multi-adjustable Bench. Weight:	36 kg. Dimensions:	142.4 × 77.5 × 43.7 cm. Bench Height: 44cm. Backrest Adjustment Range: 5 Position Angles: 0, 30, 45, 60, 75. Seat Adjustment Range:	2 Position Angles; 0, 20.",
          price: 11.999,
          category: "Gym Equipment",
          images: [
            "/images/products/Gym-Equipment/adjustable-bench.jpg",
            "/images/products/Gym-Equipment/bench-1.jpg",
            "/images/products/Gym-Equipment/bench-2.jpg",
          ],
        },
        {
          name: "Horizon 3.0SC Indoor Cycle",
          description: "Set of kettlebells for full-body workout",
          price: 12.999,
          category: "Gym Equipment",
          images: [
            "/images/products/Gym-Equipment/horizon.jpg",
            "/images/products/Gym-Equipment/horizon-1.jpg",
            "/images/products/Gym-Equipment/horizon-2.jpg",
          ],
        },
        {
          name: "Horizon EX59 Elliptical",
          description: "Space-saving adjustable dumbbell set",
          price: 18.900,
          category: "Gym Equipment",
          images: [
            "/images/products/Gym-Equipment/horizon_ex59.jpg",
            "/images/products/Gym-Equipment/horizon_ex59-1.jpg",
            "/images/products/Gym-Equipment/horizon_ex59-2.jpg",
          ],
        },
        {
          name: "Horizon TR5 Treadmill",
          description: "Complete barbell set with weights",
          price: 15.599,
          category: "Gym Equipment",
          images: [
            "/images/products/Gym-Equipment/horizon_tr5_tread.jpg",
            "/images/products/Gym-Equipment/horizon_tr5-1.jpg",
            "/images/products/Gym-Equipment/horizon_tr5-2.jpg",
          ],
        },
        {
          name: "Matrix FTR30 Functional Trainer",
          description: "Durable weight plates for strength training",
          price: 67.899,
          category: "Gym Equipment",
          images: [
            "/images/products/Gym-Equipment/matrix_ftr.jpg",
            "/images/products/Gym-Equipment/matrix_ftr30-1.jpg",
            "/images/products/Gym-Equipment/matrix_ftr30-2.jpg",
          ],
        },

        // Fitness Trackers
        {
          name: "Galaxy Fit3",
          description: "Complete set of 5 resistance levels",
          price: 49.99,
          category: "Fitness Trackers",
          images: [
            "/images/products/Fitness-Trackers/za-galaxy-fit3.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-fit3-1.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-fit3-2.jpg",

          ],
        },
        {
          name: "Galaxy Watch6 (Bluetooth, 40mm)",
          description: "Extra thick non-slip exercise mat",
          price: 79.99,
          category: "Fitness Trackers",
          images: [
            "/images/products/Fitness-Trackers/Galaxy6.jpg",
            "/images/products/Fitness-Trackers/Galaxy6-1.jpg",
            "/images/products/Fitness-Trackers/Galaxy6-2.jpg",
          ],
        },
        {
          name: "Galaxy Watch4",
          description: "Compact ab wheel for core workouts",
          price: 29.99,
          category: "Fitness Trackers",
          images: [
            "/images/products/Fitness-Trackers/za-galaxy-watch4.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-watch4-1.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-watch4-2.jpg",
          ],
        },
        {
          name: "Galaxy Watch7 (Bluetooth, 44mm)",
          description: "Durable jump rope for cardio workouts",
          price: 15.99,
          category: "Fitness Trackers",
          images: [
            "/images/products/Fitness-Trackers/za-galaxy-watch7.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-watch7-1.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-watch7-2.jpg",
          ],
        },
        {
          name: "Galaxy Watch FE (Bluetooth, 40mm)",
          description: "High-density foam roller for recovery",
          price: 29.99,
          category: "Fitness Trackers",
          images: [
            "/images/products/Fitness-Trackers/za-galaxy-watch-fe.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-watch-fe-1.jpg",
            "/images/products/Fitness-Trackers/za-galaxy-watch-fe-2.jpg",
          ],
        },
        {
          name: "Samsung Gear Fit",
          description: "Durable exercise ball for core and stability",
          price: 25.99,
          category: "Fitness Trackers",
          images: [
            "/images/products/Fitness-Trackers/Galaxy_Gear_Fit.jpg",
            "/images/products/Fitness-Trackers/Galaxy_Gear_Fit-1.jpg",
            "/images/products/Fitness-Trackers/Galaxy_Gear_Fit-2.jpg",
          ],
        },

        // Gym Attire
        {
          name: "Full-length Running Tights",
          description: "High-quality fitness treadmill",
          price: 4999.99,
          category: "Gym Attire",
          images: [
            "/images/products/Gym-Attire/Full_length.jpg",
            "/images/products/Gym-Attire/Full_length-1.jpg",
            "/images/products/Gym-Attire/Full_length-2.jpg",
          ],
        },
        {
          name: "Dri_sport_Tshirt",
          description: "Durable rowing machine for full-body workout",
          price: 3000.99,
          category: "Gym Attire",
          images: [
            "/images/products/Gym-Attire/Dri_Tshirt.jpg",
            "/images/products/Gym-Attire/Dri_Tshirt-1.jpg",
            "/images/products/Gym-Attire/Dri_Tshirt-2.jpg",
          ],
        },
        {
          name: "2-in-1 Running Shorts",
          description: "Heavy-duty power rack for strength training",
          price: 799.99,
          category: "Gym Attire",
          images: [
            "/images/products/Gym-Attire/2-in-1 Running Shorts.jpg",
            "/images/products/Gym-Attire/2-in-1 Running Shorts-1.jpg",
            "/images/products/Gym-Attire/2-in-1 Running Shorts-2.jpg",
          ],
        },
        {
          name: "Quarter-zip Pullover",
          description: "Indoor spin bike for cycling workouts",
          price: 899.99,
          category: "Gym Attire",
          images: [
            "/images/products/Gym-Attire/Quarter-zip Pullover.jpg",
            "/images/products/Gym-Attire/Quarter-zip Pullover-1.jpg",
            "/images/products/Gym-Attire/Quarter-zip Pullover-2.jpg",
          ],
        },
        {
          name: "Reset Full-Length Leggings",
          description: "Easy-install pull-up bar for home use",
          price: 99.99,
          category: "Gym Attire",
          images: [
            "/images/products/Gym-Attire/Reset Full-Length Leggings.jpg",
            "/images/products/Gym-Attire/Reset Full-Length Leggings-1.jpg",
            "/images/products/Gym-Attire/Reset Full-Length Leggings-2.jpg",
          ],
        },
        {
          name: "Elite Compression Long Sleeve Top",
          description: "Smith machine for safe weightlifting",
          price: 1399.99,
          category: "Gym Attire",
          images: [
            "/images/products/Gym-Attire/Elite Compression Long Sleeve Top.jpg",
            "/images/products/Gym-Attire/Elite Compression Long Sleeve Top-1.jpg",
            "/images/products/Gym-Attire/Elite Compression Long Sleeve Top-2.jpg",
          ],
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = [];


      if (this.activeTab === "All Products") {
        filteredProducts = this.Products; // Include all products
      } else {
        filteredProducts = this.Products.filter(
          (product) => product.category === this.activeTab
        );
      }

      // Apply sorting
      switch (this.sortOption) {
        case "priceLow":
          return filteredProducts.sort((a, b) => a.price - b.price);
        case "priceHigh":
          return filteredProducts.sort((a, b) => b.price - a.price);
        case "all":
        default:
          return filteredProducts; // Keep as-is (or apply any other featured sorting logic)
      }
    },

    formattedDetails() {
      if (!this.selectedProduct || !this.selectedProduct.description) { 
        return {paragraph: '', details: [] };
      }

      const detailsArray = this.selectedProduct.description.split('.'); // Split before letters
      
      // Extracting the paragraph (first part of the description)
      const paragraph = detailsArray[0].trim();
      const details = [];

      // Process the remaining details
      for (let i = 1; i < detailsArray.length; i++) {
      const detail = detailsArray[i].trim();
      if (detail) {
        const [label, value] = detail.split(':').map(item => item.trim());
        if (label && value) {
          details.push({ label, value });
        }
      }
    }

      return { paragraph, details };
    }
  },
  methods: {
    updateProductDisplay(tab) {
      this.activeTab = tab;
    },
    addToCart(product) {
      console.log("Product Added to Cart:", product.name);
    },
    showProductDetails(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
#body {
  font-family: Arial, sans-serif;
  background-color: #333;
  margin: 0;
}

header {
  background-color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
  align-items: center;
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

.container {
  max-width: 1200px;
  margin: 20px auto;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  text-align: left;
  margin-bottom: 20px;
  color: white;
}

.filters {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}

.tabs {
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
}

.tabs button {
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: white;
  border: 2px solid crimson;
  color: black;
  font-weight: bold;
  border-radius: 9999px;
  cursor: pointer;
}

.filter {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.filters button,
.filters select {
  margin-left: 10px;
  background-color: white;
  font-weight: bold;
  border: 2px solid crimson;
  border-radius: 10px;
  color: black;
  padding: 10px;
}

.products {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  transition: transform 0.5s ease;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  border: 2px solid crimson;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 23%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.product-card span {
  margin: left;
  font-size: 18px;
  padding-top: 10px;
  font-weight: bold;
}

.view-product {
  text-decoration: none;
  padding-top: 10px;
  color: crimson;
}

.product-image {
  height: auto;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

button {
  align-self: flex-end;
  background-color: crimson;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 9999px;
}

button:hover {
  background-color: black;
  color: white;
  border: 2px solid crimson;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 600px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  z-index: 1000;
}

.modal-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.modal-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #333;
  max-width: 60%;
}

.modal-left h2 {
  margin-bottom: 20px;
}
.modal-left span {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
}

.modal-left button {
  cursor: pointer;
  margin-top: 20px;
  align-self: flex-end;
}

.modal-left table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
}

.modal-left table td {
  padding: 8px;
  border: 1px solid crimson;
}

.modal-left table th {
  text-align: left;
  font-size: 25px;
}

.modal-left table td:first-child {
  font-weight: bold;
  width: 30%;
}

.modal-left table td:last-child {
  width: 70%;

}

.modal-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  height: fit-content;
  margin-top: 30px;
  flex: 1;
  max-width: 40%;
}

.modal-right img {
  width: 100%;
  max-width: 180px;
  height: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  margin-left: 100px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
}

.close:hover {
  color: red;
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