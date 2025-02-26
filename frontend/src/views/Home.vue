<template>
    <div id="body">
        <header>
            <div class="navbar-left">
                <img src="/images/logo.png" alt="logo" id="logo" />
                <nav>
                    <router-link to="/home">Home</router-link>
                    <router-link to="/shop">Shop</router-link>
                    <router-link to="/articles">Articles</router-link>
                    <router-link to="/plans">Subscriptions</router-link>
                </nav>
            </div>

            <div class="navbar-right">
                <button class="search-icon"><i class="fa fa-search"></i></button>
                <button class="cart-icon"><i class="fa fa-shopping-cart"></i></button>
                <button class="login-btn" @click="Login">Log In</button>
            </div>
        </header>

        <div class="container">
            <div class="hero">
                <div class="hero-text">
                    <h1>Your Complete Fitness Solution</h1>
                    <p>All in one place.</p>
                    <button @click="Login">Shop Now</button>
                </div>
            </div>
            <h2>Categories</h2>
            <div class="categories">
                <div class="category" v-for="category in categories" :key="category.title">
                    <img :src="category.image" :alt="category.alt" />
                    <h2>{{ category.title }}</h2>
                    <p>{{ category.description }}</p>
                </div>
            </div>
            <h2>Featured Products</h2>
            <div class="featured-products">
                <div class="product" v-for="product in products" :key="product.title">
                    <img :src="product.image" alt="Product Image" />
                    <h3>{{ product.title }}</h3>
                    <p>{{ product.price }}</p>
                    <button>{{ product.buttonText }}</button>
                </div>
            </div>
            <h2>Meet Our Trainers</h2>
        </div>
        <div class="wrapper">
            <div class="card" v-for="trainer in trainers" :key="trainer.name">
                <router-link :to="trainer.link" target="_blank">
                    <img :src="trainer.image" :alt="trainer.name" />
                </router-link>

                <h3>{{ trainer.name }}</h3>
                <p>{{ trainer.specialty }}</p>
            </div>
        </div>

        <footer class="footer">
            <div class="footer-content">
                <div class="footer-section">
                    <h2>PrimeFit</h2>
                    <p>Your complete fitness solution for equipment, apparel, rentals, and training.</p>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
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
    name: "HomeView",
    data() {
        return {
            categories: [
                {
                    image: "/images/Categories/category-gym equipment.jpg",
                    alt: "Equipment Image",
                    title: "Gym Equipment",
                    description: "Professional-grade fitness equipment"
                },
                {
                    image: "/images/Categories/category-apparl.jpg",
                    alt: "Apparel Image",
                    title: "Gym Apparel",
                    description: "Performance workout clothing"
                },
                {
                    image: "/images/Categories/acccesories_category.jpg",
                    alt: "Rental Image",
                    title: "Accessories",
                    description: "There's something new every month"
                },
                {
                    image: "/images/C ategories/category-training.jpg",
                    alt: "Training Image",
                    title: "Personal Training",
                    description: "Expert fitness guidance"
                }
            ],
            products: [
                {
                    image: "/images/Featured/dumbell.png",
                    title: "Dumbbell",
                    price: "R200.00 / month",
                    buttonText: "Rent Now"
                },
                {
                    image: "/images/Featured/Spinning bike.png",
                    title: "Spinning Bike",
                    price: "R5000.00 / month",
                    buttonText: "Rent Now"
                },
                {
                    image: "/images/Featured/treadmill.png",
                    title: "Treadmill Monthly Rental",
                    price: "R99 / month",
                    buttonText: "Rent Now"
                },
                {
                    image: "/images/Featured/all in one trainer.png",
                    title: "Training Package (10 Sessions)",
                    price: "R1,000.00",
                    buttonText: "Book Now"
                }
            ],
            trainers: [
                {
                    image: "/images/Trainers/T1.jpeg",
                    name: "John Davis",
                    specialty: "Strength Training Specialist",
                    link: "trainers.html"
                },
                {
                    image: "/images/Trainers/T2.jpeg",
                    name: "Sarah Wilson",
                    specialty: "Cardio & HIIT Expert",
                    link: "trainers.html"
                },
                {
                    image: "/images/Trainers/T3.jpeg",
                    name: "Mike Johnson",
                    specialty: "Nutrition & Wellness Coach",
                    link: "trainers.html"
                }
            ]
        };
    },
    methods: {
        Login() {
            this.$router.push("/login");
        },
    }
};
</script>

<style scoped>
#body {
    font-family: Arial, sans-serif;
    background-color: #333;
    margin: 0;
    padding: 0;
}

h2 {
    margin-left: 40px;
    color: white;
}

header {
    background-color: #333;
    padding: 15px 30px;
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
    color: white;
    align-items: center;
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

.container {
    max-width: 1200px;
    margin: 20px auto;
    background-color: #333;
    border-radius: 8px;
}

.hero {
    width: 100%;
    height: 100vh;
    background-image: url("/public/images/Displays/home-hero.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: left;
    border: 2px solid crimson;
    object-fit: contain;
    color: white;
    border-radius: 20px;
    text-align: left;
}

.hero .hero-text {
    max-width: 50%;
    margin-left: 20px;
    text-align: left;
}

.hero h1 {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
}

.hero p {
    font-size: 1.2em;
    margin-top: 10px;
}

.hero button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: crimson;
    color: white;
    border-radius: 20px;
    border: none;
    cursor: pointer;
}

.categories,
.featured-products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    width: 100%;
    color: white;
    height: fit-content;
    padding: 20px;
    margin: 0 auto;
    clear: both;
}

.category {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    width: fit-content;
    margin-bottom: 70px;
    transition: transform 0.3s ease;
}

.product {
    background-color: #333;
    padding: 20px;
    border-radius: 5px;
    text-align: left;
    width: fit-content;
    height: fit-content;
    transition: transform 0.3s ease;
}

.category img,
.product img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    border: 2px solid crimson;
    object-fit: cover;
    display: block;
}

.wrapper {
    max-width: 1200px;
    margin: 20px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
}

.card {
    background: white;
    border-radius: 10px;
    margin: 20px;
    border: 2px solid crimson;
    text-align: center;
}

.card img {
    border-radius: 10px;
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    margin: 0 auto;
}

/* Lift effect on hover */
.category:hover,
.product:hover,
.card:hover {
    transform: translateY(10px);
}

.category img,
.product img {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    margin-bottom: 10px;
}

.product button {
    padding: 8px 15px;
    background-color: crimson;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    margin-top: 5px;
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
    color: crimson;
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