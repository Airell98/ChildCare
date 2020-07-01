<template>
  <div>
    <NavBar></NavBar>
    <div class="container-profile">
      <div class="container-searchbox">
        <button class='effect1' @click="onClickSebelumnya">&#8592; Previous
      
        </button>
      </div>
      <div class="container-content">
        <div class="container-content-brief-card-name">
              <h6>{{dataNanny.name}}</h6>
              <img class="img-logo" src="../assets/childCare.png" />
        </div>
        <div class="container-content-brief">
          <div class='container-content-picture'>
            <img :src="dataNanny.imageUrl" 
              height="100%"
              width="100%"/>
          </div>

          <div class="container-content-detail">
            <div class="container-content-detailed"> 
              
              <div class="symbols-detail"> 
                <div class='symbol'>
                <img class="img-asd" src="../assets/age.png"
                  height="120%"
                  width="120%"
                />
                </div>
                <div class='answer'>
                  {{age}}
                </div>
              </div>

              <div class="symbols-detail"> 
                <div class='symbol'>
                <img class="img-asd" src="../assets/gender.png"
                  height="100%"
                  width="100%"
                />
                </div>
                <div class='answer'>
                  {{dataNanny.gender}}
                </div>
              </div>

              <div class="symbols-detail"> 
                <div class='symbol'>
                <img class="img-asd" src="../assets/location.png"
                  height="100%"
                  width="100%"
                />
                </div>
                <div class='answer'>
                  {{dataNanny.city}}
                </div>
              </div>

              <div class="symbols-detail"> 
                <div class='symbol'>
                <img class="img-asd" src="../assets/salary.png"
                  height="100%"
                  width="100%"
                />
                </div>
                <div class='answer'>
                  Rp. {{dataNanny.expectedSalary}}
                </div>
              </div>

            </div>

            <div class='container-content-etc'>
              <div class='container-content-etc2'>

            </div>
            <div class='container-content-etc3'>
              <button class=buttonA
            @click.prevent='onClickEditInfo' v-if="loginAs=='agency'"> Edit Info </button>
              <div>
                <button
                  @click.prevent="onClickEditInfo"
                  v-if="loginAs=='agency' && authorized"
                >Edit Info</button>
                <div>
                  <EditNannyModal :dataNanny="dataNanny"></EditNannyModal>
                </div>
                <button @click.prevent="onClickWishList" v-if="loginAs=='parent'">+ Wish List</button>
                <div></div>
              </div>
            <button class=buttonA
            @click.prevent='onClickWishList' v-if="loginAs=='parent'"> + Wish List </button>

            </div>

            </div>
          </div>

        </div>


      </div>
      <div class="container-searchbox2">
        <button class='effect1' @click="onClickBerikutnya">Next
           <span class="bg"></span>
        </button>
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
    },
    authorized() {
      const user = JSON.parse(localStorage.user);
      const agencyId = this.dataNanny.AgencyId;
      console.log(agencyId, user.id);
      return user.id == agencyId ? true : false;
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
      // this.$router.push({
      //   name: "NannyDetail",
      //   params: { id: Number(this.id) - 1 }
      // });
      // window.location.reload();
      this.$store.dispatch('slideNannyCardToTheLeft', Number(this.id)-1)
    },
    onClickBerikutnya() {
      // this.$router.push({
      //   name: "NannyDetail",
      //   params: { id: Number(this.id) + 1 }
      // });
      // window.location.reload();
       this.$store.dispatch('slideNannyCardToTheRight', Number(this.id)+1)
    }
  },
  mounted() {
    console.log(this.dataNanny);
  }
};
</script>

<style scoped>

h6{
  font-family: 'Courier New', Courier, monospace;
  font-size:45px;
}

h5{
  font-family: 'Courier New', Courier, monospace;
  font-size:15px;
}

.container-profile{
  /* background-color: rgb(181, 255, 181); */
  transform: translateY(3rem);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 1px auto;
  width: 90vw;
  height:80vh;
  
}


.container-content{

  /* background-color: #ffd89e; */

  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 60%;
  height: 100%;
  margin:auto;
}

.container-searchbox{
  background-color: rgba(255, 255, 255, 0.801);

  padding-top: 5px;
  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  height: 100%;
  justify-content: space-around;
  margin-bottom: 2%;
  margin-left: 2%;

  opacity: 80%;
}

.container-searchbox2{
  background-color: rgba(255, 255, 255, 0.801);

  padding-top: 5px;
  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  height: 100%;
  justify-content: space-around;
  margin-bottom: 2%;
  margin-right: 2%;

  opacity: 80%;
}

.container-content-brief-card-name{
  background-color: rgba(255, 255, 255, 0.801);
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.4);
  border-radius:25px;
  padding-left:3%;
  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:space-between;
  padding-right:3%;

  /* padding:1em; */
  width: 100%;
  height: 8%;

  opacity: 90%;

}


