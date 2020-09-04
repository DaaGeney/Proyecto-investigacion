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
import { getComponent } from "../../helpers/apiCalls/component";

import { saveAs } from "file-saver";
export default {
  middleware: "authenticatedAdmin",
  data: () => ({
    config: "",
    infoComponent: "",
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
        text: `Gamification Experience`,
        disabled: true,
        href: "/gamificationExperience",
      },
      {
        text: `Check Experience`,
        disabled: true,
        to: "/",
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
    async generate(item) {
      let htmlFacilitation = this.getHtml(item.facilitation);
      let htmlCore = this.getHtml(item.core);
      let htmlEval = this.getHtml(item.evaluation);
      const getInfo = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            resolve(`
            <div class="rombo"> 
             <p> ${dataComponent}</p>
            </div><div class="b">
              <p> <strong>Name: </strong>${dataComponent}<br>
              <strong> Description: </strong>${response.data.data.info.description}<br>
              <strong>Instructors Instructions:</strong> ${response.data.data.info.instructorsInstructions}<br>
             <strong> Learning Objetives: </strong>${response.data.data.info.learningObjetive}</br>
              <strong>Length: </strong>${response.data.data.info.length} <br>
              <strong>Materials:</strong> ${response.data.data.info.materials} <br>
             <strong> Purpose:</strong> ${response.data.data.info.purpose} <br>
             <strong> Space:</strong> ${response.data.data.info.space} <br>
              <strong>Students Instructions:</strong> ${response.data.data.info.studentsInstructions} <br>
              <strong>Students Per Team: </strong>${response.data.data.info.studentsTeam} <br>
              <strong>subject Matter:</strong> ${response.data.data.info.subjectMatter} <br>
             <strong> Url: </strong>${response.data.data.info.url} <br>
              </p>
            </div>
            <br>`);
          });
        });
      };
      const getInfoTraditional = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            resolve(`
            <div class="rectangle"> 
             <p> ${dataComponent}</p>
            </div><div class="b">
              <p> <strong> Name:</strong> ${dataComponent}<br>
              <strong> Description: </strong>${response.data.data.info.description}<br>
             <strong>  Url:</strong>  ${response.data.data.info.url} <br>
              </p>
            </div>
            <br>`);
          });
        });
      };
      const getInfoTech = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            resolve(`
            <div class="pentagono"> 
             <p>  ${dataComponent}</p>
            </div><div class="b">
              <p><strong> Name:</strong> ${dataComponent}<br>
             <strong>  Description: </strong> ${response.data.data.info.description}<br>
              <strong> Url:</strong> ${response.data.data.info.url} <br>
              </p>
            </div>
            <br>`);
          });
        });
      };
      const getInfoWeb = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            resolve(`
            <div class="hexagono"> 
             <p> ${dataComponent}</p>
            </div><div class="b">
              <p><strong>Name:</strong>  ${dataComponent}<br>
             <strong> Description: </strong> ${response.data.data.info.description}<br>
             <strong>  Url: </strong> ${response.data.data.info.url} <br>
              </p>
            </div>
            <br>`);
          });
        });
      };
      let core = "";
      const componentsFacilitation = await Promise.all(
        item.facilitation.gamification.map(async (e) => await getInfo(e))
      );
      const componentsCore = await Promise.all(
        item.core.gamification.map(async (e) => await getInfo(e))
      );
      const componentsCoreTech = await Promise.all(
        item.core.technological.map(async (e) => await getInfoTech(e))
      );

      let evaluat = "";
      const componentsEvaluation = await Promise.all(
        item.evaluation.gamification.map(async (e) => await getInfo(e))
      );
      const componentsEvalTech = await Promise.all(
        item.evaluation.technological.map(async (e) => await getInfoTech(e))
      );
      evaluat = componentsEvaluation.toString() + componentsEvalTech.toString();

      core = componentsCore.toString() + componentsCoreTech.toString();
      if (item.core.traditional && Array.isArray(item.core.traditional)) {
        const componentsCoreTradi = await Promise.all(
          item.core.traditional.map(async (e) => await getInfoTraditional(e))
        );
        core += componentsCoreTradi.toString();
      }
      if (item.core.web20 && Array.isArray(item.core.web20)) {
        const componentsCoreWeb = await Promise.all(
          item.core.web20.map(async (e) => await getInfoWeb(e))
        );
        core += componentsCoreWeb.toString();
      }
      if (item.evaluation.traditional && Array.isArray(item.evaluation.traditional)) {
        const componentsEvalTradi = await Promise.all(
          item.evaluation.traditional.map(async (e) => await getInfoTraditional(e))
        );
        evaluat += componentsEvalTradi.toString();
      }
      if (item.evaluation.web20 && Array.isArray(item.evaluation.web20)) {
        const componentsEvalWeb = await Promise.all(
          item.evaluation.web20.map(async (e) => await getInfoWeb(e))
        );
        evaluat += componentsEvalWeb.toString();
      }

      let json = {
        name: item.name,
        subjectMatter: item.subjectMatter,
        description: item.description,
        htmlFacilitation: htmlFacilitation,
        htmlCore: htmlCore,
        htmlEval: htmlEval,
        infoComponentsFaciltiation: componentsFacilitation.toString(),
        infoComponentsCore: core,
        infoComponentsEval: evaluat

      };
      retrievePDF(json)
        .then((res) => res.blob())
        .then((result) => {
          const pdfGen = new Blob([result], { type: "application/pdf" });
          saveAs(pdfGen, "Resultado.pdf");
        });
    },

    getHtml(array) {
      let html = ``;
      if (array.gamification) {
        array.gamification.forEach((element) => {
          html += `<div class="rombo"> 
             <p> ${element}</p>
          </div>`;
        });
      }
      if (array.technological) {
        array.technological.forEach((element) => {
          html += `<div class="pentagono"> 
             <p> ${element}</p>
          </div>`;
        });
      }
      if (array.web20) {
        array.web20.forEach((element) => {
          html += `<div class="hexagono"> 
             <p> ${element}</p>
          </div>`;
        });
      }
      if (array.traditional) {
        array.traditional.forEach((element) => {
          html += `<div class="rectangle"> 
             <p> ${element}</p>
          </div>`;
        });
      }
      return html;
    },
    initialize() {
      getExperiences(this.config)
        .then((response) => {
          let temp = {},
            aux = response.data.data;
          for (let i = 0; i < aux.length; i++) {
            temp = {
              name: aux[i].name,
              description: aux[i].description,
              subjectMatter: aux[i].subjectMatter,
              core: aux[i].data.core,
              evaluation: aux[i].data.evaluation,
              facilitation: aux[i].data.facilitation,
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