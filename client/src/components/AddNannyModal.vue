<template>
  <div class="modal-nanny">
    <b-modal
      id="modalAddNanny"
      v-model="modalShow"
      title="Menambahkan Nanny"
      centered
      ok-only
      ok-variant="secondary"
      ok-title
      hide-footer
      :header-bg-variant="headerBgVariant"
      :header-text-variant="headerTextVariant"
      :body-bg-variant="bodyBgVariant"
      :body-text-variant="bodyTextVariant"
      :footer-bg-variant="footerBgVariant"
      :footer-text-variant="footerTextVariant"
      size="L"
    >
      <form @submit.prevent="confirmToCart">
        <div>
          <img v-bind:src="this.image_url" height="265" width="265" />
          <img />
          <h5>Image url</h5>
          <input type="text" v-model="image_url" />
          <br />
          <h5>Name</h5>
          <input type="text" v-model="name" />
          <br />
          <h5>Gender</h5>
          <input type="text" v-model="gender" />
          <br />
          <h5>Phone Number</h5>
          <input type="text" v-model="phoneNumber" />
          <br />
          <h5>Birth Date</h5>
          <input type="text" v-model="birthDate" />
          <br />
          <h5>Address</h5>
          <input type="text" v-model="address" />
          <br />
          <h5>City</h5>
          <input type="text" v-model="city" />
          <br />
          <h5>Gaji Yang Diharapkan</h5>
          <input type="number" v-model="expectedSalary" min="1000000" />
          <br />
          <br />
          <button class="button" type="submit">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";
// import swal from 'sweetalert2'

export default {
  name: "ModalProduct",
  data() {
    return {
      access_id: "",

      name: "",
      gender: "",
      phoneNumber: "",
      birthDate: "",
      address: "",
      expectedSalary: 1000000,
      image_url: "",
      city: "",

      modalShow: false,
      headerBgVariant: "warning",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark"
    };
  },
  methods: {
    confirmToCart() {
      this.$store.dispatch("add_nanny", {
        name: this.name,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        birthDate: this.birthDate,
        address: this.address,
        expectedSalary: this.expectedSalary,
        imageUrl: this.image_url,
        city: this.city
      });
      this.modalShow = false;
    }
  },
  created() {}
};
</script>


<style scoped>
.button {
  position: relative;
  left: 15px;
  top: 1px;
  background-color: rgb(221, 62, 62);
  border: none;
  color: white;
  padding: 8px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

input[type="number"] {
  padding-left: 12px;
  width: 120px;
}

input[type="text"] {
  padding-left: 12px;
  width: 300px;
}
</style>