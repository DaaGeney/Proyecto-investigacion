<template>
  <client-only placeholder="Loading...">
    <v-card>
      <v-snackbar v-model="snackbar" top color="error" :timeout="3000">{{ textSnackbar }}</v-snackbar>
      <v-snackbar v-model="snackbarSuccess" top color="success" :timeout="2500">{{ textSnackbar }}</v-snackbar>
      <v-card-title>
        <div>
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon>mdi-forward</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :loading="getData"
        loading-text="Loading... Please wait :)"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Users</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  @click="cleanNew"
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >New User</v-btn>
              </template>
              <v-card>
                <v-form ref="form" v-on:submit.prevent="save" lazy-validation>
                  <v-progress-linear
                    :active="waiting"
                    :indeterminate="waiting"
                    absolute
                    bottom
                    color="primary"
                  ></v-progress-linear>

                  <v-card-title>
                    <span class="headline">{{action}} user</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field v-model="user.name" :rules="nameRules" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field v-model="user.email" :rules="emailRules" label="Email"></v-text-field>
                        </v-col>
                        <v-col cols="12" v-if="action=='Create'">
                          <v-text-field
                            v-model="user.password"
                            type="password"
                            :rules="passwordRules"
                            label="Password"
                          ></v-text-field>
                        </v-col>
                        <v-radio-group v-model="user.role" mandatory row>
                          <v-radio label="Admin" value="admin"></v-radio>
                          <v-radio label="Teacher" value="teacher"></v-radio>
                        </v-radio-group>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </client-only>
</template>

<script>
import { getComponents, deleteComponent } from "../helpers/apiCalls/component";
import {
  getUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../helpers/apiCalls/auth";
export default {
  middleware: "authenticatedTeacher",
  data: () => ({
    emailRules: [
      (v) => !!v || "it's necessary",
      (v) => /.+@.+\..+/.test(v) || "Email invalid",
    ],
    passwordRules: [
      (v) => !!v || "it's necessary",
      (v) => (v && v.length >= 6) || "Six characters minimum",
    ],
    nameRules: [(v) => !!v || "it's necessary"],
    waiting: false,
    action: "create",
    snackbarSuccess: false,
    snackbar: false,
    textSnackbar: "",
    user: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    show: {
      name: "",
      info: {
        description: "",
        typeComponent: "",
        url: "",
        instructorsInstructions: "",
        learningObjetive: "",
        length: "",
        materials: "",
        purpose: "",
        space: "",
        studentsInstructions: "",
        studentsTeam: "",
        subjectMatter: "",
      },
    },
    pastEmail: "",
    indexEdit: null,
    getData: true,
    search: "",
    dialog: false,
    items: [
      {
        text: "Index ",
        disabled: false,
        to: "/",
      },
      {
        text: "Manage users",
        disabled: true,
        to: "/manageUser",
      },
    ],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.desserts = [];
      getUsers()
        .then((response) => {
          let temp = {},
            aux = response.data.data;
          for (let i = 0; i < aux.length; i++) {
            temp = {
              id: aux[i]._id,
              name: aux[i].name,
              role: aux[i].role,
              email: aux[i].email,
            };
            this.desserts.push(temp);
          }
        })
        .catch((error) => {});
      this.getData = false;
    },

    editItem(item) {
      this.pastEmail = item.email;
      this.action = "Edit";
      this.dialog = true;
      this.user = {
        name: item.name,
        email: item.email,
        role: item.role,
      };
      this.indexEdit = this.desserts.indexOf(item);
    },

    save() {
      if (this.$refs.form.validate()) {
        this.waiting = true;
        if (this.action == "Create") {
          createUser(this.user)
            .then((response) => {
              this.$refs.form.reset();
              this.textSnackbar = "Created successfully";
              this.snackbarSuccess = true;
              this.waiting = false;
              this.initialize();
              this.dialog = false;
            })
            .catch((error) => {
              this.textSnackbar = "This email already exists";
              this.snackbar = true;
              this.waiting = false;
            });
        } else {
          delete this.user.password;
          updateUser(this.pastEmail, this.user).then((response) => {
            Object.assign(this.desserts[this.indexEdit], this.user);
            this.textSnackbar = "updated successfully";
            this.snackbarSuccess = true;
            this.waiting = false;
             this.dialog = false;
          });
        }
      }
    },

    close() {
      this.dialog = false;
      this.$refs.form.reset();
    },

    deleteItem(item) {
      console.log(item);
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this user?") &&
        this.desserts.splice(index, 1);
      deleteUser(item.id).then((response) => {
        console.log("usuario eliminado");
      });
    },

    cleanNew() {
      this.action = "Create";
      this.$refs.form ? this.$refs.form.reset() : undefined;
    },
  },
};
</script>