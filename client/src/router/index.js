import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard";
import Wishlist from "../views/Wishlist";
import About from "../views/About";
import Register from "../views/Register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard/:user",
    name: "Dashboard",
    component: Dashboard,
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
    path: "/parent/wishlist",
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
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
