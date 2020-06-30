<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
    <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{ textSnackbar }}</v-snackbar>
    <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>
    <v-form ref="form" v-on:submit.prevent="createGamification" lazy-validation>
      <v-container>
        <v-row>
          <v-subheader class="title">{{this.$route.query.action}} {{this.$route.query.typeComponent}} Component</v-subheader>
          <v-col cols="12">
            <v-text-field
              :rules="rules"
              v-model="name"
              label="Name"
              filled
              shaped
              required
              outlined
            ></v-text-field>
            <v-textarea
              :rules="rules"
              v-model="description"
              label="Description"
              rows="1"
              outlined
              filled
              shaped
            ></v-textarea>
            <v-text-field :rules="rules" v-model="url" label="URL" filled shaped required outlined></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">Cancel</v-btn>
          <v-btn color="blue darken-1" type="submit">Save</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import {
  createComponent,
  getComponent,
  updateComponent
} from "../../helpers/apiCalls/component";
export default {
  data() {
    return {
      loading: false,
      snackbarSuccess: false,
      snackbar: false,
      textSnackbar: "",
      name: "",
      description: "",
      url: "",
      files: [],
      rules: [v => !!v || "it's necessary"],
      action: ""
    };
  },
  mounted() {
    this.action = this.$route.query.action;
    if (this.action == "Update") {
      console.log("datos traido",this.$route.query.name)
      getComponent(this.$route.query.name).then(response => {
        this.name = response.data.data.name;
        this.description = response.data.data.info.description;
        this.url = response.data.data.info.url;
        console.log("datos traido",response)
     
      });
    }
  },
  methods: {
    createGamification: function() {
      
      if (this.$refs.form.validate()) {
        this.loading = true;
        let info = {
          name: this.name,
          info: {
            description: this.description,
            url: this.url,
            typeComponent: this.$route.query.typeComponent
          }
        }; 
        if (this.action == "Update") {
            updateComponent(this.$route.query.name,info).then(then=>{
              this.$refs.form.reset();
              this.textSnackbar = "Updated successfully";
              this.snackbarSuccess = true;
              this.loading = false;
            })
        } else {
          createComponent(info)
            .then(response => {
              this.$refs.form.reset();
              this.textSnackbar = "Created successfully";
              this.snackbarSuccess = true;
              this.loading = false;
            })
            .catch(error => {
              console.log(error.status);
              this.textSnackbar = "This component already exists";
              this.snackbar = true;
              this.loading = false;
            });
        }
      }
    },
    reset: function() {
      this.$refs.form.reset();
      this.$router.push(`/newComponent`);
    }
  }
};
</script>
