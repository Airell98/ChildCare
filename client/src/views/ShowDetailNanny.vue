<template>
  <div class="container-profile">
    <div class='container-searchbox'> 
        
    
    </div>
    <div class='container-content'> 
        <div class='container-content-navigation'>
          
            <button> &#8592; Sebelumnya </button>
            <button> Berikutnya 	&#8594; </button>
        </div>
        <div class='container-content-brief'> 
            <div class='container-content-brief-card'> 
                <div class= 'container-content-brief-card-name'>  
                    
                    <div> Sizuka </div>
                  
                </div>
                <div class='container-content-brief-card-photo'>
                    <div class='container-content-brief-card-photo-box'>
                        <img>
                    </div>
                </div>
            </div>
            <div class='container-content-brief-detail'> 
                <div class='container-content-brief-detail-title'> Profile</div>

                <div class='container-content-brief-detail-0'>
                    <div class='container-content-brief-detail-1'>
                        umur
                    </div>
                    <div class='container-content-brief-detail-2'>
                        1
                    </div>
                </div>
                <div class='container-content-brief-detail-0'>
                    <div class='container-content-brief-detail-1'>
                        Jenis Kelamin
                    </div>
                    <div class='container-content-brief-detail-2'>
                        HOW DARE U PRESUME MY GENDER?!
                    </div>
                </div>
                <div class='container-content-brief-detail-0'>
                    <div class='container-content-brief-detail-1'>
                        Daerah
                    </div>
                    <div class='container-content-brief-detail-2'>
                        3
                    </div>
                </div>
                <div class='container-content-brief-detail-0'> 
                    <div class='container-content-brief-detail-1'>
                        Agency
                    </div>
                    <div class='container-content-brief-detail-2'>
                        4
                    </div>
                </div>
                <div class='container-content-brief-detail-0'>
                    <div class='container-content-brief-detail-1'>
                        Gaji Yang Diharapkan
                    </div>
                    <div class='container-content-brief-detail-2'>
                        5
                    </div>
                </div>
            </div>
        </div>
        <div class='container-content-detail'> 
            <div class='container-content-detail-0'>
                <div class='container-content-detail-1'> <button @click.prevent='onClickDetail'> Detail </button> 
    
                </div>
                <div class='container-content-detail-2'> <button @click.prevent='onClickKeterampilan'> Keterampilan </button> 
                
                </div>
                <div class='container-content-detail-3'> <button @click.prevent='onClickAgency'> Agency </button> 
                
                </div>
            </div>
            <div class='container-content-detail-detailed' v-if='detailStats'> 
                <ChildCard> 
                  
                </ChildCard>
                <ChildCard> 

                </ChildCard>
                <ChildCard> 

                </ChildCard>
            </div>
            <div class='container-content-detail-detailed' v-if='keterampilanStats'> 
                ini keterampilan
            </div>
            <div class='container-content-detail-detailed' v-if='agencyStats'>
                <div>
                    ini agency card
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex'
import ChildCard from '../components/ChildCard.vue'




export default {
    name : 'ShowDetailNanny',
    data(){
        return{
            detailStats:'yes',
            keterampilanStats:'',
            agencyStats:'',
            nannyId:''

        };
    },
    components:{
      ChildCard

    },
    methods:{
        onClickDetail(){
            this.detailStats = 'yes'
            this.keterampilanStats = ''
            this.agencyStats = ''
        },
        onClickKeterampilan(){
            this.detailStats = ''
            this.keterampilanStats = 'yes'
            this.agencyStats = ''
        },
        onClickAgency(){
            this.detailStats = ''
            this.keterampilanStats = ''
            this.agencyStats = 'yes'
        },
    },
    computed:{

    },
    created(){
      console.log(this.$route.params)
    }
}
</script>

<style scoped>

.container-profile{
  /* background-color: green; */
  
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* align-items: center; */
  /* justify-content: center; */
  margin: 1px auto;
  width: 1700px;
  
}

.container-searchbox{
  background-color: rgb(240, 170, 90);

  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 400px;
  height: 1500px;
}

.container-content{

  /* background-color: rgb(202, 178, 150); */

  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 1100px;
  /* height: 1500px; */
  margin-left:50px;
}

.container-content-navigation{

  background-color: rgb(202, 202, 202);

  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  padding-top:10px;
  width: 1100px;
  height: 60px;
  justify-content: space-around;
}

.container-content-brief{

  /* background-color: rgb(54, 173, 30); */

  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 1100px;
  height: 640px;
}

.container-content-brief-card{
  /* background-color: rgb(131, 223, 112); */

  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 500px;
  height: 640px;
}

.container-content-brief-card-name{
  background-color: rgb(235, 231, 231);
  padding-left:15px;
  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 500px;
  height: 60px;

}

.container-content-brief-card-photo{
  /* background-color: rgb(42, 78, 35); */
  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  height: 580px;
}

.container-content-brief-card-photo-box{
  background-color: rgb(233, 240, 231);
  padding: 15px;

  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 450px;
  height: 550px;
}

.container-content-brief-detail{
  background-color: rgb(226, 226, 226);

  display:flex;
  flex-direction: Column;
  align-items: center;
  flex-wrap: wrap;
  width: 600px;
  height: 640px;

  padding-left:15px;
  padding-top:60px;
}

.container-content-brief-detail-title{
  background-color: rgb(255, 255, 255);
  border:0.4px red;
  padding-left: 20px;

  display:flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 550px;
  height: 40px;
}

.container-content-brief-detail-0{
  background-color: rgb(255, 255, 255);
  border:0.1px rgb(10, 10, 10);

  display:flex;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 550px;
  /* height: 40px; */
}

.container-content-brief-detail-1{
  background-color: rgb(185, 211, 250);
  border: 0.1px solid rgb(177, 176, 176);
  margin-top:2px;
  padding-top: 5px;
  padding-left: 20px;

  display:flex;
  align-items: center;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 200px;
  height: 40px;
}

.container-content-brief-detail-2{
  background-color: rgb(195, 206, 230);
  border: 0.1px solid rgb(177, 176, 176);
  margin-top:2px;
  padding-top: 5px;
  padding-left: 20px;

  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 350px;
  height: 40px;
}

.container-content-detail{
  /* background-color: rgb(54, 173, 30); */

  display:flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  /* padding:1em; */
  width: 1100px;
  /* height: 800px; */
}

.container-content-detail-0{
  /* background-color: rgb(129, 134, 128); */
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-left:30px;
  flex-wrap: wrap;
  width: 500px;
  height: 60px;

}

.container-content-detail-1{

  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 120px;
  height: 60px;
}

.container-content-detail-2{

  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 120px;
  height: 60px;
}

.container-content-detail-3{
  
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 120px;
  height: 60px;
}



.container-content-detail-detailed{
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);
  padding: 25px;

  display:flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom:100px;

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
}

</style>