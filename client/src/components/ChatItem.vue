<template>
  <div class="name" @click.prevent="goToRoom">
    <span>
      <img :src="picture" />
    </span>
    {{ companionChat.toUpperCase() }}
    <p>
      {{ message.content }}
      <span v-if="message.unread">{{ message.unread }}</span>
    </p>
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
    }
  },
  methods: {
    // goToRoom(key){
    //   console.log('Button')
    //   localStorage.setItem('roomKey', key)
    //   this.$router.push('/chat')
    // }
    goToRoom() {
      localStorage.setItem(
        "roomKey",
        `${this.message.Parent.email}${this.message.Agency.email}`
      );
      this.$router.push("/chat/" + this.userId);
      // this.$store.dispatch("update_statusRead", this.userId);
    }
  }
};
</script>

<style scoped>
.name {
  cursor: pointer;
  font-size: 1.5rem;
  margin: 4px;
  font-weight: 500;
  color: darkslategray;
}
img {
  border-radius: 100%;
  width: 2rem;
}
.name:hover {
  color: rgb(27, 68, 68);
}
p {
  font-size: 1rem;
}
</style>
