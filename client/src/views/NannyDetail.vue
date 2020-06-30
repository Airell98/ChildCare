<template>
  <div>
    <NavBar></NavBar>
    <div class="container-profile">
      <!-- <div class="container-searchbox"></div> -->
      <div class="container-content">
        <div class="container-content-navigation">
          <button @click="onClickSebelumnya">&#8592; Sebelumnya</button>
          <button @click="onClickBerikutnya">Berikutnya &#8594;</button>
        </div>
        <div class="container-content-brief">
          <div class="container-content-brief-card">
            <div class="container-content-brief-card-name">
              <h6>{{dataNanny.name}}</h6>
              <img class="img-logo" src="../assets/childCare.png" />
            </div>
            <div class="container-content-brief-card-photo">
              <div class="container-content-brief-card-photo-box">
                <img :src="dataNanny.imageUrl" />
              </div>
            </div>
          </div>
          <div class="container-content-brief-detail">
            <div class="container-content-brief-detail-title">Profile</div>

            <div class="container-content-brief-detail-0">
              <div class="container-content-brief-detail-1">
                <h5>Umur</h5>
              </div>
              <div class="container-content-brief-detail-2">
                <h5>{{age}}</h5>
              </div>
            </div>
            <div class="container-content-brief-detail-0">
              <div class="container-content-brief-detail-1">
                <h5>Jenis Kelamin</h5>
              </div>
              <div class="container-content-brief-detail-2">
                <h5>{{dataNanny.gender}}</h5>
              </div>
            </div>
            <div class="container-content-brief-detail-0">
              <div class="container-content-brief-detail-1">
                <h5>Daerah</h5>
              </div>
              <div class="container-content-brief-detail-2">
                <h5>{{dataNanny.city}}</h5>
              </div>
            </div>
            <!-- <div class="container-content-brief-detail-0">
            <div class="container-content-brief-detail-1">Agency</div>
            <div class="container-content-brief-detail-2"></div>
            </div>-->
            <div class="container-content-brief-detail-0">
              <div class="container-content-brief-detail-1">
                <h5>Gaji Diharapkan</h5>
              </div>
              <div class="container-content-brief-detail-2">Rp. {{dataNanny.expectedSalary}}</div>
            </div>
            <div class="container-content-brief-detail-button">
              <div>
                <button @click.prevent="onClickEditInfo" v-if="loginAs=='agency'">Edit Info</button>
                <div>
                  <EditNannyModal :dataNanny="dataNanny"></EditNannyModal>
                </div>
                <button @click.prevent="onClickWishList" v-if="loginAs=='parent'">+ Wish List</button>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-content-detail">
          <div class="container-content-detail-0">
            <div class="container-content-detail-1">
              <button @click.prevent="onClickDetail">Detail</button>
            </div>
            <div class="container-content-detail-2">
              <button @click.prevent="onClickKeterampilan">Keterampilan</button>
            </div>
            <div class="container-content-detail-3">
              <button @click.prevent="onClickAgency">Agency</button>
            </div>
          </div>
          <div class="container-content-detail-detailed" v-if="detailStats">
            <ChildCard></ChildCard>
          </div>
          <div class="container-content-detail-detailed" v-if="keterampilanStats">ini keterampilan</div>
          <div class="container-content-detail-detailed" v-if="agencyStats">
            <div>ini agency card</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
import NavBar from "../components/Navbar";
import ChildCard from "../components/ChildCard";
import EditNannyModal from "../components/EditNannyModal";

export default {
  name: "NannyDetail",
  props: ["id"],
  data() {
    return {
      detailStats: "yes",
      keterampilanStats: "",
      agencyStats: ""
    };
  },
  components: {
    NavBar,
    ChildCard,
    EditNannyModal
  },
  created() {
    this.$store.dispatch("get_nanny", this.id);
  },
  computed: {
    dataNanny() {
      return this.$store.state.nannyDetail;
    },
    age() {
      return 2020 - parseInt(this.dataNanny.birthDate.slice(0, 5));
    },
    loginAs() {
      return localStorage.loginAs;
    }
  },
  methods: {
    onClickDetail() {
      this.detailStats = "yes";
      this.keterampilanStats = "";
      this.agencyStats = "";
    },
    onClickKeterampilan() {
      this.detailStats = "";
      this.keterampilanStats = "yes";
      this.agencyStats = "";
    },
    onClickAgency() {
      this.detailStats = "";
      this.keterampilanStats = "";
      this.agencyStats = "yes";
    },
    onClickWishList() {
      this.$store.dispatch("addToWishList", this.id);
    },
    onClickEditInfo() {
      this.$bvModal.show("modalEditNanny");
    },
    onClickSebelumnya() {
      this.$router.push({
        name: "NannyDetail",
        params: { id: Number(this.id) - 1 }
      });
      window.location.reload();
    },
    onClickBerikutnya() {
      this.$router.push({
        name: "NannyDetail",
        params: { id: Number(this.id) + 1 }
      });
      window.location.reload();
    }
  },
  mounted() {
    console.log(this.dataNanny);
  }
};
</script>

