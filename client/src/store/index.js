import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    url: "https://supernannywebcam.herokuapp.com",
    nannies: [],
    children: [],
    agencies: [],
    nannyDetail: {},
    childDetail: {},
    login: false,
    wishlistOfNanny: [],
    parent: {},
    agency: {},
    nannyByAgency: []
  },
  mutations: {
    setMessages(state, payload) {
      state.messages = payload;
    },
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
      console.log(payload);
    },
    set_childDetail(state, payload) {
      state.childDetail = payload;
    },
    set_login(state, payload) {
      state.login = payload;
    },
    set_wishlistOfNanny(state, payload) {
      state.wishlistOfNanny = payload;
    },
    set_nannyByAgency(state, payload) {
      state.nannyByAgency = payload;
    }
  },
  actions: {
    getAllCorrespondingMsg(context) {
      const role = localStorage.loginAs;
      if (role === "parent") {
        axios({
          method: "GET",
          url: "https://supernannywebcam.herokuapp.com/message/parent",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(response => {
            context.commit("setMessages", response.data);
          })
          .catch(err => {
            console.log(err);
          });
      } else if (role === "agency") {
        axios({
          method: "GET",
          url: "https://supernannywebcam.herokuapp.com/message/agency",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
          .then(response => {
            context.commit("setMessages", response.data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    getAllMsg(context, id) {
      const role = localStorage.loginAs;
      if (role === "parent") {
        return axios({
          method: "GET",
          url: "https://supernannywebcam.herokuapp.com/message/parent/" + id,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
      } else if (role === "agency") {
        return axios({
          method: "GET",
          url: "https://supernannywebcam.herokuapp.com/message/agency/" + id,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        });
      }
    },
    messageDB(context, payload) {
      const role = localStorage.loginAs;
      if (role === "parent") {
        return axios({
          method: "POST",
          url: "https://supernannywebcam.herokuapp.com/message/parent/" + payload.id,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            content: payload.content,
            sender: payload.sender
          }
        });
      } else if (role === "agency") {
        return axios({
          method: "POST",
          url: "https://supernannywebcam.herokuapp.com/message/agency/" + payload.id,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            content: payload.content,
            sender: payload.sender
          }
        });
      }
    },
    get_nannies(context, payload) {
      Swal.fire({
        title: "Fetching Nannies Data",
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
        }
      });
      axios({
        method: "get",
        url: `${context.state.url}/nanny`
      })
        .then(response => {
          console.log(response);
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
    slideNannyCardToTheRight(context,payload){
      console.log(payload)
      axios({
        method: "get",
        url: `${context.state.url}/nanny/kanan/${payload}`
      })
      .then((response)=>{
        context.commit("set_nannyDetail", response.data.nanny);
        router.push(`/nanny/${response.data.nanny.id}`)
      }).catch(err=>{
        Swal.fire(err)
      })
    },
    slideNannyCardToTheLeft(context,payload){
      axios({
        method: "get",
        url: `${context.state.url}/nanny/kiri/${payload}`
      })
      .then((response)=>{
        context.commit("set_nannyDetail", response.data.nanny);
        router.push(`/nanny/${response.data.nanny.id}`)
      }).catch(err=>{
        Swal.fire(err)
      })
    },
    get_agencies(context, payload) {
      Swal.fire({
        title: "Fetching Agencies Data",
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
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
          Swal.showLoading();
        }
      });
      axios({
        method: "get",
        url: `${context.state.url}/child`
      })
        .then(response => {
          const datas = response.data;
          console.log(datas);
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
      console.log("masuk get nanny");
      axios({
        method: "get",
        url: `${context.state.url}/nanny/${payload}`
      })
        .then(response => {
          const { data } = response;
          context.commit("set_nannyDetail", data);
          console.log(data);
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
          context.dispatch("login_user", payload);
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
      const { user, data } = payload;
      axios({
        method: "post",
        url: `${context.state.url}/${user}/login`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then(response => {
          console.log(response);
          const { access_token, user } = response.data;
          const userData = JSON.stringify(user);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("loginAs", payload.user);
          localStorage.setItem("user", userData);
          context.commit("set_login", true);
          if (payload.user === "parent") {
            context.commit("set_parent", user);
            router.push({
              name: "Dashboard",
              params: { user: "parent", id: user.id }
            });
          } else {
            context.commit("set_agency", user);
            router.push({
              name: "Dashboard",
              params: { user: "agency", id: user.id }
            });
          }
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
      console.log(payload);
      axios({
        method: "post",
        url: `${context.state.url}/nanny`,
        data: payload,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const { data } = response;
          context.state.nannies.push(data);
          context.state.nannyByAgency.push(data);
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
    },
    get_allWishlist(context, payload) {
      axios({
        method: "get",
        url: `${context.state.url}/wishlist`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const { data } = response;
          context.commit("set_wishlistOfNanny", data);
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
    addToWishList(context, payload) {
      axios({
        method: "post",
        url: `${context.state.url}/wishlist/add/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const { data } = response;
          console.log(data);
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
    deleteFromWishlist(context, payload) {
      axios({
        method: "delete",
        url: `${context.state.url}/wishlist/delete/${payload}`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const { data } = response;
          context.state.wishlistOfNanny = context.state.wishlistOfNanny.filter(
            nanny => {
              return nanny.id != payload;
            }
          );
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
    get_parentById(context, payload) {
      axios({
        method: "get",
        url: `${context.state.url}/parent/${payload}`
      })
        .then(response => {
          const { data } = response;
          context.commit("set_parent", data);
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
    get_agencyById(context, payload) {
      axios({
        method: "get",
        url: `${context.state.url}/agency/${payload}`
      })
        .then(response => {
          const { data } = response;
          context.commit("set_agency", data);
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
    get_nannyByAgency(context, payload) {
      axios({
        method: "get",
        url: `${context.state.url}/nanny/showAssociateNanny`,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          const { data } = response;
          context.commit("set_nannyByAgency", data);
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
    update_statusRead(context, payload) {
      let url = "";
      if (localStorage.loginAs == "agency") {
        url = `https://supernannywebcam.herokuapp.com/message/read/agency/${payload}`;
      } else {
        url = `hhttps://supernannywebcam.herokuapp.com/message/read/parent/${payload}`;
      }
      axios({
        method: "put",
        url: url,
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(response => {
          console.log(response);
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
    editNanny(context, payload) {
      axios({
        method: "put",
        url: `${context.state.url}/nanny/${payload.id}`,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload.data
      })
        .then(response => {
          context.state.nannies = context.state.nannies.filter(nanny => {
            return nanny.id != payload.id;
          });
          payload.data.id = payload.id;
          context.state.nannies.push(payload.data);
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
