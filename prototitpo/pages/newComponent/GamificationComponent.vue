<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{
      textSnackbar
    }}</v-snackbar>
    <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{
      textSnackbar
    }}</v-snackbar>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      bottom
      color="primary"
    ></v-progress-linear>

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
            <v-tooltip v-model="showBack" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="$router.go(-1)">
                  <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
              </template>
              <span>{{ $t("back") }}</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row>
          <v-subheader class="title"
            >{{ this.$route.query.action }}
            {{ $t("components.gamificationComponent") }}</v-subheader
          >
          <v-col cols="12">
            <v-text-field
              :rules="rules"
              v-model="name"
              v-bind:label="$t('components.name')"
              counter
              :readonly="read"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              v-model="description"
              counter
              v-bind:label="$t('components.description')"
              rows="1"
              required
            ></v-textarea>
            <v-text-field
              :rules="rules"
              v-model="url"
              label="URL"
              counter
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              v-model="studentsTeam"
              counter
              v-bind:label="$t('components.studentsTeam')"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              v-model="length"
              v-bind:label="$t('components.length')"
              counter
              required
              rows="1"
            ></v-textarea>
            <v-text-field
              :rules="rules"
              v-model="space"
              v-bind:label="$t('components.space')"
              counter
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              v-model="materials"
              v-bind:label="$t('components.materials')"
              counter
              required
            ></v-text-field>
            <v-autocomplete
              v-model="subjectMatter"
              :items="listSubject"
              :rules="rules"
              dense
              v-bind:label="$t('components.subject')"
              required
            ></v-autocomplete>
            <v-text-field
              :rules="rules"
              counter
              v-model="purpose"
              v-bind:label="$t('components.purpose')"
              required
            ></v-text-field>

            <v-row>
              <v-col cols="12" sm="11">
                <v-autocomplete
                  v-model="learningObjetive"
                  :items="list"
                  :rules="rulesLearning"
                  dense
                  chips
                  small-chips
                  v-bind:label="$t('components.learning')"
                  multiple
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="1">
                <v-tooltip v-model="show" top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click.stop="dialog = true"
                    >
                      <v-icon color="primary">mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>{{ $t("newLearning") }}</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-textarea
              :rules="rules"
              v-model="studentsInstructions"
              v-bind:label="$t('components.students')"
              required
              counter
              rows="1"
            ></v-textarea>
            <v-textarea
              :rules="rules"
              v-model="instructorsInstructions"
              v-bind:label="$t('components.instructors')"
              required
              counter
              rows="1"
            ></v-textarea>

            <v-file-input
              v-model="files"
              small-chips
              counter
              :show-size="1000"
              multiple
              v-bind:label="$t('components.file')"
            ></v-file-input>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset"
            ><span>{{ $t("cancel") }}</span></v-btn
          >
          <v-btn color="blue darken-1" type="submit"
            ><span>{{ $t("save") }}</span></v-btn
          >
        </v-card-actions>
      </v-container>
    </v-form>
    <v-dialog v-model="dialog" max-width="400">
      <v-form ref="form2">
        <v-card>
          <v-card-title class="headline">{{ $t("newLearning") }}</v-card-title>
          <v-card-text>
            <v-text-field
              :rules="rules"
              v-bind:label="$t('components.name')"
              v-model="infoObjetive.name"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              v-bind:label="$t('components.description')"
              rows="2"
              v-model="infoObjetive.description"
              required
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                dialog = false;
                $refs.form2.reset();
              "
              >{{ $t("cancel") }}</v-btn
            >
            <v-btn color="primary" text @click="addNewObjetive">{{
              $t("save")
            }}</v-btn>
          </v-card-actions>
          <v-progress-linear
            :active="charging"
            :indeterminate="charging"
            absolute
            bottom
            color="primary"
          ></v-progress-linear>
        </v-card>
      </v-form>
    </v-dialog>
  </v-card>
</template>
<script>
import {
  createComponent,
  updateComponent,
  getComponent,
} from "../../helpers/apiCalls/component";
import {
  createObjetive,
  getObjetives,
} from "../../helpers/apiCalls/learningObjetives";
import { getSubjects } from "../../helpers/apiCalls/subjectMatter";
import { createFile } from "../../helpers/apiCalls/file";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
      read: false,
      config: "",
      list: [],
      charging: false,
      listSubject: [],
      show: false,
      showBack: false,
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
      learningObjetive: [],
      studentsInstructions: "",
      instructorsInstructions: "",
      files: [],
      typeComponent: "Gamification",
      rulesLearning: [
        (v) => !!v || "it's necessary",
        (v) => v.length >= 1 || "it's necessary",
      ],
      rules: [(v) => !!v || "it's necessary"],
      items: [
        {
          text: this.$t("subject.route"),
          disabled: false,
          to: "/",
        },
        {
          text: this.$t("components.manageComponents"),
          disabled: false,
          to: "/NewComponent",
        },
        {
          text: `${this.$route.query.action} ${this.$t(
            "components.gamificationComponent"
          )}`,
          disabled: true,
          to: "/NewComponent/GamificationComponent",
        },
      ],
      infoObjetive: {
        name: "",
        description: "",
      },
    };
  },
  mounted() {
    this.config = {
      headers: { authorization: Cookie.get("auth") },
    };
    this.getAllObjetives();
    this.action = this.$route.query.action;
    if (this.action == "Update") {
      this.read = true;
      getComponent(this.$route.query.name, this.config).then((response) => {
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
        this.typeComponent = this.typeComponent;
      });
    }
  },
  methods: {
    createGamification: function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let info = {
          name: this.name,
          idUser: Cookie.get("id"),
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
            typeComponent: this.typeComponent,
          },
        };

        if (this.action == "Update") {
          updateComponent(this.$route.query.name, info, this.config)
            .then((response) => {
              this.sendNewFile();
              this.textSnackbar = "Updated successfully";
              this.snackbarSuccess = true;
              this.loading = false;
            })
            .catch((error) => {
              this.textSnackbar = "Error";
              this.snackbar = true;
              this.loading = false;
            });
        } else {
          createComponent(info, this.config)
            .then((response) => {
              this.sendNewFile();
              this.$refs.form.reset();
              this.textSnackbar = "Created successfully";
              this.snackbarSuccess = true;

              this.loading = false;
            })
            .catch((error) => {
              this.textSnackbar = "This component already exists";
              this.snackbar = true;
              this.loading = false;
            });
        }
      }
    },
    reset: function () {
      this.$refs.form.reset();
      this.$router.go(-1);
    },
    getAllObjetives: function () {
      getObjetives(this.config).then((response) => {
        this.list = response.data.data.map((e) => e.name);
      });
      getSubjects(this.config).then((response) => {
        this.listSubject = response.data.data.map((e) => e.topic);
      });
    },
    addNewObjetive: function () {
      if (this.$refs.form2.validate()) {
        this.charging = true;
        createObjetive(this.infoObjetive, this.config)
          .then((response) => {
            this.getAllObjetives();
            this.$refs.form2.reset();
            this.dialog = false;
            this.textSnackbar = "Learning Objetive created successfully";
            this.snackbarSuccess = true;
            this.charging = false;
          })
          .catch((error) => {
            this.textSnackbar = "This learning objetive already exists";
            this.snackbar = true;
            this.charging = false;
          });
      }
    },
    sendNewFile() {
      if (this.files.length > 0) {
        let formData = new FormData();
        // formData.append("file",this.files[0])
        this.files.forEach((element) => {
          formData.append(element.name, element);
        });
        createFile(formData, this.typeComponent, this.name);
      }
    },
  },
};
</script>
