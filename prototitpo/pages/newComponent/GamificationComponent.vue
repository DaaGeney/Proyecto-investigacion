<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
    <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{ textSnackbar }}</v-snackbar>
    <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>
    <v-form ref="form" v-on:submit.prevent="createGamification" lazy-validation>
      <v-container>
        <v-row>
          <v-subheader class="title">Create Gamification Component</v-subheader>
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
            <v-text-field
              :rules="rules"
              v-model="studentsTeam"
              label="Students per team"
              filled
              shaped
              required
              outlined
            ></v-text-field>
            <v-textarea
              :rules="rules"
              v-model="length"
              label="Length"
              filled
              shaped
              required
              outlined
              rows="1"
            ></v-textarea>
            <v-text-field
              :rules="rules"
              v-model="space"
              label="Space"
              filled
              shaped
              required
              outlined
            ></v-text-field>
            <v-text-field
              :rules="rules"
              v-model="materials"
              label="Materials"
              filled
              shaped
              required
              outlined
            ></v-text-field>
            <v-text-field
              :rules="rules"
              v-model="subjectMatter"
              label="Subject Matter"
              filled
              shaped
              required
              outlined
            ></v-text-field>
            <v-text-field
              :rules="rules"
              v-model="purpose"
              label="Purpose"
              filled
              shaped
              required
              outlined
            ></v-text-field>
            <v-textarea
              :rules="rules"
              v-model="learningObjetive"
              label="Learning objetive"
              filled
              shaped
              required
              rows="1"
              outlined
            ></v-textarea>
            <v-textarea
              :rules="rules"
              v-model="studentsInstructions"
              label="Students instructions"
              filled
              shaped
              required
              outlined
              rows="1"
            ></v-textarea>
            <v-textarea
              :rules="rules"
              v-model="instructorsInstructions"
              label="Instructors instructions"
              filled
              shaped
              required
              outlined
              rows="1"
            ></v-textarea>

            <v-file-input
              :rules="rules"
              v-model="files"
              small-chips
              filled
              outlined
              shaped
              counter
              :show-size="1000"
              multiple
              label="Attached files"
            ></v-file-input>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" type="submit">Save</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import { createGamificationComponent } from "../../helpers/apiCalls/createComponent";
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
      studentsTeam: "",
      length: "",
      space: 0,
      materials: "",
      subjectMatter: "",
      purpose: "",
      learningObjetive: "",
      studentsInstructions: "",
      instructorsInstructions: "",
      files: [],
      rules: [v => !!v || "it's necessary"]
    };
  },
  methods: {
    createGamification: function() {
      console.log(this.$refs.form.validate());
      if (this.$refs.form.validate()) {
        this.loading = true;
        let dates = {
          name: this.name,
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
          instructorsInstructions: this.instructorsInstructions
        };
        createGamificationComponent(dates)
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
  }
};
</script>
