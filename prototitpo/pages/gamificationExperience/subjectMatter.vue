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

    <v-form
      ref="form"
      v-on:submit.prevent="createSubjectMatter"
      lazy-validation
    >
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
              <span>{{ $t("back") }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row>
          <v-subheader class="title"
            >{{ this.$route.query.action }}
            {{ $t("subject.title") }}</v-subheader
          >
          <v-col cols="12">
            <v-text-field
              :rules="rules"
              counter
              v-model="topic"
              v-bind:label="$t('subject.t1')"
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              counter
              v-model="subject"
              v-bind:label="$t('subject.t2')"
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              counter
              v-model="level"
              v-bind:label="$t('subject.t3')"
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              counter
              v-model="program"
              v-bind:label="$t('subject.t4')"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text :to='localePath("/gamificationExperience")' >{{
            $t("cancel")
          }}</v-btn>
          <v-btn color="blue darken-1" type="submit">{{ $t("save") }}</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import { createSubject } from "../../helpers/apiCalls/subjectMatter";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
      loading: false,
      config: "",
      snackbarSuccess: false,
      snackbar: false,
      textSnackbar: "",
      subject: "",
      show: false,
      level: "",
      program: "",
      topic: "",
      rules: [(v) => !!v || "it's necessary"],
      items: [
        {
          text: this.$t("subject.route"),
          disabled: false,
          to: "/",
        },
        {
          text: this.$t("subject.route2"),
          disabled: true,
          href: "/gamificationExperience/",
        },

        {
          text: this.$t("subject.title"),
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
  },
  methods: {
    createSubjectMatter: function () {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let info = {
          topic: this.topic,
          subject: this.subject,
          level: this.level,
          program: this.program,
        };

        createSubject(info, this.config)
          .then((response) => {
            this.$refs.form.reset();
            this.textSnackbar = "Created successfully";
            this.snackbarSuccess = true;
            this.loading = false;
          })
          .catch((error) => {
            this.textSnackbar = "This topic already exists";
            this.snackbar = true;
            this.loading = false;
          });
      }
    },
    reset: function () {
      this.$refs.form.reset();
      this.$router.push(`/`);
    },
  },
};
</script>