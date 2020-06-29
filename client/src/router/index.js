<<<<<<< HEAD
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowDetailNanny from '../views/ShowDetailNanny.vue'
import Login from '../views/Login.vue'
import MyProfile from '../views/ShowDetailParent.vue'
=======
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard";
import Wishlist from "../views/Wishlist";
import About from "../views/About";
import Register from "../views/Register";
import Login from "../views/Login";
import NannyDetail from "../views/NannyDetail";
import AddNanny from "../views/AddNanny";
>>>>>>> ececd47d9bb742fe1e9b0c67ab2e3b30c74c3c03

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/parent/:id/wishlist",
    name: "Wishlist",
    component: Wishlist,
    beforeEnter(to, from, next) {
      if (localStorage.access_token) {
        next();
      } else {
        next({
          name: "Home"
        });
      }
    }
  },
  {
<<<<<<< HEAD
    path: '/nannyprofile',
    name :'ShowDetailNanny',
    component : ShowDetailNanny
  },
  {
    path: '/login',
    name :'Login',
    component : Login
  },
  {
    path: '/myprofile',
    name: '',
    component: MyProfile
=======
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/register/:user",
    name: "Register",
    props: true,
    component: Register,
    beforeEnter(to, from, next) {
      if (!localStorage.access_token) {
        next();
      } else {
        next({
          name: "Home"
        });
      }
    }
  },
  {
    path: "/register/nanny",
    name: "RegisterNanny",
    props: true,
    component: NannyDetail,
    beforeEnter(to, from, next) {
      if (!localStorage.access_token) {
        next();
      } else {
        next({
          name: "Home"
        });
      }
    }
  },
  {
    path: "/login/:user",
    name: "Login",
    props: true,
    component: Login,
    beforeEnter(to, from, next) {
      if (!localStorage.access_token) {
        next();
      } else {
        next({
          name: "Home"
        });
      }
    }
  },
  {
    path: "/nanny/:id",
    name: "NannyDetail",
    props: true,
    component: NannyDetail
  },
  {
    path: "/:user/:id",
    name: "Dashboard",
    component: Dashboard,
    props: true,
    beforeEnter(to, from, next) {
      if (localStorage.access_token) {
        next();
      } else {
        next({
          name: "Home"
        });
      }
    }
>>>>>>> ececd47d9bb742fe1e9b0c67ab2e3b30c74c3c03
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
