<template>
  <v-app id="app">
    <v-main>
      <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
      <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="3000">{{ textSnackbar }}</v-snackbar>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" xs="6">
            <v-card class="elevation-12">
              <v-toolbar color="white"  flat>
                <v-toolbar-title>Restore password</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                bottom
                color="primary"
              ></v-progress-linear>
 
              <v-card-text>
                <v-form ref="form" v-on:submit.prevent="restore" v-model="valid" lazy-validation>
                  <v-text-field
                    id="key"
                    label="New password"
                    name="key"
                    prepend-icon="mdi-key"
                    type="password"
                    :rules="passwordRules"
                    v-model="key"
                    required
                  />
                  <v-text-field
                    id="confirmKey"
                    label="Verify password"
                    name="verifyKey"
                    prepend-icon="mdi-key-change"
                    type="password"
                    v-model="verifyKey"
                    :rules="passwordRules"
                    required
                  />

                  <v-card-actions>
                    <v-spacer />
                    <v-row>
                      <v-col>
                        <v-btn  color="primary"  type="submit">Restore</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { changePassword } from "../helpers/apiCalls/auth";
export default {
  middleware: "notAuthenticated",
  data() {
    return {
      valid: false,
      loading: false,
      snackbar: false,
      snackbarSuccess: false,
      textSnackbar: "",
      key: "",
      verifyKey: "",
      passwordRules: [
        v => !!v || "It's necessary"
      ]
    };
  },
  methods: {
    restore: function() {
      if (this.$refs.form.validate()) {
        if (this.key === this.verifyKey) {
          this.loading = true;
          let data = {
            email: this.$route.query.user.replace("%40", "@"),
            newPassword: this.verifyKey
          };
          let config = {
            headers: { authorization: this.$route.query.token }
          };
          changePassword(data, config)
            .then(response => {
              if (response.data.status) {
                this.textSnackbar = "Password changed correctly";
                this.snackbarSuccess = true;
                
                this.$refs.form.reset();
                this.loading = false;
                this.$router.push(`/login`);
              } else {
                this.textSnackbar =
                  "Error";
                this.snackbar = true;
                this.loading = false;
              }
            })
            .catch(error => {
              this.textSnackbar = error;
              this.snackbar = true;
            });
        } else {
          this.textSnackbar = "Fields do not match";
          this.snackbar = true;
        }
      } 
    }
  }
};
</script>