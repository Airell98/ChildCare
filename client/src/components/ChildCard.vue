<template>
<div class = 'card-container'>
    <div class = 'card-container-photo'>

    </div>
    <div class = 'card-container-name'>
        <h5>Juan</h5>
    </div>

    <div class = 'card-container-detail'>

        <div class = 'card-container-detail-detailed'>
        <h5>Umur : 3 </h5>
        </div>
        <div class = 'card-container-detail-detailed'>
        <h5>Daerah : Tangerang </h5>
        </div>
    </div>

</div>
    
</template>

<script>
import Vuex from 'vuex'


export default {
    name:'ChildCard',
    data(){
        return{


        };
    },
    methods:{

    },
}
</script>

<style scoped>

.card-container{
  background-color: #fff;
  background: linear-gradient(#325C46, #3d7a5b);
  box-shadow: 0 8px 16px -8px rgba(0,0,0,0.4);
  border-radius: 10px;
  padding:1%;
  /* background-color: rgb(255, 255, 255); */
  border: 0.1px solid rgb(177, 176, 176);

  display:flex;
  flex-wrap: wrap;
  flex-direction: column;

  width: 400px;
  height: 200px;

  margin: 25px;
}

.card-container-name{
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);
  padding-top:2.5%;
  border-radius: 10px;
  

  width: 170px;
  height: 50px;
  margin-left:5px;

  justify-content: center;
  align-content: center;
  align-items: center;

  padding-left:10px;
}
.card-container-photo{
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);
  border-radius: 50%;
  box-shadow: 0 8px 8px -8px rgba(0,0,0,0.4);

  width: 200px;
  height: 200px;

}
.card-container-detail{
  background-color: rgb(255, 255, 255);
  /* border: 0.1px solid rgb(177, 176, 176); */
  border-radius: 10px;

  width: 170px;
  height: 120px;
  margin-top:5px;
  margin-left:5px;
  flex-direction: column;

  display:flex;
  justify-content: left;
  padding-top:15px;
}

.card-container-detail-detailed{
  padding-left:15px;
  display:flex;
  align-items: center;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
}

h5{
  font-family: 'Courier New', Courier, monospace;
  /* Courier New, monospace */
  font-size: 15px;
}


</style>