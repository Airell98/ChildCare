<template>
  <div class="modal-nanny">
    <b-modal
      id="modalEditNanny"
      v-model="modalShow"
      title="Edit Nanny"
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
      <form @submit.prevent="confirmEdit">
        <div>
          <img v-bind:src="this.image_url" height="265" width="265" />
          <img />
          <h6>Image url</h6>
          <b-form-input type="text" v-model="image_url" />
          <br />
          <h6>Name</h6>
          <b-form-input type="text" v-model="name" />
          <br />
          <h6>Gender</h6>
          <b-form-input type="text" v-model="gender" />
          <br />
          <h6>Phone Number</h6>
          <b-form-input type="text" v-model="phoneNumber" />
          <br />
          <h6>Birth Date</h6>
          <b-form-input type="text" v-model="birthDate" />
          <br />
          <h6>Address</h6>
          <b-form-input type="text" v-model="address" />
          <br />
          <h6>City</h6>
          <b-form-input type="text" v-model="city" />
          <br />
          <h6>Gaji Yang Diharapkan</h6>
          <b-form-input type="number" v-model="expectedSalary" min="1000000" />
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
  name: "ModalEditNanny",
  props: ["dataNanny"],
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
      headerBgVariant: "info",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark"
    };
  },
  methods: {
    confirmEdit() {
      this.$store.dispatch("editNanny", {
        id: this.$route.params.id,
        data: {
          name: this.name,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          birthDate: this.birthDate,
          address: this.address,
          expectedSalary: this.expectedSalary,
          imageUrl: this.image_url
        }
      });
      this.modalShow = false;
    }
  },
  created() {
    console.log(this.dataNanny);
    this.name = this.dataNanny.name;
    this.gender = this.dataNanny.gender;
    this.phoneNumber = this.dataNanny.phoneNumber;
    this.birthDate = this.dataNanny.birthDate;
    this.address = this.dataNanny.address;
    this.expectedSalary = this.dataNanny.expectedSalary;
    this.image_url = this.dataNanny.imageUrl;
    this.city = this.dataNanny.city;
  },
  computed: {
    age() {
      return 2020 - parseInt(this.dataNanny.birthDate.slice(0, 5));
    },
    loginAs() {
      return localStorage.loginAs;
    }
  }
};
</script>


<style scoped>
.button {
  position: relative;
  left: 15px;
  top: 1px;
  background-color: rgb(73, 148, 167);
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