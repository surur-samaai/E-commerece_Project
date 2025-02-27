import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Articles from '../views/Articles.vue';
import Booking from '../views/Booking.vue';
import Cart from '../views/Cart.vue';
import Shop from '../views/Shop.vue';
import Payment from '../views/Payment.vue';
import Plans from '../views/Plans.vue';
import Products from '../views/Products.vue';
import Trainers from '../views/Trainers.vue';
import Tutorials from '../views/Tutorials.vue';

const routes = [
  { path: '/',
    name:Home, 
    component: Home
   },
  { path: '/login', 
    name:Login,
    component: Login 
  },
  { path: '/articles', 
    name:Articles,
    component: Articles 
  },
  { path: '/booking', 
    name:Booking,
    component: Booking 
  },
  { path: '/shop', 
    name:Shop,
    component: Shop 
  },
  { path: '/cart', 
    name:Cart,
    component: Cart 
  },
  { path: '/payment', 
    name:Payment,
    component: Payment 
  },
  { path: '/plans', 
    name:Plans,
    component: Plans 
  },
  { path: '/products', 
    name:Products,
    component: Products 
  },
  { path: '/trainers', 
    name:Trainers,
    component: Trainers 
  },
  { path: '/tutorials', 
    name:Tutorials,
    component: Tutorials 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;