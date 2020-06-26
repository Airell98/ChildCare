import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: "",
    nannies: [],
    children: [],
    nannyDetail: {},
    childDetail: {},
    loginAs: "",
    wishlistOfNanny: []
  },
  mutations: {
    set_nannies(state, payload) {
      state.nannies = payload;
    },
    set_children(state, payload) {
      state.children = payload;
    },
    set_nannyDetail(state, payload) {
      state.nannyDetail = payload;
    },
    set_childDetail(state, payload) {
      state.childDetail = payload;
    },
    set_loginAs(state, payload) {
      state.loginAs = payload;
    },
    set_wishlistOfNanny(state, payload) {
      state.wishlistOfNanny = payload;
    }
  },
  actions: {
    get_nannies(context, payload) {
      Swal.fire({
        title: "Fetching Nannies Data",
        showConfirmButton: false,
        onOpen: () => {
          swal.showLoading();
        }
      });
      axios({
        method: "get",
        url: `${context.state.url}/nannies`
      })
        .then(response => {
          const datas = response.data;
          context.commit("set_nannies", datas);
          Swal.fire({
            icon: "success",
            title: "Loading completed",
            showConfirmButton: false,
            timer: 1000
          });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    get_children(context, payload) {
      Swal.fire({
        title: "Fetching Children Data",
        showConfirmButton: false,
        onOpen: () => {
          swal.showLoading();
        }
      });
      axios({
        method: "get",
        url: `${context.state.url}/children`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const datas = response.data;
          context.commit("set_children", datas);
          Swal.fire({
            icon: "success",
            title: "Loading completed",
            showConfirmButton: false,
            timer: 1000
          });
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  }
});
