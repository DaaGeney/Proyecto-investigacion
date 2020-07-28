<template>
  <v-form ref="form" v-on:submit.prevent="createNewExperience" lazy-validation>
    <v-stepper v-model="e1" non-linear>
      <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
      <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{ textSnackbar }}</v-snackbar>
      <v-progress-linear :active="loading" :indeterminate="loading" absolute bottom color="primary"></v-progress-linear>
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
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Configuration</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">Facilitation</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">Core</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">Evaluation</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" flat>
            <v-subheader class="title">Information</v-subheader>
            <v-col>
              <v-text-field :rules="rules" counter label="Name" v-model="name" required></v-text-field>
              <v-textarea
                :rules="rules"
                v-model="description"
                counter
                label="Description"
                rows="1"
                required
              ></v-textarea>
              <v-autocomplete
                v-model="subjectMatter"
                :items="listSubject"
                :rules="rules"
                dense
                label="Subject Matter"
                required
              
                
              ></v-autocomplete>
            </v-col>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">Continue</v-btn>

          <v-btn text to="/gamificationExperience">Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-12" flat>
            <v-subheader class="title">Mandatory items</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listGamification"
                  dense
                  label="Gamification Component"
                  v-model="data.facilitation.gamification"
                  required
                  :rules="rules"
                  multiple
                  chips
                  small-chips
                  
                  counter
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/GamificationComponent?action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

          <v-btn text @click="e1 = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" flat>
            <v-subheader class="title">Mandatory items</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listGamification"
                  dense
                  label="Gamification Component"
                  v-model="data.core.gamification"
                  required
                  :rules="rules"
                  counter
                  multiple
                  chips
                  small-chips
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/GamificationComponent?action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTechnological"
                  dense
                  label="Technological Component"
                  v-model="data.core.technological"
                  required
                  :rules="rules"
                  counter
                  multiple
                  chips
                  small-chips
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/additionalComponent?typeComponent=Technological&action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-subheader class="title">Optional items</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listWeb"
                  dense
                  label="Web 2.0 Component"
                  v-model="data.core.web20"
                  multiple
                  chips
                  small-chips
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/additionalComponent?typeComponent=Web2.0&action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTraditional"
                  dense
                  label="Traditional Component"
                  v-model="data.core.traditional"
                  multiple
                  chips
                  small-chips
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/traditionalComponent?action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="verifyEvaluation">Continue</v-btn>
          <v-btn text @click="e1 = 2">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" flat>
            <v-subheader class="title">Mandatory items</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listGamification"
                  dense
                  label="Gamification Component"
                  v-model="data.evaluation.gamification"
                  required
                  :rules="rules"
                  multiple
                  chips
                  small-chips
                  counter
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/GamificationComponent?action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTechnological"
                  dense
                  label="Technological Component"
                  v-model="data.evaluation.technological"
                  multiple
                  chips
                  small-chips
                  counter
                  required
                  :rules="rules"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/additionalComponent?typeComponent=Technological&action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-row v-if="webNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listWeb"
                  dense
                  label="Web 2.0 Component"
                  v-model="data.evaluation.web20"
                  multiple
                  chips
                  small-chips
                  required
                  :rules="rules"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/additionalComponent?typeComponent=Web2.0&action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-row v-if="traditionalNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTraditional"
                  dense
                  label="Traditional Component"
                  v-model="data.evaluation.traditional"
                  multiple
                  chips
                  small-chips 
                  required
                  :rules="rules"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/traditionalComponent?action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-subheader class="title" v-if="!webNecessary || !traditionalNecessary">Optional items</v-subheader>

            <v-row v-if="!webNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listWeb"
                  dense
                  label="Web 2.0 Component"
                  v-model="data.evaluation.web20"
                  multiple
                  chips
                  small-chips
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/additionalComponent?typeComponent=Web2.0&action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
            <v-row v-if="!traditionalNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTraditional"
                  dense
                  label="Traditional Component"
                  v-model="data.evaluation.traditional"
                  multiple
                  chips
                  small-chips 
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  text
                  color="primary"
                  to="/newComponent/traditionalComponent?action=Create"
                >Create new...</v-btn>
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" type="submit">Create</v-btn>

          <v-btn text @click="e1 = 3">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import { createExperience } from "../../helpers/apiCalls/experience";
import { getComponents } from "../../helpers/apiCalls/component";
import { getSubjects } from "../../helpers/apiCalls/subjectMatter";
export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
      subjectMatter: "",
      listSubject: [],
      listGamification: [],
      listTraditional: [],
      listWeb: [],
      listTechnological: [],
      snackbarSuccess: false,
      rules: [(v) => !!v || "it's necessary", v => v.length >=  1 ||"it's necessary"],
      snackbar: false,
      textSnackbar: "",
      loading: false,
      e1: 1,
      name: "",
      description: "",
      show: false,
      data: {
        facilitation: {
          gamification: "",
        },
        core: {
          gamification: "",
          technological: "",
          web20: "",
          traditional: "",
        },
        evaluation: {
          gamification: "",
          technological: "",
          web20: "",
          traditional: "",
        },
      },
      topico: "",
      list: ["1", "2"],
      webNecessary:false,
      traditionalNecessary:false,
      items: [
        {
          text: "Index ",
          disabled: false,
          to: "/",
        },
        {
          text: `Gamification Experience`,
          disabled: false,
          href: "/gamificationExperience",
        },
        {
          text: `Define Experience`,
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  mounted() {
    this.getAllComponents();
  },
  methods: {
    createNewExperience() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        let info = {
          name: this.name,
          description: this.description,
          subjectMatter: this.subjectMatter,
          data: this.data,
        };
        createExperience(info)
          .then((response) => {
            this.$refs.form.reset();
            this.textSnackbar = "Created successfully";
            this.snackbarSuccess = true;
            this.loading = false;
            this.e1 = "1";
          })
          .catch((error) => {
            this.e1 = "1";
            this.textSnackbar = "This experience already exists";
            this.snackbar = true;
            this.loading = false;
          });
      } else {
        this.textSnackbar = "check mandatory fields";
        this.snackbar = true;
        this.loading = false;
      }
    },
    getAllComponents() {
      getComponents()
        .then((response) => {
          let aux = response.data.data;
          let temp = aux.filter((e) => e.info.typeComponent == "Gamification");
          this.listGamification = temp.map((e) => e.name);
          temp = aux.filter((e) => e.info.typeComponent == "Traditional");
          this.listTraditional = temp.map((e) => e.name);
          temp = aux.filter((e) => e.info.typeComponent == "Web2.0");
          this.listWeb = temp.map((e) => e.name);
          temp = aux.filter((e) => e.info.typeComponent == "Technological");
          this.listTechnological = temp.map((e) => e.name);
        })
        .catch((error) => {
          console.log(error);
        });
      getSubjects().then((response) => {
        this.listSubject = response.data.data.map((e) => e.topic);
      });
    },
    verifyEvaluation(){
      console.log(this.data);
      this.e1 = 4
      this.data.core.web20 !="" ? this.webNecessary=true : this.webNecessary = false
      this.data.core.traditional !="" ? this.traditionalNecessary=true : this.traditionalNecessary=false
    }
  },
};
</script>