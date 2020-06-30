<template>
  <div>
    <Navbar></Navbar>
    <div class="chat-body">
      <!-- <div id="roomKeyWindow" style="flex: 2">
      <h3>PARTNER ID</h3>
      <p>{{ partnerId }}</p>
      <button
        class="btn btn-lg btn-success btn-block"
        id="conn_button"
        type="submit"
        v-on:click="sendPeerId"
      >Send Video Link</button>

      <button
        class="btn btn-lg btn-danger btn-block"
        id="call_button"
        type="submit"
        v-on:click="callSomeone"
      >Call</button>

      <button
        class="btn btn-lg btn-danger btn-block"
        id="call_button"
        type="submit"
        v-on:click="endCall"
      >End Call</button>
      </div>-->

      <div style="background-color: black; flex: 7;">
        <video class="container-fluid" ref="rVideo" autoplay id="myVideo"></video>
        <h5>PARTNER ID : {{partnerId}}</h5>
        <div class="button-container">
          <b-button variant="warning" type="submit" v-on:click="sendPeerId">Send Video Link</b-button>
          <b-button variant="danger" style="width: 20%;" type="submit" v-on:click="callSomeone">Call</b-button>
          <b-button variant="danger" style="width: 20%;" type="submit" v-on:click="endCall">End Call</b-button>
        </div>
        <!-- <div style="display:flex;" class="content">
        <button
          v-on:click="mute"
          class="fas fa-microphone-alt-slash fa-3x"
          id="button"
          type="submit"
        ></button>
        <button v-on:click="unmute" class="fas fa-microphone fa-3x" id="button" type="submit"></button>
        </div>-->
      </div>

      <div id="chatWindow" style="flex: 2">
        <div style=" height:80vh; overflow-y:scroll;">
          <ul v-for="(message, index) in messages" :key="index" class="list-group list-group-flush">
            <li>
              <div v-if="message.sender == role" style="color:#34eb7d;" class="float-right">
                <p style="color: black;">{{ message.content }}</p>
              </div>
              <div v-else style="background-color:#fffffc;" class="float-left">
                <p style="color: black;">{{ message.content }}</p>
              </div>
            </li>
          </ul>
        </div>
        <input
          type="text"
          id="message"
          v-model="inputMessage"
          class="form-control"
          placeholder="Enter a message"
          required
        />

        <button
          v-on:click="addMessage"
          class="btn btn-lg btn-primary btn-block"
          id="button"
          type="submit"
        >Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
