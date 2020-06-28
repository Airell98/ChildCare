<template>
  <div
    style="background-color: #fffbfa; width:100%; margin:auto; display:flex; justify-content: center;"
  >
    <h3>{{ roomKey }}</h3>
    <div id="roomKeyWindow" style="flex: 2">
      <h3>
        PARTNER ID
      </h3>
      <p>{{ partnerId }}</p>
      <input
        type="text"
        id="connId"
        class="form-control"
        placeholder="enter a connection ID"
        v-model="tempKey"
      />
      <button
        class="btn btn-lg btn-success btn-block"
        id="conn_button"
        type="submit"
        v-on:click="sendPeerId"
      >
        Send Video Link
      </button>

      <button
        class="btn btn-lg btn-danger btn-block"
        id="call_button"
        type="submit"
        v-on:click="callSomeone"
      >
        Call
      </button>

      <button
        class="btn btn-lg btn-danger btn-block"
        id="call_button"
        type="submit"
        v-on:click="endCall"
      >
        End Call
      </button>
    </div>

    <hr />
    <div style="background-color: black; flex: 4;">
      <video class="container-fluid" ref="rVideo" autoplay id="myVideo"></video>

      <div style="display:flex;" class="content">
        <button
          v-on:click="mute"
          class="fas fa-microphone-alt-slash fa-3x"
          id="button"
          type="submit"
        ></button>

        <button
          v-on:click="unmute"
          class="fas fa-microphone  fa-3x"
          id="button"
          type="submit"
        ></button>
      </div>
    </div>
    <div id="chatWindow" style="flex: 2">
      <div style="height: 490px; overflow:scroll;">
        <ul
          v-for="(message, index) in messages"
          :key="index"
          class="list-group list-group-flush"
        >
          <li>
            <div
              v-if="message.sender == true"
              style="color:#34eb7d;"
              class="float-right"
            >
              <p style="color: black;">{{ message.message }}</p>
            </div>
            <div v-else style="background-color:#fffffc;" class="float-left">
              <p style="color: black;">{{ message.message }}</p>
            </div>
          </li>
        </ul>
      </div>
      <input
        type="text"
        id="message"
        v-model="inputMessage"
        class="form-control"
        placeholder="enter a message"
        required
      />

      <button
        v-on:click="addMessage"
        class="btn btn-lg btn-primary btn-block"
        id="button"
        type="submit"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Swal from "sweetalert2";
const serverUrl = "https://websocket-joey.herokuapp.com";
const socket = io(serverUrl, {
  path: "/chat"
});
var peer = new Peer();
export default {
  name: "ChatBox",
  components: {},
  created() {
    this.startVideo();
    this.test();
    socket.on("sendMessage", msg => {
      let pesan = {
        message: msg.message,
        sender: false
      };
      this.messages.push(pesan);
    });
    socket.on("receive peerId", data => {
      if (this.roomKey == data.roomKey) {
        this.partnerId = data.peerId;

        console.log("masuk receive peerId");
        this.conn = peer.connect(this.partnerId);
      }
    });
    peer.on("call", call => {
      Swal.fire({
        title: "Do you want ot answer the call?",
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
          socket.emit("reject phone call", "phone rejected");
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
      roomKey: "",
      tempKey: ""
      // muted: "",
    };
  },
  methods: {
    callSomeone() {
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
      socket.emit("end call", "close");
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
        message: this.inputMessage,
        sender: true
      };
      this.messages.push(pesan);
      socket.emit("sendMessage", pesan);
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
      peer.on("open", () => {
        console.log("masuk test", peer);
        this.peerId = peer.id;
        
      });
    },
    sendPeerId() {
      console.log("masuk sendPeerId", this.peerId);
      let data = {
        peerId: this.peerId,
        roomKey: this.roomKey
      };
      socket.emit("receive peerId", data);
    },
    addRoomKey() {
      console.log(this.tempKey, "ini temp key");
      this.roomKey = this.tempKey;
      this.tempKey = "";
      console.log(this.roomKey);
    }
  }
};
</script>

<style scoped>
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
</style>