.container-content-brief-card-name-name{
  margin-top:5px;
}

.img-logo{
  width: 5vw;
  height: 5vw;
  margin-top: -2.5%;
  border-radius: 50%;
}

img{
  border-radius: 50%;
}

.container-content-brief{
  /* background-color: rgb(255, 187, 97); */
  padding:1vw;
  display:flex;
  align-items: center;
  flex-direction: row;
  margin-top:1vh;
  width: 53vw;
  height: 33vw;
}

.container-content-picture{
  /* background-color: rgb(212, 194, 88); */
  padding:1vw;
  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top:1vh;
  width: 25vw;
  height: 60vh;
}

.container-content-detail{
  /* background-color: rgb(213, 255, 205); */
  padding:1vw;
  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top:1vh;
  width: 30vw;
  height: 60vh;

}

.container-content-detailed{
 /* background-color: rgb(228, 226, 255); */
  padding:1vw;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top:1vh;
  width: 25vw;
  height: 30vh;
  justify-content: flex-start;
}

.symbols-detail{
  background-color: rgb(149, 172, 145);
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top:1vh;
  width: 22vw;
  height: 4vh;
  justify-content: flex-start;

}

.symbol{
  /* background-color: rgb(9, 24, 6); */
  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 4vh;
  height: 4vh;
  margin-left:0.5vh;

}

.answer{
  background-color: rgb(196, 196, 196);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.3vw;
  display:flex;
  align-items: left;
  flex-direction: column;
  flex-wrap: wrap;
  width: 80%;
  height: 100%;
  justify-content: flex-start;
}

.container-content-etc{
 /* background-color: rgb(27, 10, 255); */

  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top:1vh;
  width: 25vw;
  height: 23vh;
  justify-content: flex-start;
}

.container-content-etc2{
 /* background-color: rgb(255, 255, 255); */
  padding:1vw;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 70%;
  height: 100%;
  justify-content: flex-start;
}

.container-content-etc3{
 /* background-color: rgb(87, 53, 53); */
  padding:1vw;
  display:flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 30%;
  height: 100%;
  justify-content: flex-start;
}














.buttonA {
	box-shadow: 3px 4px 0px 0px #a84f46;
	background:linear-gradient(to bottom, #d9564a 5%, #ff756b 100%);
	background-color:#d9564a;
	border-radius:17px;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:17px;
	padding:7px 25px;
	text-decoration:none;
	/* text-shadow:0px 2px 0px #820700; */
}

.buttonA:hover {
	background:linear-gradient(to bottom, #ff756b 5%, #d9564a 100%);
	background-color:#ff756b;
}
.buttonA:active {
	position:relative;
	top:1px;
}

.buttonN {
	box-shadow: 3px 4px 0px 0px #a39694;
	background:linear-gradient(to bottom, #ffffff 5%, #949494 100%);
	background-color:#ffffff;
	border-radius:5px;
	display:inline-block;
	cursor:pointer;
	color:#000000;
	font-family:Arial;
	font-size:17px;
	padding:7px 25px;
	text-decoration:none;
	/* text-shadow:0px 2px 0px #0d0d0d; */
}
.buttonN:hover {
	background:linear-gradient(to bottom, #949494 5%, #ffffff 100%);
	background-color:#949494;
}
.buttonN:active {
	position:relative;
	top:1px;
}

.effect1 {
  color: #222;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 10px;
  position: relative;
  padding: 10px 20px 10px 20px;

  -webkit-transition: all 0.3s;

  -o-transition: all 0.3s;

  transition: all 0.3s;

  -webkit-transform: scale(3);

      -ms-transform: scale(3);

          transform: scale(3); /*change scale(3) to scale(1)*/
}

.effect1 .bg {
  background: #222;
  width: 30px;
  height: 2px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -1px;
  z-index: -1;

  -webkit-transition: all 0.3s;

  -o-transition: all 0.3s;

  transition: all 0.3s;
}

.effect1:hover {
  padding-right: 1px;
  color: #fff;
}

.effect1:hover .bg {
  height: 100%;
  width: 100%;
  -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
          transform: translate(0, -50%);
}

.effect1 .bg:before, .effect1 .bg:after {
  content: '';
  height: 2px;
  width: 1px;
  background: #222;
  position: absolute;
  right: -2px;      
  -webkit-transition: all 0.3s;      
  -o-transition: all 0.3s;      
  transition: all 0.3s;
}

.effect1 .bg:before {
  bottom: 3px;
  -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
          transform: rotate(45deg);
}
.effect1 .bg:after{
  top: 3px;
  -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
          transform: rotate(-45deg);
}

.effect1:hover .bg:before,
.effect1:hover .bg:after{
  right: 0;
}

.effect1:hover .bg:before{
  bottom: 6px;
}

.effect1:hover .bg:after{
  top: 6px;
}


</style>
