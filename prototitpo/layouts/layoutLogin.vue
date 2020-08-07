<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-form ref="form" v-on:submit.prevent="startSesion" lazy-validation>
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
                        prepend-icon="mdi-account"
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
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" type="submit">Login</v-btn>
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
export default {
  data() {
    return {
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
        console.log(info);
        logIn(info)
          .then((response) => {
            this.loading = false;
            const auth = response.data.token;
            const id = response.data.data._id;
            const role = response.data.data.role;
            Cookie.set("auth", auth); // saving token in cookie for server rendering
            Cookie.set("id", id); // saving token in cookie for server rendering
            Cookie.set("role", role); // saving token in cookie for server rendering
             this.$router.push("/gamificationExperience")
          })
          .catch((error) => {
            this.textSnackbar = "invalid credentials";
            this.snackbar = true;
            this.loading = false;
          });
      }
    },
  },
};
</script>