// const serverUrl = "https://websocket-joey.herokuapp.com";
const serverUrl = "http://localhost:3001";
const socket = io(serverUrl, {
  path: "/chat"
});
var peer = new Peer();
export default {
  name: "ChatBox",
  components: {
    Navbar
  },
  created() {
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    // this.insertLocalStorage();
    this.test();
    socket.emit("join-room", localStorage.getItem("roomKey"));
    this.startVideo();
    socket.on("sendMessage", msg => {
      let pesan = {
        content: msg.content,
        sender: msg.sender
      };
      this.messages.push(pesan);
      this.$store.dispatch("update_statusRead", this.$route.params.id);
    });
    socket.on("receive peerId", data => {
      this.partnerId = data.peerId;
      peer.connect(this.partnerId);
    });
    peer.on("call", call => {
      Swal.fire({
        title: "Do you want to answer the call?",
        text: "Press Yes to answer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then(result => {
        if (result.value) {
          this.startVideo();
          return Promise.all([this.startVideo()]).then(data => {
            call.answer(window.localstream);
            call.on("stream", stream => {
              window.peer_stream = stream;
              this.recStream2(stream);
            });
          });
        } else {
          socket.emit("reject phone call", {
            msg: "phone rejected",
            roomKey: localStorage.getItem("roomKey")
          });
        }
      });
    });
    socket.on("reject phone call", msg => {
      Swal.fire(msg);
    });
    socket.on("end call", data => {
      var video = this.$refs.rVideo;

      video.pause();
      video.src = "";
      video.autoplay = false;

      console.log(window.localstream.getTracks);
      localstream.getTracks().map(function(val) {
        val.stop();
      });
      window.localstream.getVideoTracks().forEach(el => {
        el.enabled = false;
      });
      window.localstream.getTracks().forEach(el => {
        el.enabled = false;
      });
    });
    peer.on("connection", () => {
      console.log("Other already connected");
    });
    peer.on("error", () => {
      // alert('Connection problem')
    });
    this.$store
      .dispatch("getAllMsg", this.$route.params.id)
      .then(resp => {
        this.messages = resp.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      inputMessage: "",
      messages: [],
      peerId: "",
      partnerId: "",
      peer_id: "",
      conn: "",
      connId: "",
      tempKey: ""
      // muted: "",
    };
  },
  computed: {
    role() {
      return localStorage.loginAs;
    }
  },
  methods: {
    callSomeone() {
      window.localstream.getVideoTracks().forEach(el => {
        el.enabled = true;
      });
      window.localstream.getTracks().forEach(el => {
        el.enabled = true;
      });
      let telpon = peer.call(this.partnerId, window.localstream);
      telpon.on("stream", Stream => {
        window.peer_stream = Stream;
        this.recStream2(Stream);
      });
    },
    startVideo() {
      this.getLVideo({
        success: stream => {
          window.localstream = stream;
          console.log(
            window.localstream.getTracks()[0],
            "this is the window localstream"
          );
          console.log(window.localstream, "this is the window localstream");
        },
        error: function(err) {
          console.log(err);
        }
      });
    },
    endCall() {
      console.log(navigator);

      var video = this.$refs.rVideo;

      video.pause();
      video.src = "";
      video.autoplay = false;

      console.log(window.localstream.getTracks);
      localstream.getTracks().map(function(val) {
        val.stop();
      });
      window.localstream.getVideoTracks().forEach(el => {
        el.enabled = false;
      });
      window.localstream.getTracks().forEach(el => {
        el.enabled = false;
      });
      socket.emit("end call", {
        msg: "close",
        roomKey: localStorage.getItem("roomKey")
      });
      this.startVideo();
    },
    unmute() {
      window.localstream.getAudioTracks()[0].enabled = true;
      localstream.getAudioTracks()[0].enabled = true;
    },
    mute() {
      window.localstream.getAudioTracks()[0].enabled = false;
      localstream.getAudioTracks()[0].enabled = false;
    },

    recStream2(stream) {
      var video = this.$refs.rVideo;
      video.srcObject = stream;
      window.peer_stream = stream;
      video.autoplay = true;
      // window.localstream.getVideoTracks().forEach(el => {
      //   el.enabled = true
      // });
      // window.localstream.getTracks().forEach(el => {
      //   el.enabled = true
      // });
    },
    addMessage() {
      let pesan = {
        content: this.inputMessage,
        sender: this.role,
        roomKey: localStorage.getItem("roomKey")
      };
      // socket.emit("sendUnreadMsg", localStorage.dashboardRoomKey);
      this.messages.push(pesan);
      this.$store
        .dispatch("messageDB", {
          content: this.inputMessage,
          sender: this.role,
          id: this.$route.params.id
        })
        .then(() => {
          socket.emit("sendMessage", pesan);
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
      this.inputMessage = "";
    },
    getLVideo(callbacks) {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      let constraints = {
        audio: true,
        video: true
      };
      navigator.getUserMedia(constraints, callbacks.success, callbacks.error);
    },
    test() {
      peer.on("open", peer => {
        console.log("Connected >>>", peer);
        this.peerId = peer;
      });
    },
    sendPeerId() {
      console.log("masuk sendPeerId", this.peerId);
      let data = {
        peerId: this.peerId,
        roomKey: localStorage.getItem("roomKey")
      };
      socket.emit("receive peerId", data);
    }
    // insertLocalStorage() {
    //   let email = "";
    //   for (let i = 0; i < this.messages.length; i++) {
    //     if (this.role == "parent") {
    //       email = this.messages[i].Agency.email;
    //       break;
    //     } else {
    //       email = this.messages[i].Parent.email;
    //       break;
    //     }
    //   }
    //   localStorage.setItem("partnerEmail", email);
    // }
  }
};
</script>

<style scoped>
.chat-body {
  background-color: #fffbfa;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  transform: translateY(3rem);
}
h5 {
  color: white;
  transform: translateY(-5rem);
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 40%;
  transform: translateY(-5rem);
}
li div {
  float: left;
  margin: 10px;
  padding: 6px;
  background-color: rgb(45, 201, 71);
  border: rgb(45, 201, 71);
  border-radius: 10px;
}
#myVideo {
  /* position: fixed; */
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
.content {
  position: fixed;
  justify-content: space-between;
  bottom: 0;
  background: rgb(253, 253, 253);
  /* color: #f1f1f1; */
  width: 50%;
  padding: 20px;
}
.list-group {
  list-style: none;
}
#roomKeyWindow {
  transform: translateY(10rem);
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
}
#chatWindow {
  padding-right: 5px;
  margin-left: 5px;
}
</style>
