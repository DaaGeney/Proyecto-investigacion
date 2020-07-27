<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
    <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{ textSnackbar }}</v-snackbar>
    <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>
    <v-form ref="form" v-on:submit.prevent="createGamification" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="12" sm="11">
            <div>
              <v-breadcrumbs :items="items">
                <template v-slot:divider>
                  <v-icon>mdi-forward</v-icon>
                </template>
              </v-breadcrumbs>
            </div>
          </v-col>
          <v-col cols="12" sm="1">
            <v-tooltip v-model="show" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="$router.go(-1)">
                  <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
              </template>
              <span>Back</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-subheader class="title">{{this.$route.query.action}} traditional Component</v-subheader>
          <v-col cols="12">
            <v-text-field :rules="rules" v-model="name" label="Name" counter ></v-text-field>
            <v-textarea :rules="rules" v-model="description" counter label="Description" rows="1"></v-textarea>
            <v-text-field :rules="rules" v-model="url" label="URL" counter required ></v-text-field>

            <v-file-input
              :rules="rules"
              v-model="files"
              small-chips
              counter
              :show-size="1000"
              multiple
              label="Attached files"
            ></v-file-input>
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
import { createFile} from "../../helpers/apiCalls/file"
export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
      show:false,
      loading: false,
      snackbarSuccess: false,
      snackbar: false,
      textSnackbar: "",
      name: "",
      description: "",
      url: "",
      files: [],
      rules: [v => !!v || "it's necessary"],
      action: "",
      items: [
        {
          text: "Index ",
          disabled: false,
          to: "/"
        },
        {
          text: "Manage Components",
          disabled: false,
          to: "/NewComponent"
        },
        {
          text: `${this.$route.query.action} Traditional Component`,
          disabled: true,
          to: "/NewComponent/traditionalComponent"
        }
      ],
      typeComponent : "Traditional"
    };
  },
  mounted() {
    this.action = this.$route.query.action;
    if (this.action == "Update") {
      getComponent(this.$route.query.name).then(response => {
        console.log(response.data.data);
        this.name = response.data.data.name;
        this.description = response.data.data.info.description;
        this.url = response.data.data.info.url;
        this.typeComponent = "Traditional";
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
            attachments: this.attachments,
            typeComponent: this.typeComponent
          }
        };
        this.sendNewFile()
        if (this.action == "Update") {
          updateComponent(this.$route.query.name, info)
            .then(response => {
              this.$refs.form.reset();
              this.textSnackbar = "Updated successfully";
              this.snackbarSuccess = true;
              this.loading = false;
            })
            .catch(error => {
              this.textSnackbar = "Error";
              this.snackbar = true;
              this.loading = false;
            });
        } else {
          createComponent(info)
            .then(response => {
              this.$refs.form.reset();
              this.textSnackbar = "Created successfully";
              this.snackbarSuccess = true;
              this.loading = false;
            })
            .catch(error => {
              this.textSnackbar = "This component already exists";
              this.snackbar = true;
              this.loading = false;
            });
        }
      }
    },
    reset: function() {
      this.$refs.form.reset();
    
      this.$router.go(-1)
    },
     sendNewFile() {
      if (this.files.length > 0) {
        let formData = new FormData();
        // formData.append("file",this.files[0])
        this.files.forEach(element => {
          formData.append(element.name, element);
        });
        console.log(this.typeComponent, this.name);
        createFile(formData, this.typeComponent, this.name);
      }
    }
  }
};
</script>
