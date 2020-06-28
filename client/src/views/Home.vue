<template>
  <div class="home">
    <button @click="goToRoom('room1')">Room 1</button>
    <button @click="goToRoom('room2')">Room 2</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    goToRoom(key){
      console.log('Button')
      localStorage.setItem('roomKey', key)
      this.$router.push('/chat')
    }
  }
}
</script>
