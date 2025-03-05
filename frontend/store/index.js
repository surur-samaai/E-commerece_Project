import {createStore} from 'vuex'
import  axios  from 'axios'

export default createStore({
    state: {
        users: null,
        articles: null,
        store: null,
        admin: null,
        personalTrainers: null,
        bookings: null,
        locations: null,
        orderItems: null,
        orders: null,
        subscriptions: null,
        workoutVideos: null

    },
    getters: {
        
    },
    mutations: {
        setUsers(state, users){
            state.users = users
          },
        setArticles(state, articles){
            state.articles = articles
          },
        setStore(state, store){
            state.store = store
          },
        setAdmin(state, admin){
            state.admin = admin
          },
        setPersonalTrainers(state, personalTrainers){
            state.personalTrainers = personalTrainers
          },
        setBookings(state, bookings){
            state.bookings = bookings
          },
        setLocations(state, locations){
            state.locations = locations
          },
        setOrderItems(state, orderItems){
            state.orderItems = orderItems
          },
        setOrders(state, orders){
            state.orders = orders
          },
        setSubscriptions(state, subscriptions){
            state.subscriptions = subscriptions
          },
        setWorkoutVideos(state, workoutVideos){
            state.workoutVideos = workoutVideos
          },
    },
    actions: {
 //make function to fetch data
 async getUsers(context) { 
  try {
      // Using axios.get to fetch users data from backend
      const response = await axios.get('http://localhost:3000/users');
      // axios automatically parses the JSON response
      const usersData = response.data;
      console.log("Users from backend:", usersData);
      // Commit the mutation to set the 'store' state with the fetched users data
      context.commit('setStore', usersData);
  } catch (error) {
      console.error('Error fetching users:', error);
  }
},

  async getUserById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/users/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setUsers',info)
  }catch(error){
        console.error('Error getting User:', error);
  }
  },
  //1
  async deleteUser(context, payload){
   try{
    await fetch('http://localhost:3000/users/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting User:', error)
}
  },
  async addUser(context, payload){
    try{
    await fetch('http://localhost:3000/users/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding User:', error)
    }
  },    
  async updateUser(context, payload){
try{
    await fetch('http://localhost:3000/users/'+ payload.user_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating User:', error)
}
  },
  async getArticles(context) { 
    try {
        const response = await axios.get('http://localhost:3000/articles');
        const articlesData = response.data;
        console.log("Articles from backend:", articlesData);
        context.commit('setStore', articlesData);
    } catch (error) {
        console.error('Error fetching Articles:', error);
    }
},

  async getArticleById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/articles/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setArticles',info)
  }catch(error){
        console.error('Error getting Article:', error);
  }
  },
  //1
  async deleteArticle(context, payload){
   try{
    await fetch('http://localhost:3000/articles/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Article:', error)
}
  },
  async addArticle(context, payload){
    try{
    await fetch('http://localhost:3000/articles/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding article:', error)
    }
  },    
  async updateArticle(context, payload){
try{
    await fetch('http://localhost:3000/articles/'+ payload.article_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Article:', error)
}
  },

  async getProducts(context) { 
    try {
        // Using axios.get to fetch product data from backend
        const response = await axios.get('http://localhost:3000/store');
        // axios automatically parses the JSON response
        const productsData = response.data;
        console.log("Products from backend:", productsData);
        // Commit the mutation to set the 'store' state with the fetched product data
        context.commit('setStore', productsData);
    } catch (error) {
        console.error('Error fetching products from the Store:', error);
    }
},

  async getProductById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/store/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setStore',info)
  }catch(error){
        console.error('Error getting product from the Store:', error);
  }
  },
  //1
  async deleteProduct(context, payload){
   try{
    await fetch('http://localhost:3000/store/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting product from the Store:', error)
}
  },
  async addProduct(context, payload){
    try{
    await fetch('http://localhost:3000/store/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding product to the Store:', error)
    }
  },    
  async updateProduct(context, payload){
try{
    await fetch('http://localhost:3000/store/'+ payload.product_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating product in Store:', error)
}
  },
  async getAdmin(context) {
    try {
        const response = await axios.get('http://localhost:3000/admin');
        const adminData = response.data;
        console.log("Admin from backend:", adminData);
        context.commit('setAdmin', adminData);
    } catch (error) {
        console.error('Error fetching Admin:', error);
    }
},

  async getAdminById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/admin/'+payload)
        let info = await  data.json()
        console.log(info)
        context.commit('setAdmin',info)
  }catch(error){
        console.error('Error getting Admin:', error);
  }
  },

  async deleteAdmin(context, payload){
   try{
    await fetch('http://localhost:3000/admin/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Admin:', error)
}
  },
  async addAdmin(context, payload){
    try{
    await fetch('http://localhost:3000/admin/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding Admin:', error)
    }
  },    
  async updateAdmin(context, payload){
try{
    await fetch('http://localhost:3000/store/'+ payload.admin_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Admin:', error)
}
  },
  async getPersonalTrainers(context) {
    try {
        const response = await axios.get('http://localhost:3000/personalTrainers');
        const trainersData = response.data;
        console.log("Trainers from backend:", trainersData);
        context.commit('setPersonalTrainers', trainersData);
    } catch (error) {
        console.error('Error fetching Personal Trainers:', error);
    }
},

  async getPersonalTrainerById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/personalTrainers/'+payload)
        let info = await  data.json()
        console.log(info)
        context.commit('setPersonalTrainers',info)
  }catch(error){
        console.error('Error getting Personal Trainer:', error);
  }
  },
  async deletePersonalTrainer(context, payload){
   try{
    await fetch('http://localhost:3000/personalTrainers/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Personal Trainer:', error)
}
  },
  async addPersonalTrainer(context, payload){
    try{
    await fetch('http://localhost:3000/personalTrainers/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding Personal Trainer:', error)
    }
  },    
  async updatePersonalTrainer(context, payload){
try{
    await fetch('http://localhost:3000/personalTrainers/'+ payload.trainer_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Personal Trainer:', error)
}
  },

  async getBookings(context) {
    try {
        const response = await axios.get('http://localhost:3000/bookings');
        const bookingData = response.data;
        console.log("Bookings from backend:", bookingData);
        context.commit('setBookings', bookingData);
    } catch (error) {
        console.error('Error fetching Personal Trainers:', error);
    }
},

  async getBookingById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/bookings/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setBookings',info)
  }catch(error){
        console.error('Error getting Booking:', error);
  }
  },
  //1
  async deleteBooking(context, payload){
   try{
    await fetch('http://localhost:3000/bookings/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting booking:', error)
}
  },
  async addBooking(context, payload){
    try{
    await fetch('http://localhost:3000/bookings/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding booking:', error)
    }
  },    
  async updateBooking(context, payload){
try{
    await fetch('http://localhost:3000/bookings/'+ payload.booking_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Booking:', error)
}
  },

  async getLocation(context) {
    try {
        const response = await axios.get('http://localhost:3000/locations');
        const locationData = response.data;
        console.log("Locations from backend:", locationData);
        context.commit('setLocations', locationData);
    } catch (error) {
        console.error('Error fetching Locations:', error);
    }
},

  async getLocationById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/locations/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setLocations',info)
  }catch(error){
        console.error('Error getting Locations:', error);
  }
  },
  //1
  async deleteLocation(context, payload){
   try{
    await fetch('http://localhost:3000/locations/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting location:', error)
}
  },
  async addLocation(context, payload){
    try{
    await fetch('http://localhost:3000/locations/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding location:', error)
    }
  },    
  async updateLocation(context, payload){
try{
    await fetch('http://localhost:3000/locations/'+ payload.location_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating location:', error)
}
  },

  async getOrderItems(context) {
    try {
        const response = await axios.get('http://localhost:3000/orderItems');
        const orderItemsData = response.data;
        console.log("Order Items from backend:", orderItemsData);
        context.commit('setOrderItems', orderItemsData);
    } catch (error) {
        console.error('Error fetching Order Items:', error);
    }
},

  async getOrderItemsById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/orderItems/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setOrderItems',info)
  }catch(error){
        console.error('Error getting Order Item:', error);
  }
  },
  //1
  async deleteOrderItem(context, payload){
   try{
    await fetch('http://localhost:3000/orderItems/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Order Item:', error)
}
  },
  async addOrderItem(context, payload){
    try{
    await fetch('http://localhost:3000/orderItems/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding Order Item:', error)
    }
  },    
  async updateOrderItem(context, payload){
try{
    await fetch('http://localhost:3000/orderItems/'+ payload.order_item_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Order Item:', error)
}
  },

  async getOrders(context) {
    try {
        const response = await axios.get('http://localhost:3000/orders');
        const orderData = response.data;
        console.log("Orders from backend:", orderData);
        context.commit('setOrders', orderData);
    } catch (error) {
        console.error('Error fetching Orders:', error);
    }
},

  async getOrderById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/orders/'+payload)
        let info = await  data.json()
        //2 
        console.log(info)
        //3.3 //name of mutation, actual data from api
        context.commit('setOrders',info)
  }catch(error){
        console.error('Error getting Order:', error);
  }
  },
  //1
  async deleteOrder(context, payload){
   try{
    await fetch('http://localhost:3000/orders/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Order:', error)
}
  },
  async addOrder(context, payload){
    try{
    await fetch('http://localhost:3000/order/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding Order:', error)
    }
  },    
  async updateOrder(context, payload){
try{
    await fetch('http://localhost:3000/order/'+ payload.order_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Order:', error)
}
  },

  async getSubscriptions(context) {
    try {
        const response = await axios.get('http://localhost:3000/subscription');
        const subscriptionData = response.data;
        console.log("Subscriptions from backend:", subscriptionData);
        context.commit('setSubscriptions', subscriptionData);
    } catch (error) {
        console.error('Error fetching Subscriptions:', error);
    }
},

  async getSubscriptionById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/subscription/'+payload)
        let info = await  data.json()
        console.log(info)
        context.commit('setSubscriptions',info)
  }catch(error){
        console.error('Error getting Subscription:', error);
  }
  },

  async deleteSubscription(context, payload){
   try{
    await fetch('http://localhost:3000/subscription/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Subscription:', error)
}
  },
  async addSubscription(context, payload){
    try{
    await fetch('http://localhost:3000/subscription/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding Subscription:', error)
    }
  },    
  async updateSubscription(context, payload){
try{
    await fetch('http://localhost:3000/subscription/'+ payload.subscription_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Subscription:', error)
}
  },

  async getWorkoutVideos(context) {
    try {
        const response = await axios.get('http://localhost:3000/workoutVideos');
        const workoutVideosData = response.data;
        console.log("Workouts from backend:", workoutVideosData);
        context.commit('setWorkoutVideos', workoutVideosData);
    } catch (error) {
        console.error('Error fetching Workout Videos:', error);
    }
},

  async getWorkoutVideoById(context, payload){
    try{
        let data = await  fetch('http://localhost:3000/workoutVideos/'+payload)
        let info = await  data.json()
        console.log(info)
        context.commit('setWorkoutVideos',info)
  }catch(error){
        console.error('Error getting Workout Videos:', error);
  }
  },

  async deleteWorkoutVideo(context, payload){
   try{
    await fetch('http://localhost:3000/workoutVideos/'+ payload,{
      method:'DELETE'
    })
    location.reload()
} catch (error){
    console.error('Error while deleting Workout Video:', error)
}
  },
  async addWorkoutVideo(context, payload){
    try{
    await fetch('http://localhost:3000/workoutVideos/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
    } catch (error){
        console.error('Error while adding Workout Videos:', error)
    }
  },    
  async updateWorkoutVideo(context, payload){
try{
    await fetch('http://localhost:3000/workoutVideos/'+ payload.video_id,{
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload)
    })
    location.reload()
} catch(error){
    console.error('Error while updating Workout Video:', error)
}
  },


},
modules: {
   
}
})
