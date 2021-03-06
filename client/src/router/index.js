import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard";
import Wishlist from "../views/Wishlist";
import About from "../views/About";
import Register from "../views/Register";
import Login from "../views/Login";
import NannyDetail from "../views/NannyDetail";
import Chat from "../views/ChatBox.vue";
import Edit from "../views/Edit";
import ThankyouPage from "../views/ThankyouPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/thankyou",
    name: "Thank You",
    component: ThankyouPage
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
    path: "/chat/:id",
    name: "Chat",
    component: Chat
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
  },
  {
    path: "/:user/:id/edit",
    name: "Edit User",
    component: Edit,
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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
