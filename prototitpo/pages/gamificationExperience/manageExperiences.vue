<template>
  <client-only placeholder="Loading...">
    <div ref="content">
      <v-card>
        <v-card-title>
          <div>
            <v-breadcrumbs :items="items">
              <template v-slot:divider>
                <v-icon>mdi-forward</v-icon>
              </template>
            </v-breadcrumbs>
          </div>
          <v-spacer></v-spacer>
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
              <v-toolbar-title>Experiences</v-toolbar-title>
              <v-spacer />

              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search experience"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="generate(item)">mdi-file-pdf</v-icon>
            <!-- <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon> -->
          </template>
        </v-data-table>
      </v-card>
    </div>
  </client-only>
</template>


<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { getExperiences } from "../../helpers/apiCalls/experience";
import { retrievePDF } from "../../helpers/apiCalls/file";

import { saveAs } from "file-saver";
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
      { text: "Description", value: "description" },
      { text: "Subject Matter", value: "subjectMatter" },
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
    this.$route.query.search
      ? (this.search = this.$route.query.search)
      : undefined;
  },
  methods: {
    generate(item) {
      retrievePDF().then(res=>res.blob()).then((result) => {
        const pdfGen = new Blob([result], { type: "application/pdf" });
        saveAs(pdfGen, "Resultado.pdf");
      });
    },

    initialize() {
      getExperiences(this.config)
        .then((response) => {
          console.log(response);
          let temp = {},
            aux = response.data.data;
          for (let i = 0; i < aux.length; i++) {
            temp = {
              name: aux[i].name,
              description: aux[i].description,
              subjectMatter: aux[i].subjectMatter,
              core:aux[i].data.core,
              evaluation:aux[i].data.evaluation,
              facilitation:aux[i].data.facilitation
            };
            this.desserts.push(temp);
          }
        })
        .catch((error) => {});
      this.getData = false;
    },

    editItem(item) {},

    deleteItem(item) {
      //   const index = this.desserts.indexOf(item);
      //   confirm("Are you sure you want to delete this item?") &&
      //     this.desserts.splice(index, 1);
      //   deleteComponent(item.id).then(response => {
      //     console.log("entro al delete");
      //   });
    },
  },
};
</script>