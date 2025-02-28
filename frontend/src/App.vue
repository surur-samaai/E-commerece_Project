<template>
  <router-view /> 
</template>

<script>
import router from './router/index.js'; 

export default {
  name: 'App',
  router
}
</script>

<style>
/* Reset some default styles */
* {
    margin: 0;
    padding: 0;
}

</style>



