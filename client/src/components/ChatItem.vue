<template>
  <div
    class="name"
    @click.prevent="
      goToRoom(
        `${message.Parent.email}${message.Agency.email}`,
        message.Agency.id
      )
    "
  >
    <span>
      <img :src="picture" />
    </span>
    {{ `${message.Agency.name.toUpperCase()}` }}
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
  created() {
    this.$store.dispatch("get_agencies");
  },
  computed: {
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
    goToRoom(key, id) {
      localStorage.setItem("roomKey", key);
      console.log(id);
      this.$router.push("/chat/" + id);
      this.$store.dispatch("update_statusRead", id);
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
