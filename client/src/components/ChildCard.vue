<template>
<div class = 'card-container'>
    <div class = 'card-container-name'>
        Test
    </div>
    <div class = 'card-container-photo'>

    </div>

    <div class = 'card-container-detail'>
        <div class = 'card-container-detail-detailed'>
        Umur : 
        </div>
        <div class = 'card-container-detail-detailed'>
        3
        </div>
        <div class = 'card-container-detail-detailed'>
        Daerah : 
        </div>
        <div class = 'card-container-detail-detailed'>
        Tangerang
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

<style >

.card-container{
  padding:1%;
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);

  display:flex;
  flex-wrap: wrap;
  flex-direction: row;

  width: 400px;
  height: 300px;

  margin: 25px;
}

.card-container-name{
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);
  padding-top:2.5%;

  width: 400px;
  height: 50px;

  justify-content: center;
  align-content: center;
  align-items: center;

}
.card-container-photo{
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);

  width: 200px;
  height: 200px;

}
.card-container-detail{
  background-color: rgb(255, 255, 255);
  border: 0.1px solid rgb(177, 176, 176);

  width: 170px;
  height: 200px;
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


</style>