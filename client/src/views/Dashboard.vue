<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="body">
      <div class="left">
        <div v-if="user === 'parent'">
          <div class="button-container">
            <div
              class="Button"
              v-if="loginAs == 'parent' && id == userLocal.id"
              @click.prevent="addChild"
            >
              Add Child
              <AddChildModal></AddChildModal>
            </div>
            <div class="Button" @click="gotoWishlist">Wishlist</div>
          </div>
          <ParentProfile :parent="userData"></ParentProfile>
        </div>
        <div v-if="user === 'agency'">
          <div
            class="Button"
            v-if="loginAs == 'agency' && id ==  userLocal.id"
            @click.prevent="addNanny"
          >
            Add Nanny
            <AddNannyModal :title="'addNanny'"></AddNannyModal>
          </div>
          <AgencyProfile :agency="userData"></AgencyProfile>
        </div>
        <ChatList></ChatList>
      </div>
      <div class="right">
        <div class="title" v-if="user === 'parent'">Children List</div>
        <div class="title" v-if="user === 'agency'">Nanny List</div>
        <div class="card-container">
          <Card v-for="nanny in cardDatas" :key="nanny.id" :data="nanny" :entityName="entityName"></Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import ParentProfile from "../components/ParentProfile";
import AgencyProfile from "../components/AgencyProfile";
import ChatList from "../components/ChatList";
import AddNannyModal from "../components/AddNannyModal";
import AddChildModal from "../components/AddChildModal";
import io from "socket.io-client";
const serverUrl = "http://localhost:3001";
const socket = io(serverUrl, {
  path: "/chat"
});

export default {
  name: "Home",
  components: {
    Navbar,
    Card,
    ParentProfile,
    AgencyProfile,
    ChatList,
    AddNannyModal,
    AddChildModal
  },
  data() {
    return {
      entityName: null
    };
  },
  props: ["user", "id"],
  created() {
    this.$store.dispatch("getAllCorrespondingMsg");
    if (localStorage.loginAs == "agency") {
      if (this.user === "agency") {
        this.$store.dispatch("get_agencyById", this.id);
        this.$store.dispatch("get_nannyByAgency");
        this.id == this.userLocal.id
          ? this.$store.commit("set_agency", this.userLocal)
          : null;
        this.entityName = "nanny";
      } else {
        this.$store.dispatch("get_parentById", this.id);
        this.$store.dispatch("get_children");
        this.entityName = "child";
      }
    }
    socket.emit(
      "settingRoomDashboardUnread",
      JSON.parse(localStorage.getItem("user")).email
    );
    socket.on("fetchingClientMsg", () => {
      this.$store.dispatch("getAllCorrespondingMsg");
    });
    if (localStorage.loginAs == "agency") {
      if (this.user === "agency") {
        this.$store.dispatch("get_agencyById", this.id);
        this.$store.dispatch("get_nannyByAgency");
        this.id == this.userLocal.id
          ? this.$store.commit("set_agency", this.userLocal)
          : null;
      } else {
        this.$store.dispatch("get_parentById", this.id);
      }
    }
    if (localStorage.loginAs == "parent") {
      if (this.user === "agency") {
        this.$store.dispatch("get_agencyById", this.id);
      } else {
        this.$store.dispatch("get_parentById", this.id);
        this.id == this.userLocal.id
          ? this.$store.commit("set_parent", this.userLocal)
          : null;
      }
    }
  },
  computed: {
    userData() {
      let user = null;
      this.user === "agency"
        ? (user = this.$store.state.agency)
        : (user = this.$store.state.parent);
      return user;
    },
    loginAs() {
      return localStorage.loginAs;
    },
    userLocal() {
      return JSON.parse(localStorage.user);
    },
    cardDatas() {
      if (this.user == "agency" && this.id == this.userLocal.id) {
        return this.$store.state.nannyByAgency;
      } else if (this.user == "parent" && this.id == this.userLocal.id) {
        return this.$store.state.children.filter(child => {
          return child.ParentId == this.id;
        });
      }
    }
  },
  methods: {
    addNanny() {
      this.$bvModal.show("modalAddNanny");
    },
    addChild() {
      this.$bvModal.show("modalAddChild");
    },
    gotoWishlist() {
      this.$router.push({ name: "Wishlist", params: { id: this.id } });
    },
    insertLocalStorage() {
      let email = "";
      for (let i = 0; i < this.$store.state.messages.length; i++) {
        if (this.loginAs == "parent") {
          email = this.$store.state.messages[i].Agency.email;
          break;
        } else {
          email = this.$store.state.messages[i].Parent.email;
          break;
        }
      }
      localStorage.setItem("partnerEmail", email);
      let emailForKey = "";
      if (this.loginAs == "parent") {
        emailForKey = `${localStorage.partnerEmail}${localStorage.roomHome}forHome`;
      } else {
        emailForKey = `${localStorage.roomHome}${localStorage.partnerEmail}forHome`;
      }
      let roomKey = emailForKey;
      socket.emit("joinUnreadRoom", roomKey);
      localStorage.setItem("dashboardRoomKey", roomKey);
    }
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}
.body {
  display: grid;
  grid-template-columns: 2fr 5fr;
  transform: translateY(4rem);
}
.title {
  color: darkslategray;
  background-color: rgba(255, 255, 255, 0.719);
  border-radius: 10px;
  font-size: 2rem;
  font-weight: 500;
  padding: 0px 1rem;
  margin: 3rem;
  margin-bottom: 0px;
  text-align: center;
}
.card-container {
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.left {
  display: flex;
  flex-direction: column;
}
.button-container {
  display: flex;
}
.Button {
  width: 40%;
  font-size: 2rem;
  font-weight: 600;
  padding: 0px 1rem;
  margin: 3rem auto;
  background-color: rgba(255, 255, 255, 0.849);
  padding: 0.2rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  color: rgb(60, 129, 129);
  cursor: pointer;
  transition: ease 370ms;
}
.Button:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(33, 70, 70);
}
.right {
  height: 160vh;
  overflow-y: scroll;
}
.right::-webkit-scrollbar {
  display: none;
}
</style>
