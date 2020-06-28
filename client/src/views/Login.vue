<template>
  <div>
    <div class="wrapper">
      <form class="form-signin" @submit.prevent="loginUser">
        <h3 class="form-signin-heading">Login Sebagai {{ User }}</h3>
        <input type="text" class="form-control" placeholder="Email Address" v-model="email" />
        <br />
        <input type="password" class="form-control" placeholder="Password" v-model="password" />
        <button class="btn btn-lg btn-primary btn-block" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["user"],
  data() {
    return {
      email: "",
      password: "",
      User: ""
    };
  },
  created() {
    this.user === "parent" ? (this.User = "Orang Tua") : (this.User = "Agensi");
  },
  methods: {
    loginUser() {
      this.$store.dispatch("login_user", {
        user: this.user,
        data: {
          email: this.email,
          password: this.password
        }
      });
    }
  }
};
</script>

<style>
body {
  background: url("https://image.freepik.com/free-photo/woman-children-sitting-floor_23-2147663975.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #dfdddd;
}

.wrapper {
  margin: auto;
  transform: translateY(50%);
}

.form-signin {
  max-width: 580px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.form-signin-heading {
  margin-bottom: 30px;
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
