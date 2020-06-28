import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard";
import Wishlist from "../views/Wishlist";
import About from "../views/About";
import Register from "../views/Register";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/register/:user",
    name: "Register",
    component: Register
  },
  {
    path: "/login/:user",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