<style scoped>
h6 {
  font-family: "Courier New", Courier, monospace;
  font-size: 45px;
}

h5 {
  font-family: "Courier New", Courier, monospace;
  font-size: 15px;
}

.container-profile {
  /* background-color: green; */
  transform: translateY(6rem);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: center; */
  /* justify-content: center; */
  margin: 1px auto;
  width: 1700px;
}

.container-searchbox {
  background-color: rgb(240, 170, 90);

  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 400px;
  height: 1500px;
}

.container-content {
  /* background-color: rgb(202, 178, 150); */

  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 1100px;
  /* height: 1500px; */
  margin: auto;
}

.container-content-navigation {
  padding-top: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  padding-top: 10px;
  width: 1100px;
  height: 60px;
  justify-content: space-around;
  margin-bottom: 15px;

  opacity: 80%;
}

.container-content-brief {
  /* background-color: rgb(54, 173, 30); */

  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 1100px;
  height: 640px;
}

.container-content-brief-card {
  /* background-color: rgb(131, 223, 112); */

  display: flex;
  align-items: center;
  padding-top: 5px;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 500px;
  height: 640px;
}

.container-content-brief-card-name {
  background-color: rgb(235, 231, 231);
  padding-left: 15px;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-right: 15px;

  /* padding:1em; */
  width: 500px;
  height: 60px;
}

.img-logo {
  width: 40px;
  height: 40px;

  border-radius: 50%;
}

img {
  border-radius: 50%;
}

.container-content-brief-card-photo {
  /* background-color: rgb(42, 78, 35); */
  display: flex;
  align-items: center;
  padding-top: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  height: 500px;
}

.container-content-brief-card-photo-box {
  /* background-color: rgb(233, 240, 231); */
  padding: 15px;

  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 450px;
  height: 500px;
}

.container-content-brief-detail {
  background-color: rgb(226, 226, 226);

  display: flex;
  flex-direction: Column;
  align-items: center;
  flex-wrap: wrap;
  width: 600px;
  height: 640px;

  padding-left: 15px;
  padding-top: 60px;
}

.container-content-brief-detail-title {
  background-color: rgb(255, 255, 255);
  border: 0.4px red;
  padding-left: 20px;

  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 550px;
  height: 40px;
}

.container-content-brief-detail-0 {
  background-color: rgb(255, 255, 255);
  border: 0.1px rgb(10, 10, 10);

  display: flex;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;

  width: 550px;
}

.container-content-brief-detail-button {
  margin-top: 10%;

  display: flex;
  align-items: flex-end;
  /* justify-content: space-between; */
  flex-direction: row-reverse;
  flex-wrap: wrap;

  width: 550px;
}

.container-content-brief-detail-1 {
  background-color: rgb(185, 211, 250);
  border: 0.1px solid rgb(177, 176, 176);
  margin-top: 2px;
  padding-top: 10px;
  padding-left: 20px;

  display: flex;
  align-items: center;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 200px;
  height: 40px;
}

.container-content-brief-detail-2 {
  background-color: rgb(195, 206, 230);
  border: 0.1px solid rgb(177, 176, 176);
  margin-top: 2px;
  padding-top: 10px;
  padding-left: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 350px;
  height: 40px;
}

.container-content-detail {
  /* background-color: rgb(54, 173, 30); */

  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 1100px;
  /* height: 800px; */
}

.container-content-detail-0 {
  /* background-color: rgb(129, 134, 128); */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-left: 30px;
  flex-wrap: wrap;
  width: 500px;
  height: 60px;
}

.container-content-detail-1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 120px;
  height: 60px;
}

.container-content-detail-2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 120px;
  height: 60px;
}

.container-content-detail-3 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 120px;
  height: 60px;
}

.container-content-detail-detailed {
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);
  padding: 25px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 100px;

  flex-wrap: wrap;
  width: 1000px;
  /* height: 1200px; */
}

button {
  display: block;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: var(--light);
  width: 150px;
  height: 30px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  background-size: 100% 100%;
  box-shadow: 0 0 0 7px var(--light) inset;
  margin-bottom: 15px;

  opacity: 110%;
}
</style>
