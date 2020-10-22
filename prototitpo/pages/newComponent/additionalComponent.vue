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
            {{ this.$route.query.typeComponent }}
          </v-subheader>
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
              v-bind:label="$t('components.description')"
              counter
              rows="1"
            ></v-textarea>
            <v-text-field
              :rules="rules"
              v-model="url"
              label="URL"
              counter
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">{{
            $t("cancel")
          }}</v-btn>
          <v-btn color="blue darken-1" type="submit">{{ $t("save") }}</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import {
  createComponent,
  getComponent,
  updateComponent,
} from "../../helpers/apiCalls/component";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
      read: false,
      config: "",
      show: false,
      loading: false,
      snackbarSuccess: false,
      snackbar: false,
      textSnackbar: "",
      name: "",
      description: "",
      url: "",
      files: [],
      rules: [(v) => !!v || "it's necessary"],
      action: "",
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
          text: `${this.$route.query.action} ${this.$route.query.typeComponent} `,
          disabled: true,
          to: "/NewComponent/additionalComponent",
        },
      ],
    };
  },
  mounted() {
    this.config = {
      headers: { authorization: Cookie.get("auth") },
    };
    this.action = this.$route.query.action;
    if (this.action == "Update") {
      this.read = true;
      getComponent(this.$route.query.name, this.config).then((response) => {
        this.name = response.data.data.name;
        this.description = response.data.data.info.description;
        this.url = response.data.data.info.url;
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
            typeComponent: this.$route.query.typeComponent,
          },
        };
        if (this.action == "Update") {
          updateComponent(this.$route.query.name, info, this.config).then(
            (then) => {
              this.$refs.form.reset();
              this.textSnackbar = "Updated successfully";
              this.snackbarSuccess = true;
              this.loading = false;
            }
          );
        } else {
          createComponent(info, this.config)
            .then((response) => {
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
  },
};
</script>
