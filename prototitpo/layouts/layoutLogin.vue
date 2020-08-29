<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-form
                  ref="form"
                  v-on:submit.prevent="startSesion"
                  v-if="!register"
                  lazy-validation
                >
                  <v-card class="elevation-12">
                    <v-snackbar
                      v-model="snackbar"
                      top
                      color="error"
                      :timeout="3000"
                    >{{ textSnackbar }}</v-snackbar>
                    <v-snackbar
                      v-model="snackbarSuccess"
                      top
                      color="success"
                      :timeout="2500"
                    >{{ textSnackbar }}</v-snackbar>
                    <v-progress-linear
                      :active="loading"
                      :indeterminate="loading"
                      absolute
                      bottom
                      color="primary"
                    ></v-progress-linear>
                    <v-toolbar color="white" flat>
                      <v-toolbar-title>Login</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                      <v-text-field
                        label="Email"
                        name="login"
                        v-model="email"
                        prepend-icon="mdi-email"
                        type="text"
                        :rules="emailRules"
                        required
                      ></v-text-field>

                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        v-model="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      <v-col align="center" justify="center">
                        <div class="text-center">
                          <v-dialog v-model="dialog" persistent width="500">
                            <template v-slot:activator="{ on }">
                              <v-btn
                                class="caption"
                                color="primary"
                                v-on="on"
                                text
                              >I forgot my password</v-btn>
                            </template>

                            <v-form
                              ref="formRestore"
                              v-on:submit.prevent="restorePassword"
                              lazy-validation
                            >
                              <v-card>
                                <v-progress-linear
                                  :active="waiting"
                                  :indeterminate="waiting"
                                  absolute
                                  bottom
                                  color="primary"
                                ></v-progress-linear>
                                <v-card-title
                                  class="headline grey lighten-2"
                                  primary-title
                                >Restore password</v-card-title>

                                <v-card-text>
                                  <v-text-field
                                    id="emailRestore"
                                    label="Email"
                                    name="RestoreEmail"
                                    prepend-icon="mdi-email"
                                    type="email"
                                    :rules="emailRules"
                                    v-model="restoreEmail"
                                    required
                                  />
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                                  <v-btn color="blue darken-1" text type="submit">Restore</v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-form>
                          </v-dialog>
                        </div>
                      </v-col>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="change" text>I haven't account</v-btn>

                      <v-btn color="primary" type="submit">Log in</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
                <v-form ref="form" v-on:submit.prevent="registerUser" v-else lazy-validation>
                  <v-card class="elevation-12">
                    <v-snackbar
                      v-model="snackbar"
                      top
                      color="error"
                      :timeout="3000"
                    >{{ textSnackbar }}</v-snackbar>
                    <v-snackbar
                      v-model="snackbarSuccess"
                      top
                      color="success"
                      :timeout="2500"
                    >{{ textSnackbar }}</v-snackbar>
                    <v-progress-linear
                      :active="loading"
                      :indeterminate="loading"
                      absolute
                      bottom
                      color="primary"
                    ></v-progress-linear>
                    <v-toolbar color="white" flat>
                      <v-toolbar-title>Sign Up</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <div>
                      <v-card-text>
                        <v-text-field
                          label="Name"
                          name="Name"
                          v-model="name"
                          prepend-icon="mdi-account"
                          type="text"
                          :rules="nameRules"
                          required
                        ></v-text-field>
                        <v-text-field
                          label="Email"
                          name="email"
                          v-model="email"
                          prepend-icon="mdi-email"
                          type="email"
                          :rules="emailRules"
                          required
                        ></v-text-field>

                        <v-text-field
                          id="password"
                          label="Password"
                          name="password"
                          v-model="password"
                          prepend-icon="mdi-lock"
                          type="password"
                          :rules="passwordRules"
                          required
                        ></v-text-field>
                      </v-card-text>
                    </div>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="change" text>I've account</v-btn>

                      <v-btn color="primary" type="submit">Sign UP</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import { logIn } from "../helpers/apiCalls/auth";
const Cookie = process.client ? require("js-cookie") : undefined;
import { createUser, sendEmail } from "../helpers/apiCalls/auth";

export default {
  data() {
    return {
      restoreEmail: "",
      waiting: false,
      dialog: false,
      name: "",
      register: false,
      loading: false,
      snackbarSuccess: false,
      snackbar: false,
      textSnackbar: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "Email invalid",
        (v) => /.+@.+\..+/.test(v) || "email invalid",
      ],
      passwordRules: [(v) => !!v || "password necessary"],
      nameRules: [(v) => !!v || "it's necessary"],
    };
  },
  props: {
    source: String,
  },
  methods: {
    startSesion() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let info = {
          email: this.email,
          password: this.password,
        };
        logIn(info)
          .then((response) => {
            this.loading = false;
            const auth = response.data.token;
            const id = response.data.data._id;
            const role = response.data.data.role;
            Cookie.set("auth", auth); // saving token in cookie for server rendering
            Cookie.set("id", id); // saving token in cookie for server rendering
            Cookie.set("role", role); // saving token in cookie for server rendering
            this.$router.push("/gamificationExperience");
          })
          .catch((error) => {
            this.textSnackbar = "invalid credentials";
            this.snackbar = true;
            this.loading = false;
          });
      }
    },
    change() {
      this.$refs.form.reset();
      this.register ? (this.register = false) : (this.register = true);
    },
    registerUser() {
      if (this.$refs.form.validate()) {
        let user = {
          name: this.name,
          email: this.email,
          password: this.password,
          role: "teacher",
        };
        createUser(user)
          .then((response) => {
            this.$refs.form.reset();
            this.textSnackbar = "Created successfully";
            this.snackbarSuccess = true;
            this.change();
          })
          .catch((error) => {
            this.textSnackbar = "This email already exists";
            this.snackbar = true;
          });
      }
    },
    restorePassword: function () {
      if (this.$refs.formRestore.validate()) {
        this.waiting = true;
        sendEmail({ email: this.restoreEmail })
          .then((response) => {
            this.textSnackbar = "The link was send to email";
            this.snackbarSuccess = true;
            this.$refs.formRestore.reset();
            this.waiting = false;
            this.dialog = false;
          })
          .catch((error) => {
            this.textSnackbar = "This email isn't registered";
            this.snackbar = true;
            this.waiting = false;
          });
      }
    },
  },
};
</script>