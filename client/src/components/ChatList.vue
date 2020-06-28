<template>
  <div class="chat-box">
    <h3>Chat List</h3>
    <div class="chat-container">
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
      <ChatItem></ChatItem>
    </div>
  </div>
</template>

<script>
import ChatItem from "../components/ChatItem";
export default {
  name: "ChatList",
  components: {
    ChatItem
  }
};
</script>

<style scoped>
.chat-box {
  width: 90%;
  height: fit-content;
  margin: 1rem auto;
  padding-top: 0.3rem;
  background-color: rgba(137, 139, 139, 0.205);
  border-radius: 1rem;
}
h3 {
  text-align: center;
  color: darkslategray;
  margin: 1rem;
}
.chat-container {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  width: 70%;
  height: 20rem;
  padding-bottom: 1rem;
  overflow-y: scroll;
}
.chat-container::-webkit-scrollbar {
  display: none;
}
</style>
