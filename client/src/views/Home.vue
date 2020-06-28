<template>
  <div class="home">
      <div v-if="role === 'parent'">
        <ul v-for="(message, index) in messageStore" :key="index">
          <li> 
            <button @click="goToRoom(`${message.Parent.email}${message.Agency.email}`, message.Agency.id)">{{ message.Agency.name }}</button>
          </li>
        </ul>
      </div>
      <div v-if="role === 'agency'">
        <ul v-for="(message, index) in messageStore" :key="index">
          <li> 
            <button @click="goToRoom(`${message.Parent.email}${message.Agency.email}`, message.Parent.id)">{{ message.Parent.name }}</button>
          </li>
        </ul>
      </div>
    <!-- <button @click="goToRoom('room1')">Room 1</button>
    <button @click="goToRoom('room2')">Room 2</button> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    // goToRoom(key){
    //   console.log('Button')
    //   localStorage.setItem('roomKey', key)
    //   this.$router.push('/chat')
    // }
    goToRoom(key, id){
      localStorage.setItem('roomKey', key)
      this.$router.push('/chat/' + id)
    }
  },
  computed: {
    messageStore(){
      return this.$store.state.messages
    },
    role(){
      return localStorage.getItem('role')
    }
  },
  created(){
    this.$store.dispatch('getAllCorrespondingMsg')
  }
}
</script>
