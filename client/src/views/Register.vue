<template>
<div>

  <div class="wrapper">
    <form class="form-signin">       
      <h2 class="form-signin-heading">Register Sebagai</h2>
      <input type="text" class="form-control" name="username" placeholder="Email Address" v-model = 'email' />
      <br>
      <input type="password" class="form-control" name="password" placeholder="Password" v-model = 'password'/>      

      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>   
    </form>
  </div>

</div>
    
</template>

<script>
import Vuex from 'vuex'


export default {
    name:'Login',
    data(){
        return{
            email:'',
            password:'',
        };
    },
    methods:{
        
    },
    created(){
        console.log(this.$route.params)
    }
}
</script>

<style >

body {
	background: #eee;	
}

.wrapper {	
  margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 580px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.1);  
}

.form-signin-heading,
.checkbox {
    margin-bottom: 30px;
}

.checkbox {
    font-weight: normal;
}

.form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;
}


input[type="text"] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

input[type="password"] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}



</style>