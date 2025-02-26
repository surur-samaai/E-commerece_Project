import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Articles from '../views/Articles.vue';
import Booking from '../views/Booking.vue';
import Shop from '../views/Shop.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;