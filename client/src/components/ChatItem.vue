<template>
  <div class="item-container" @click.prevent="goToRoom">
    <div
      class="image"
      :style="[{
        'background': `url(${picture || defaultPicture})`,
        'background-position': 'center center',
        'background-size': 'cover',}]"
    ></div>
    <div class="text">
      <div class="name">{{companionChat.toUpperCase()}}</div>
      <div class="message">
        <div class="lastest-msg">{{lastest}}</div>
        <div class="unread" v-if="unread > 0">{{unread}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatItem",
  props: ["message"],
  computed: {
    userId() {
      if (localStorage.loginAs === "parent") {
        return this.message.Agency.id;
      } else {
        return this.message.Parent.id;
      }
    },
    companionChat() {
      if (localStorage.loginAs === "parent") {
        return this.message.Agency.name;
      } else {
        return this.message.Parent.name;
      }
    },
    picture() {
      let imgUrl = "";
      const agencies = this.$store.state.agencies;
      for (let i = 0; i < agencies.length; i++) {
        if (agencies[i].name == this.message.Agency.name) {
          imgUrl = agencies[i].logoUrl;
          break;
        }
      }
      return imgUrl;
    },
    defaultPicture() {
      return "https://image.flaticon.com/icons/svg/848/848043.svg";
    },
    unread() {
      return this.message.unread > 0 ? this.message.unread : "";
    },
    lastest() {
      return this.message.content.length < 25
        ? this.message.content
        : this.message.content.slice(0, 24) + "...";
    }
  },
  methods: {
    goToRoom() {
      localStorage.setItem(
        "roomKey",
        `${this.message.Parent.email}${this.message.Agency.email}`
      );
      this.$router.push("/chat/" + this.userId);
      this.$store.dispatch("update_statusRead", this.userId);
    }
  }
};
</script>

<style scoped>
.item-container {
  cursor: pointer;
  display: flex;
  margin-bottom: 2rem;
}
.image {
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  margin-right: 1rem;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  width: 70%;
}
.name {
  font-size: 1.5rem;
  font-weight: 500;
}
.message {
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
}
.unread {
  font-weight: 500;
  background-color: #9a1750;
  border-radius: 100%;
  width: 1.5rem;
  height: 1.5rem;
  text-align: center;
  color: white;
}
</style>
