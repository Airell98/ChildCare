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
          <b-form-file
            @change.prevent="uploadImg"
            multiple
            accept="image/jpeg, image/png"
            ref="myFiles"
          />
          <!-- <b-form-input type="text" v-model="image_url" /> -->
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
import axios from "axios";
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
        { value: "male", text: "Male" }
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
    uploadImg(event) {
      let imageUrl;
      // var $files = $("input[type=file]").get(0).files;
      var files = event.target.files;
      console.log(files, "files");
      // var img = new Image();
      // img.src = url; // local image url
      if (files.length) {
        // Reject big files
        // if (files[0].size > $(this).data("max-size") * 1024) {
        //   console.log("Please select a smaller file");
        //   return false;
        // }
        // Begin file upload
        console.log("Uploading file to Imgur..");
        // Replace ctrlq with your own API key
        var apiUrl = "https://api.imgur.com/3/image";
        var apiKey = "6b9f0e258a0d16b";
        // var settings = {
        //   async: false,
        //   crossDomain: true,
        //   processData: false,
        //   contentType: false,
        //   type: "POST",
        //   url: apiUrl,
        //   headers: {
        //     Authorization: "Client-ID " + apiKey,
        //     Accept: "application/json"
        //   },
        //   mimeType: "multipart/form-data"
        // };
        var formData = new FormData();
        formData.append("image", files[0]);
        console.log(formData);
        // settings.data = formData;
        // Response contains stringified JSON
        // Image URL available at response.data.link
        axios({
          async: false,
          crossDomain: true,
          processData: false,
          contentType: false,
          method: "POST",
          url: apiUrl,
          headers: {
            Authorization: "Client-ID " + apiKey,
            Accept: "application/json"
          },
          mimeType: "multipart/form-data",
          data: formData
        })
          .then(response => {
            // console.log(response.data.data.link, "response");
            this.image_url = response.data.data.link;
            console.log(this.logoUrl, "sdfh");
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
      }
      // $("input[type=file]").val("");
      return imageUrl;
    },
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
