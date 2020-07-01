<template>
  <div class="chat-box">
    <div class="text">Chats</div>
    <div class="chat-container">
      <ChatItem v-for="(message, index) in messageStore" :key="index" :message="message"></ChatItem>
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
    this.$store.dispatch("get_agencies");
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
  margin: 5rem auto;
  background-color: white;
  border-radius: 1rem;
}
.text {
  font-family: "Playfair Display", serif;
  letter-spacing: 2px;
  background-color: #9a1750;
  border-radius: 1rem 1rem 0 0;
  color: #ffffff;
  font-size: 2.4rem;
  padding: 0 4%;
}
.chat-container {
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  width: 90%;
  height: 20rem;
  padding-bottom: 1rem;
  overflow-y: scroll;
}
.chat-container::-webkit-scrollbar {
  display: none;
}
</style>
