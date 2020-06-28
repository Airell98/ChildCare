import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    url: "http://localhost:3001",
    nannies: [],
    children: [],
    agencies: [],
    nannyDetail: {},
    childDetail: {},
    loginAs: "",
    wishlistOfNanny: [],
    parent: {},
    agency: {}
  },
  mutations: {
    set_nannies(state, payload) {
      state.nannies = payload;
    },
    set_children(state, payload) {
      state.children = payload;
    },
    set_agencies(state, payload) {
      state.agencies = payload;
    },
    set_parent(state, payload) {
      state.parent = payload;
    },
    set_agency(state, payload) {
      state.agency = payload;
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
        url: `${context.state.url}/nanny`
      })
        .then(response => {
          const datas = response.data;
          console.log(datas);
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
    get_agencies(context, payload) {
      Swal.fire({
        title: "Fetching Agencies Data",
        showConfirmButton: false,
        onOpen: () => {
          swal.showLoading();
        }
      });
      axios({
        method: "get",
        url: `${context.state.url}/agency`
      })
        .then(response => {
          const datas = response.data;
          console.log(datas);
          context.commit("set_agencies", datas);
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
        url: `${context.state.url}/child`
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
    },
    get_nanny(context, payload) {
      axios({
        method: "get",
        url: `${context.state.url}/nanny/${payload.id}`
      })
        .then(response => {
          const { data } = response;
          context.commit("set_nannyDetail", data);
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
    get_child(context, payload) {
      axios({
        method: "get",
        url: `${context.state.url}/child/${payload.id}`
      })
        .then(response => {
          const { data } = response;
          context.commit("set_childDetail", data);
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
    register_user(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/${payload.user}/register`,
        data: payload.data
      })
        .then(response => {
          const { data } = response;
          context.dispatch("login_agency", payload);
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
    login_user(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/${payload.user}/register`,
        data: payload.data
      })
        .then(response => {
          const { access_token, user } = response.data;
          const userData = JSON.stringify(user);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("loginAs", payload.user);
          localStorage.setItem("user", userData);
          payload.user === "parent"
            ? context.commit("set_parent", user)
            : context.commit("set_agency", user);
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
    register_nanny(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/nanny/register`,
        data: payload
      })
        .then(response => {
          const { data } = response;
          context.state.nannies.push(data);
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
    add_nanny(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/nanny`,
        data: payload
      })
        .then(response => {
          const { data } = response;
          context.state.nannies.push(data);
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
    add_child(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/child`,
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const { data } = response;
          context.state.children.push(data);
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
