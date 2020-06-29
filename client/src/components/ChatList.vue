<template>
  <div class="chat-box">
    <h3>Chat From</h3>
    <div class="chat-container">
      <ChatItem
        v-for="(message, index) in messageStore"
        :key="index"
        :message="message"
      ></ChatItem>
    </div>
  </div>
</template>

<script>
import ChatItem from "../components/ChatItem";
export default {
  name: "ChatList",
  components: {
    ChatItem
  },
  created() {
    this.$store.dispatch("getAllCorrespondingMsg");
  },
  computed: {
    messageStore() {
      return this.$store.state.messages;
    },
    role() {
      return localStorage.loginAs;
    }
  }
};
</script>

<style scoped>
.chat-box {
  width: 90%;
  height: fit-content;
  margin: 1rem auto;
  padding-top: 0.3rem;
  background-color: rgba(255, 255, 255, 0.432);
}
h3 {
  color: darkslategray;
  margin: 1rem 2rem;
}
.chat-container {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: 75%;
  height: 14rem;
  padding-bottom: 1rem;
  overflow-y: scroll;
}
.chat-container::-webkit-scrollbar {
  display: none;
}
</style>
