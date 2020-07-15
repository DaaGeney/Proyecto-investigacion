<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
    <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{ textSnackbar }}</v-snackbar>
    <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>

    <v-form ref="form" v-on:submit.prevent="createGamification" lazy-validation>
      <v-container>
        <div>
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon>mdi-forward</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
        <v-row>
          <v-subheader class="title">{{this.$route.query.action}} Gamification Component</v-subheader>
          <v-col cols="12">
            <v-text-field :rules="rules" v-model="name" label="Name" counter  required></v-text-field>
            <v-textarea :rules="rules" v-model="description" counter label="Description" rows="1" required></v-textarea>
            <v-text-field :rules="rules" v-model="url" label="URL" counter required></v-text-field>
            <v-text-field :rules="rules" v-model="studentsTeam" counter label="Students per team" required></v-text-field>
            <v-textarea :rules="rules" v-model="length" label="Length" counter required rows="1"></v-textarea>
            <v-text-field :rules="rules" v-model="space" label="Space" counter required></v-text-field>
            <v-text-field :rules="rules" v-model="materials" label="Materials" counter required></v-text-field>
            <v-autocomplete
              v-model="subjectMatter"
              :items="listSubject"
              :rules="rules"
              dense
              label="Subject Matter"
              required
            ></v-autocomplete>
            <v-text-field :rules="rules" counter v-model="purpose" label="Purpose" required></v-text-field>

            <v-row>
              <v-col cols="12" sm="11">
                <v-autocomplete
                  v-model="learningObjetive"
                  :items="list"
                  :rules="rules"
                  dense
                  chips
                  small-chips
                  label="Learning objetive"
                  multiple
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="1">
                <v-tooltip v-model="show" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click.stop="dialog = true">
                      <v-icon color="primary">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Create learning objetive</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-textarea
              :rules="rules"
              v-model="studentsInstructions"
              label="Students instructions"
              required counter
              rows="1"
            ></v-textarea>
            <v-textarea
              :rules="rules"
              v-model="instructorsInstructions"
              label="Instructors instructions"
              required counter
              rows="1"
            ></v-textarea>

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
    <v-dialog v-model="dialog" max-width="400">
      <v-form ref="form2">
        <v-card>
          <v-card-title class="headline">Create learning objetive</v-card-title>
          <v-card-text>
            <v-text-field :rules="rules" label="Name" v-model="infoObjetive.name" required></v-text-field>
            <v-textarea
              :rules="rules"
              label="Description"
              rows="2"
              v-model="infoObjetive.description"
              required
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false;$refs.form2.reset()">Disagree</v-btn>
            <v-btn color="primary" text @click="addNewObjetive">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  createComponent,
  updateComponent,
  getComponent
} from "../../helpers/apiCalls/component";
import {
  createObjetive,
  getObjetives
} from "../../helpers/apiCalls/learningObjetives";
import { getSubjects } from "../../helpers/apiCalls/subjectMatter";
export default {
  data() {
    return {
      list: [],
      listSubject: [],
      show: false,
      dialog: false,
      action: "",
      loading: false,
      snackbarSuccess: false,
      snackbar: false,
      textSnackbar: "",
      name: "",
      description: "",
      url: "",
      studentsTeam: "",
      length: "",
      space: "",
      materials: "",
      subjectMatter: "",
      purpose: "",
      learningObjetive: "",
      studentsInstructions: "",
      instructorsInstructions: "",
      files: [],
      rules: [v => !!v || "it's necessary"],
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
          text: `${this.$route.query.action} Gamification Component`,
          disabled: true,
          to: "/NewComponent/GamificationComponent"
        }
      ],
      infoObjetive: {
        name: "",
        description: ""
      }
    };
  },
  mounted() {
    this.getAllObjetives();
    this.action = this.$route.query.action;
    if (this.action == "Update") {
      getComponent(this.$route.query.name).then(response => {
        console.log(response.data.data);
        this.name = response.data.data.name;
        this.description = response.data.data.info.description;
        this.url = response.data.data.info.url;
        this.studentsTeam = response.data.data.info.studentsTeam;
        this.length = response.data.data.info.length;
        this.space = response.data.data.info.space;
        this.materials = response.data.data.info.materials;
        this.subjectMatter = response.data.data.info.subjectMatter;
        this.purpose = response.data.data.info.purpose;
        this.learningObjetive = response.data.data.info.learningObjetive;
        this.studentsInstructions =
          response.data.data.info.studentsInstructions;
        this.instructorsInstructions =
          response.data.data.info.instructorsInstructions;
        this.typeComponent = "Gamification";
      });
    }
  },
  methods: {
    createGamification: function() {
      this.getBase64(this.files[0])
      if (this.$refs.form.validate()) {
        console.log(this.files);
        this.loading = true;
        let info = {
          name: this.name,
          info: {
            description: this.description,
            url: this.url,
            studentsTeam: this.studentsTeam,
            length: this.length,
            space: this.space,
            materials: this.materials,
            subjectMatter: this.subjectMatter,
            purpose: this.purpose,
            learningObjetive: this.learningObjetive,
            studentsInstructions: this.studentsInstructions,
            instructorsInstructions: this.instructorsInstructions,
            typeComponent: "Gamification"
          }
        };
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
      this.$router.push(`/newComponent`);
    },
    getAllObjetives: function() {
      getObjetives().then(response => {
        this.list = response.data.data.map(e => e.name);
      });
      getSubjects().then(response => {
        this.listSubject = response.data.data.map(e => e.topic);
      });
    },
    addNewObjetive: function() {
      createObjetive(this.infoObjetive)
        .then(response => {
          this.getAllObjetives();
          this.$refs.form2.reset();
          this.dialog = false;
          this.textSnackbar = "Learning Objetive created successfully";
          this.snackbarSuccess = true;
        })
        .catch(error => {
          this.textSnackbar = "This learning objetive already exists";
          this.snackbar = true;
        });
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        console.log(reader.result);
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    }
  }
};
</script>
