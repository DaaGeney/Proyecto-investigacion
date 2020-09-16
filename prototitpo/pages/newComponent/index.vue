<template>
  <client-only>
    <v-card>
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Info component</span>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="show.name" label="Name" disabled></v-text-field>
            <v-textarea v-model="show.info.description" label="Description" rows="1" disabled></v-textarea>
            <v-text-field v-model="show.info.url" label="URL" disabled></v-text-field>
            <v-text-field v-model="show.info.typeComponent" label="Type Component" disabled></v-text-field>
            <v-text-field
              v-if="show.info.typeComponent=='Gamification'"
              v-model="show.info.studentsTeam"
              label="Students per Team"
              disabled
            ></v-text-field>
            <v-textarea
              v-if="show.info.typeComponent=='Gamification'"
              v-model="show.info.length"
              label="Length"
              disabled
              rows="1"
            ></v-textarea>
            <v-text-field
              v-if="show.info.typeComponent=='Gamification'"
              v-model="show.info.space"
              label="Space"
              disabled
            ></v-text-field>
            <v-text-field
              v-if="show.info.typeComponent=='Gamification'"
              v-model="show.info.materials"
              label="Materials"
              disabled
            ></v-text-field>
            <v-text-field
              v-if="show.info.typeComponent=='Gamification'"
              v-model="show.info.subjectMatter"
              label="Subject Matter"
              disabled
            ></v-text-field>
            <v-text-field
              v-if="show.info.typeComponent=='Gamification'"
              v-model="show.info.purpose"
              label="Purpose"
              disabled
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Exit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          label="Search "
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :loading="getData"
        loading-text="Loading... Please wait"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Components</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-menu bottom origin="center center" transition="scale-transition">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">Create Component</v-btn>
              </template>

              <v-list>
                <v-list-item to="/newComponent/GamificationComponent?action=Create">
                  <v-list-item-title>Gamification Component</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item to="/newComponent/traditionalComponent?action=Create">
                  <v-list-item-title>Traditional Component</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item
                  to="/newComponent/additionalComponent?typeComponent=Web2.0&action=Create"
                >
                  <v-list-item-title>Web 2.0 Component</v-list-item-title>
                </v-list-item>
              </v-list>
              <v-list>
                <v-list-item
                  to="/newComponent/additionalComponent?typeComponent=Technological&action=Create"
                >
                  <v-list-item-title>Technological Component</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showItem(item)">mdi-eye</v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </client-only>
</template>

<script>
import {
  getComponents,
  deleteComponent,
} from "../../helpers/apiCalls/component";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "authenticatedAdmin",
  data: () => ({
    config: "",
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
    search: "",
    dialog: false,
    obj:[],
    items: [
      {
        text: "Index ",
        disabled: false,
        to: "/",
      },
      {
        text: "Manage Components",
        disabled: true,
        to: "/NewComponent",
      },
    ],
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "URL", value: "url" },
      { text: "Type Component", value: "type" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    getData: true,
  }),
  mounted() {
    this.config = {
      headers: { authorization: Cookie.get("auth") },
    };
    this.initialize();
    
  },
  methods: {
    initialize() {
      getComponents(Cookie.get("id"), this.config)
        .then((response) => {
          let temp = {},
            aux = response.data.data;
          for (let i = 0; i < aux.length; i++) {
            temp = {
              name: aux[i].name,
              url: aux[i].info.url,
              type: aux[i].info.typeComponent,
              id: aux[i]._id,
              info: aux[i].info,
            };
            this.desserts.push(temp);
          }
          if (this.$route.query.info) {
            this.obj = this.desserts.find(
              (o) => o.name == this.$route.query.info
            );
            this.dialog = true;
      this.show = this.obj;
          }
        })
        .catch((error) => {});
      this.getData = false;
    },
    editItem(item) {
      if (item.type == "Gamification") {
        this.$router.push(
          `/newComponent/GamificationComponent?action=Update&name=${item.name}`
        );
      }
      if (item.type == "Traditional") {
        this.$router.push(
          `/newComponent/traditionalComponent?action=Update&name=${item.name}`
        );
      }
      if (item.type == "Technological" || item.type == "Web2.0")
        this.$router.push(
          `/newComponent/additionalComponent?typeComponent=${item.type}&action=Update&name=${item.name}`
        );
    },
    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
      deleteComponent(item.id, this.config).then((response) => {
        console.log("entro al delete");
      });
    },
    showItem(item) {
      this.dialog = true;
      this.show = item;
    },
  },
};
</script>