<template>
  <div class="modal-nanny">
    <b-modal
      id="modalAddNanny"
      v-model="modalShow"
      :title="titleBasedOnProps"
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
          <h6>Image url</h6>
          <b-form-input type="text" v-model="image_url" />
          <br />
          <h6>Name</h6>
          <b-form-input type="text" v-model="name" />
          <br />
          <h6>Gender</h6>
          <b-form-select v-model="gender" :options="genders"></b-form-select>
          <br />
          <h6>Phone Number</h6>
          <b-form-input type="text" v-model="phoneNumber" />
          <br />
          <h6>Birth Date</h6>
          <b-form-datepicker type="text" v-model="birthDate" />
          <br />
          <h6>Address</h6>
          <b-form-input type="text" v-model="address" />
          <br />
          <h6>City</h6>
          <b-form-input type="text" v-model="city" />
          <br />
          <h6>Gaji Yang Diharapkan</h6>
          <b-form-input type="number" v-model="expectedSalary" min="1000000" />
          <button class="button" type="submit">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalProduct",
  props: ["title"],
  data() {
    return {
      access_id: "",

      name: "",
      gender: null,
      phoneNumber: "",
      birthDate: "",
      address: "",
      expectedSalary: 1000000,
      image_url: "",
      city: "",
      genders: [
        { value: null, text: "Please select gender" },
        { value: "female", text: "Female" },
        { value: "name", text: "Male" }
      ],

      modalShow: false,
      headerBgVariant: "info",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark"
    };
  },
  computed: {
    titleBasedOnProps() {
      if (this.title === "addNanny") {
        return "Add Nanny";
      } else {
        return "Register Nanny";
      }
    }
  },
  methods: {
    confirmToCart() {
      const nannyData = {
        name: this.name,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        birthDate: this.birthDate,
        address: this.address,
        expectedSalary: this.expectedSalary,
        imageUrl: this.image_url,
        city: this.city
      };
      this.title === "addNanny"
        ? this.$store.dispatch("add_nanny", nannyData)
        : this.$store.dispatch("register_nanny", nannyData);
      this.modalShow = false;
    }
  }
};
</script>


<style scoped>
.button {
  position: relative;
  background-color: rgb(73, 148, 167);
  border: none;
  color: white;
  padding: 8px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

form {
  padding: 1rem;
}
</style>