<template>
  <v-form ref="form" v-on:submit.prevent="createNewExperience" lazy-validation>
    <v-stepper v-model="e1" non-linear>
      <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{
        textSnackbar
      }}</v-snackbar>
      <v-snackbar
        v-model="snackbarSuccess"
        top
        color="success"
        :timeout="2500"
        >{{ textSnackbar }}</v-snackbar
      >
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        bottom
        color="primary"
      ></v-progress-linear>
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
            <span>{{ $t("back") }}</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"
          >{{$t('experience.configuration')}}</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"
          >{{$t('experience.facilitation')}}</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3">{{$t('experience.core')}}</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4">{{$t('experience.evaluation')}}</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" flat>
            <v-subheader class="title">{{$t('experience.information')}}</v-subheader>
            <v-col>
              <v-text-field
                :rules="rulesText"
                counter
                v-bind:label="$t('components.name')"
                v-model="name"
                required
              ></v-text-field>
              <v-textarea
                :rules="rulesText"
                v-model="description"
                counter
                v-bind:label="$t('components.description')"
                rows="1"
                required
              ></v-textarea>
              <v-autocomplete
                v-model="subjectMatter"
                :items="listSubject"
                :rules="rulesText"
                dense
                v-bind:label="$t('components.subject')"
                required
              ></v-autocomplete>
            </v-col>
          </v-card>

          <v-btn color="primary" @click="e1 = 2">{{$t('continue')}}</v-btn>

          <v-btn text :to='localePath("/gamificationExperience")'>{{$t('cancel')}}</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-12" flat>
            <v-subheader class="title">{{$t('experience.mandatory')}}</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listGamification"
                  dense
                  v-bind:label="$t('components.type1')"
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
                  :to='localePath("/newComponent/GamificationComponent?action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" @click="e1 = 3">{{$t('continue')}}</v-btn>

          <v-btn text @click="e1 = 1">{{$t('back')}}</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" flat>
            <v-subheader class="title">{{$t('experience.mandatory')}}</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listGamification"
                  dense
                  v-bind:label="$t('components.type1')"
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
                  :to='localePath("/newComponent/GamificationComponent?action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTechnological"
                  dense
                  v-bind:label="$t('components.type4')"
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
                  :to='localePath("/newComponent/additionalComponent?typeComponent=Technological&action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-subheader class="title">{{$t('experience.optional')}}</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listWeb"
                  dense
                  v-bind:label="$t('components.type3')"
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
                  :to='localePath("/newComponent/additionalComponent?typeComponent=Web2.0&action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTraditional"
                  dense
                  v-bind:label="$t('components.type2')"
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
                  :to='localePath("/newComponent/traditionalComponent?action=Create")'

                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
          <v-btn color="primary" @click="verifyEvaluation">{{$t('continue')}}</v-btn>
          <v-btn text @click="e1 = 2">{{$t('back')}}</v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-card class="mb-12" flat>
            <v-subheader class="title">{{$t('experience.mandatory')}}</v-subheader>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listGamification"
                  dense
                  v-bind:label="$t('components.type1')"
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
                  :to='localePath("/newComponent/GamificationComponent?action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTechnological"
                  dense
                  v-bind:label="$t('components.type4')"
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
                  :to='localePath("/newComponent/additionalComponent?typeComponent=Technological&action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row v-if="webNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listWeb"
                  dense
                  v-bind:label="$t('components.type3')"
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
                  :to='localePath("/newComponent/additionalComponent?typeComponent=Web2.0&action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row v-if="traditionalNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTraditional"
                  dense
                  v-bind:label="$t('components.type2')"
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
                  :to='localePath("/newComponent/traditionalComponent?action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-subheader
              class="title"
              v-if="!webNecessary || !traditionalNecessary"
              >{{$t('experience.optional')}}</v-subheader
            >

            <v-row v-if="!webNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listWeb"
                  dense
                   v-bind:label="$t('components.type3')"
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
                
                  :to='localePath("/newComponent/additionalComponent?typeComponent=Web2.0&action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
            <v-row v-if="!traditionalNecessary">
              <v-col cols="12" sm="10">
                <v-autocomplete
                  :items="listTraditional"
                  dense
                  v-bind:label="$t('components.type2')"
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
                 
                  :to='localePath("/newComponent/traditionalComponent?action=Create")'
                  >{{$t('experience.add')}}</v-btn
                >
              </v-col>
            </v-row>
          </v-card>

          <v-btn color="primary" type="submit">{{$t('save')}}</v-btn>

          <v-btn text @click="e1 = 3">{{$t('back')}}</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form>
</template>

<script>
import { createExperience } from "../../helpers/apiCalls/experience";
import { getComponents } from "../../helpers/apiCalls/component";
import { getSubjects } from "../../helpers/apiCalls/subjectMatter";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
      config: "",
      subjectMatter: "",
      listSubject: [],
      listGamification: [],
      listTraditional: [],
      listWeb: [],
      listTechnological: [],
      snackbarSuccess: false,
      rulesText: [(v) => !!v || "it's necessary"],
      rules: [
        (v) => !!v || "it's necessary",
        (v) => v.length >= 1 || "it's necessary",
      ],
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
      webNecessary: false,
      traditionalNecessary: false,
      items: [
        {
          text: this.$t("subject.route"),
          disabled: false,
          to: "/",
        },
        {
          text: this.$t("subject.route2"),
          disabled: true,
          href: "/gamificationExperience",
        },
        {
          text: this.$t("experience.title"),
          disabled: true,
          to: "/",
        },
      ],
    };
  },
  mounted() {
    this.config = {
      headers: { authorization: Cookie.get("auth") },
    };
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
        createExperience(info, this.config)
          .then((response) => {
            this.$refs.form.reset();
            this.textSnackbar = "Created successfully";
            this.snackbarSuccess = true;
            this.loading = false;

            this.data = {
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
            };
            this.subjectMatter = "";
            this.name = "";
            this.description = "";
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
      getComponents(Cookie.get("id"), this.config)
        .then((response) => {
          let aux = response.data.data;
          console.log(aux);
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
      getSubjects(this.config).then((response) => {
        this.listSubject = response.data.data.map((e) => e.topic);
      });
    },
    verifyEvaluation() {
      console.log(this.data);
      this.e1 = 4;
      this.data.core.web20 != ""
        ? (this.webNecessary = true)
        : (this.webNecessary = false);
      this.data.core.traditional != ""
        ? (this.traditionalNecessary = true)
        : (this.traditionalNecessary = false);
    },
  },
};
</script>