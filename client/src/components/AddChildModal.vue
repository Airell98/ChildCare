<template>
  <div class="modal-nanny">
    <b-modal
      id="modalAddChild"
      v-model="modalShow"
      title="Add Children"
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
          <h6>Name</h6>
          <b-form-input type="text" v-model="name" />
          <br />
          <h6>Gender</h6>
          <b-form-input type="text" v-model="gender" />
          <br />
          <h6>Birth Date</h6>
          <b-form-datepicker v-model="birthDate" />
          <br />
          <h6>Condition</h6>
          <b-form-textarea type="text" v-model="condition" />
          <button class="button" type="submit">Submit</button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalChild",
  data() {
    return {
      access_id: "",

      name: "",
      gender: "",
      phoneNumber: "",
      birthDate: "",
      condition: "",

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
    confirmToCart() {
      const childData = {
        name: this.name,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        birthDate: this.birthDate,
        condition: this.condition
      };
      this.$store.dispatch("add_child", childData);
      this.modalShow = false;
    }
  }
};
</script>


<style scoped>
.button {
  position: relative;
  top: 1px;
  background-color: rgb(73, 148, 167);
  border: none;
  color: white;
  padding: 8px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 1rem;
}
form {
  padding: 1rem;
}
</style>