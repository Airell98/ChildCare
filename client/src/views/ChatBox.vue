<template>
  <div>
    <Navbar></Navbar>
    <div class="chat-body">
      <div style="background-color: black; flex: 7;">
        <video height="1" ref="rVideo" autoplay id="myVideo"></video>
        <div class="ui">
          <h5>PARTNER ID : {{ partnerId }}</h5>
          <div class="button-container">
            <div class="button share" v-on:click="sendPeerId">
              <img src="https://image.flaticon.com/icons/svg/1828/1828956.svg" alt />
            </div>
            <div class="button call" v-on:click="callSomeone">
              <img src="https://image.flaticon.com/icons/svg/2947/2947981.svg" alt />
            </div>
            <div class="button end-call" v-on:click="endCall">
              <img src="https://image.flaticon.com/icons/svg/481/481305.svg" alt />
            </div>
            <div v-if="!volumeCondition" class="button mute" @click.prevent="mute">
              <img src="https://image.flaticon.com/icons/svg/149/149139.svg" />
            </div>
            <div v-if="volumeCondition" class="button unmute" @click.prevent="unMute">
              <img src="https://image.flaticon.com/icons/svg/149/149144.svg" />
            </div>
          </div>
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
          v-on:keyup.enter="addMessage"
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
    //alert("test lagi")
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    socket.on("pause", payload => {
      window.localstream.getVideoTracks()[0].enabled = false;
    });
    this.test();
    socket.emit("join-room", localStorage.getItem("roomKey"));
    this.startVideo();
    this.$store.dispatch("update_statusRead", this.$route.params.id);
    socket.on("sendMessage", msg => {
      let pesan = {
        content: msg.content,
        sender: msg.sender
      };
      this.messages.push(pesan);
      this.$store.dispatch("update_statusRead", this.$route.params.id);
    });
    socket.on("mute Video", data => {
      console.log("your partner has muted their mic");
      //  window.localstream.getAudioTracks()[0].enabled = false
      var video = this.$refs.rVideo;
      video.muted = true;
    });
    socket.on("unMute Video", data => {
      console.log("your partner has unmuted their mic");
      //  window.localstream.getAudioTracks()[0].enabled = true
      var video = this.$refs.rVideo;
      video.muted = false;
    });
    socket.on("receive peerId", data => {
      this.partnerId = data.peerId;
      this.partnerName = data.name;
      window.conn = peer.connect(this.partnerId);
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
          // this.startVideo();
          return Promise.all([this.startVideo()]).then(data => {
            console.log("masuk promise this start Video ()");
            call.answer(window.localstream);
            call.on("stream", stream => {
              this.startVideo();
              window.peer_stream = stream;
              this.recStream2(stream);
            });
            this.call = call;
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
      window.conn.close();
      this.call.close();
      // video.pause();
      video.srcObject = null;
      // video.autoplay = false;
      // console.log(window.localstream.getTracks);
      // localstream.getTracks().map(function(val) {
      //   val.stop();
      // });
      // window.localstream.getVideoTracks().forEach(el => {
      //   el.enabled = false;
      // });
      // window.localstream.getTracks().forEach(el => {
      //   el.enabled = false;
      // });
    });
    peer.on("connection", () => {
      console.log("Other already connected");
    });
    peer.on("error", console.log);
    this.$store
      .dispatch("getAllMsg", this.$route.params.id)
      .then(resp => {
        if (this.role == "parent") {
          localStorage.setItem("partnerKey", resp.data[0].Agency.email);
        } else if (this.role == "agency") {
          localStorage.setItem("partnerKey", resp.data[0].Parent.email);
        }
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
      tempKey: "",
      telpon: null,
      call: null,
      volumeCondition: false,
      videoCondition: true,
      partnerName: "",
      playVideo: false
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
      if (this.partnerId) {
        this.telpon = peer.call(this.partnerId, window.localstream);
        this.telpon.on("stream", Stream => {
          this.startVideo();
          // Swal.fire("sisi penenlpon");

          window.peer_stream = Stream;
          this.recStream2(Stream);
        });
      } else {
        Swal.fire({
          position: "icon",
          icon: "success",
          title: "You need a partner id",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    startVideo() {
      this.getLVideo();
    },
    endCall() {
      // Swal.fire("end my call");
      console.log(navigator);

      var video = this.$refs.rVideo;
      // video.pause();
      video.srcObject = null;
      // video.autoplay = false;
      // localstream.getTracks().map(function(val) {
      //   val.stop();
      // });
      // window.localstream.getVideoTracks().forEach(el => {
      //   el.enabled = false;
      // });
      // window.localstream.getTracks().forEach(el => {
      //   el.enabled = false;
      // });
      socket.emit("end call", {
        msg: "close",
        roomKey: localStorage.getItem("roomKey")
      });
      //this.startVideo();
    },
    pause() {
      var video = this.$refs.rVideo;
      this.playVideo = true;
      socket.emit("pause", { roomKey: localStorage.getItem("roomKey") });
      // this.videoCondition = false;
      // video.pause()
    },
    play() {
      this.playVideo = false;
      //  socket
      var video = this.$refs.rVideo;
      //  video.play()
    },
    unMute() {
      this.volumeCondition = false;
      // var video = this.$refs.rVideo;
      // video.volume = 1.0;
      // window.localstream.getAudioTracks()[0].enabled = true;
      // localstream.getAudioTracks()[0].enabled = true;
      socket.emit("unMute Video", { roomKey: localStorage.roomKey });
    },
    mute() {
      this.volumeCondition = true;
      // var video = this.$refs.rVideo;
      // video.volume = 0.0;
      socket.emit("mute Video", { roomKey: localStorage.roomKey });
      //   window.localstream.getAudioTracks().forEach(element => {
      //   element.enabled = false
      // });
      //  window.localstream.getAudioTracks()[0].enabled = false
    },
    recStream2(stream) {
      console.log("masuk rec stream2", this.$refs.rVideo);
      var video = this.$refs.rVideo;
      video.srcObject = stream;
      window.peer_stream = stream;
      video.autoplay = true;
      // video.play();
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
      this.messages.push(pesan);
      this.$store
        .dispatch("messageDB", {
          content: this.inputMessage,
          sender: this.role,
          id: this.$route.params.id
        })
        .then(() => {
          socket.emit("sendMessage", pesan);
          socket.emit("fetchingPartner", {
            key: localStorage.getItem("partnerKey")
          });
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
      console.log("berapa kali nih ke console log rubhi");
      navigator.mediaDevices.getUserMedia =
        navigator.mediaDevices.getUserMedia ||
        navigator.mediaDevices.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      let constraints = {
        audio: true,
        video: true
      };
      //navigator.mediaDevices.getUserMedia(constraints, callbacks.success, callbacks.error);
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          window.localstream = stream;
          console.log(
            window.localstream.getTracks()[0],
            "this is the window localstream"
          );
          console.log(window.localstream, "this is the window localstream");
        })
        .catch(err => {
          console.log(err);
        });
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
        roomKey: localStorage.getItem("roomKey"),
        name: JSON.parse(localStorage.user).name
      };
      socket.emit("receive peerId", data);
    }
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
  transform: translateY(2.5rem);
}
.ui {
  margin-left: 2rem;
  transform: translateY(-20vh);
}
h5 {
  color: white;
  margin-bottom: 1rem;
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 40%;
}
.button {
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  cursor: pointer;
  transition: ease 400ms;
  filter: grayscale(50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover {
  filter: grayscale(10%);
  transform: translateY(-6px);
}
img {
  width: 70%;
  filter: invert(100%);
}
.share {
  background-color: rgb(23, 92, 184);
}
.call {
  background-color: rgb(4, 187, 44);
}
.end-call {
  background-color: rgb(255, 0, 0);
}
.unmute {
  background-color: rgb(62, 97, 143);
}
.mute {
  background-color: rgb(145, 184, 38);
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
/* #roomKeyWindow {
  transform: translateY(10rem);
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
} */
#chatWindow {
  padding-right: 5px;
  margin-left: 5px;
}
</style>