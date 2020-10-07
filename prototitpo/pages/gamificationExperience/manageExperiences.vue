<template>
  <client-only placeholder="Loading...">
    <div ref="content">
      <v-card>
        <v-overlay v-model="overlay">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-dialog v-model="dialog" max-width="700px">
          <v-card>
            <v-card-title class="headline">Experience details</v-card-title>
            <v-card-text>
              <div class="grid-container">
                <div class="item1">
                  Phase 1: Facilitation
                  <br />
                  <br />
                  <div
                    v-for="x in facilitation"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="rombo"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                </div>
                <div class="item2">
                  Phase 2: Core
                  <br />
                  <br />
                  <div
                    v-for="x in core.gamification"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="rombo"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in core.technological"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="pentagono"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in core.traditional"
                    :key="x"
                    class="rectangle"
                    v-bind:style="{ cursor: 'pointer' }"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in core.web20"
                    :key="x"
                    class="hexagono"
                    v-bind:style="{ cursor: 'pointer' }"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                </div>

                <div class="item3">
                  Phase 3: evaluation
                  <br />
                  <br />
                  <div
                    v-for="x in evaluation.gamification"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="rombo"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in evaluation.technological"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="pentagono"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in evaluation.traditional"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    :class="classRect"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in evaluation.web20"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    :class="classHexa"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDialog()">Exit</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <modal
          name="my-first-modal"
          draggable
          resizable
          scrollable
          height="auto"
        >
          <v-card>
            <v-card-title class="headline">Experience details</v-card-title>
            <v-card-text>
              <div class="grid-container">
                <div class="item1">
                  Phase 1: Facilitation
                  <br />
                  <br />
                  <div
                    v-for="x in facilitation"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="rombo"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                </div>
                <div class="item2">
                  Phase 2: Core
                  <br />
                  <br />
                  <div
                    v-for="x in core.gamification"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="rombo"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in core.technological"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="pentagono"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in core.traditional"
                    :key="x"
                    class="rectangle"
                    v-bind:style="{ cursor: 'pointer' }"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in core.web20"
                    :key="x"
                    class="hexagono"
                    v-bind:style="{ cursor: 'pointer' }"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                </div>

                <div class="item3">
                  Phase 3: evaluation
                  <br />
                  <br />
                  <div
                    v-for="x in evaluation.gamification"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="rombo"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in evaluation.technological"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    class="pentagono"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in evaluation.traditional"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    :class="classRect"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                  <div
                    v-for="x in evaluation.web20"
                    :key="x"
                    v-bind:style="{ cursor: 'pointer' }"
                    :class="classHexa"
                    v-on:click="redirectComponent(x)"
                  >
                    {{ x }}
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </modal>
        <modal name="my-modal" draggable resizable scrollable height="auto">
          <v-card>
            <v-card-title>
              <span class="headline">Info component</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="show.name"
                label="Name"
                readonly
              ></v-text-field>
              <v-textarea
                v-model="show.info.description"
                label="Description"
                rows="1"
                readonly
              ></v-textarea>
              <v-text-field
                v-model="show.info.url"
                label="URL"
                readonly
              ></v-text-field>
              <v-text-field
                v-model="show.info.typeComponent"
                label="Type Component"
                readonly
              ></v-text-field>
              <v-text-field
                v-if="show.info.typeComponent == 'Gamification'"
                v-model="show.info.studentsTeam"
                label="Students per Team"
                readonly
              ></v-text-field>
              <v-textarea
                v-if="show.info.typeComponent == 'Gamification'"
                v-model="show.info.length"
                label="Length"
                readonly
                rows="1"
              ></v-textarea>
              <v-text-field
                v-if="show.info.typeComponent == 'Gamification'"
                v-model="show.info.space"
                label="Space"
                readonly
              ></v-text-field>
              <v-text-field
                v-if="show.info.typeComponent == 'Gamification'"
                v-model="show.info.materials"
                label="Materials"
                readonly
              ></v-text-field>
              <v-text-field
                v-if="show.info.typeComponent == 'Gamification'"
                v-model="show.info.subjectMatter"
                label="Subject Matter"
                readonly
              ></v-text-field>
              <v-text-field
                v-if="show.info.typeComponent == 'Gamification'"
                v-model="show.info.purpose"
                label="Purpose"
                readonly
              ></v-text-field>
            </v-card-text>
          </v-card>
        </modal>
        <v-card-title>
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
            <v-tooltip v-model="showB" top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="$router.go(-1)">
                  <v-icon>mdi-keyboard-backspace</v-icon>
                </v-btn>
              </template>
              <span>Back</span>
            </v-tooltip>
          </v-col>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :loading="getData"
          loading-text="Loading... Please wait"
          :search="search"
          sort-by="calories"
          @click:row="showInfo"
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
            <v-icon small class="mr-2" @click="generate(item)"
              >mdi-file-pdf</v-icon
            >
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
    facilitation: [],
    core: [],
    evaluation: [],
    showB: false,
    overlay: false,
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
    classRect: "rectangle",
    classHexa: "hexagono",
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
    showInfo(value) {
      if (!this.overlay) {
        this.facilitation = value.facilitation.gamification;
        this.core = value.core;
        this.evaluation = value.evaluation;
        if (Array.isArray(this.core.traditional)) {
          this.classRect = "rectangleReq";
        }
        if (Array.isArray(this.core.web20)) {
          this.classHexa = "hexagonoReq";
        }
        // this.dialog = true;
        this.$modal.show("my-first-modal");
      }
    },
    redirectComponent(x) {
      this.$modal.show("my-modal");
      getComponent(x, this.config).then((response) => {
        this.show = {
          name: response.data.data.name,
          info: response.data.data.info,
        };
        console.log(this.show);
      });
      //window.open(`/newComponent?info=${x}`);
    },
    async generate(item) {
      let htmlFacilitation = this.getHtml(item.facilitation, false, item);
      let htmlCore = this.getHtml(item.core, false, item);
      let htmlEval = this.getHtml(item.evaluation, true, item);
      this.overlay = true;
      const getInfo = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            if (response.data.data) {
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
            } else {
              resolve("");
            }
          });
        });
      };
      const getInfoTraditional = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            if (response.data.data) {
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
            } else {
              resolve("");
            }
          });
        });
      };
      const getInfoTech = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            if (response.data.data) {
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
            } else {
              resolve("");
            }
          });
        });
      };
      const getInfoWeb = (dataComponent) => {
        return new Promise((resolve) => {
          getComponent(dataComponent, this.config).then((response) => {
            if (response.data.data) {
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
            } else {
              resolve("");
            }
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
      evaluat = componentsEvaluation.join() + componentsEvalTech.join();

      core = componentsCore.join() + componentsCoreTech.join();
      if (item.core.traditional && Array.isArray(item.core.traditional)) {
        const componentsCoreTradi = await Promise.all(
          item.core.traditional.map(async (e) => await getInfoTraditional(e))
        );
        core += componentsCoreTradi.join();
      }
      if (item.core.web20 && Array.isArray(item.core.web20)) {
        const componentsCoreWeb = await Promise.all(
          item.core.web20.map(async (e) => await getInfoWeb(e))
        );
        core += componentsCoreWeb.join();
      }
      if (
        item.evaluation.traditional &&
        Array.isArray(item.evaluation.traditional)
      ) {
        const componentsEvalTradi = await Promise.all(
          item.evaluation.traditional.map(
            async (e) => await getInfoTraditional(e)
          )
        );
        evaluat += componentsEvalTradi.join();
      }
      if (item.evaluation.web20 && Array.isArray(item.evaluation.web20)) {
        const componentsEvalWeb = await Promise.all(
          item.evaluation.web20.map(async (e) => await getInfoWeb(e))
        );
        evaluat += componentsEvalWeb.join();
      }

      let json = {
        name: item.name,
        subjectMatter: item.subjectMatter,
        description: item.description,
        htmlFacilitation: htmlFacilitation,
        htmlCore: htmlCore,
        htmlEval: htmlEval,
        infoComponentsFaciltiation: componentsFacilitation
          .join()
          .replace(">,", ">"),
        infoComponentsCore: core.replace(">,", ">"),
        infoComponentsEval: evaluat.replace(">,", ">"),
      };
      retrievePDF(json)
        .then((res) => res.blob())
        .then((result) => {
          const pdfGen = new Blob([result], { type: "application/pdf" });
          saveAs(pdfGen, "Resultado.pdf");
          this.overlay = false;
        });
    },

    getHtml(array, isFacilitation, item) {
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
        if (isFacilitation) {
          if (Array.isArray(item.core.web20)) {
            array.web20.forEach((element) => {
              html += `<div class="hexagono"> 
             <p> ${element}</p>
          </div>`;
            });
          } else {
            array.web20.forEach((element) => {
              html += `<div class="hexagonoOpc"> 
             <p> ${element}</p>
          </div>`;
            });
          }
        } else {
          array.web20.forEach((element) => {
            html += `<div class="hexagonoOpc"> 
             <p> ${element}</p>
          </div>`;
          });
        }
      }
      if (array.traditional) {
        if (isFacilitation) {
          if (Array.isArray(item.core.traditional)) {
            array.traditional.forEach((element) => {
              html += `<div class="rectangle"> 
             <p> ${element}</p>
            </div>`;
            });
          } else {
            array.traditional.forEach((element) => {
              html += `<div class="rectangleOpc"> 
             <p> ${element}</p>
            </div>`;
            });
          }
        } else {
          array.traditional.forEach((element) => {
            html += `<div class="rectangleOpc"> 
             <p> ${element}</p>
            </div>`;
          });
        }
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

    closeDialog() {
      this.facilitation = [];
      this.core = [];
      this.evaluation = [];
      this.dialog = false;
    },
  },
};
</script>
<style >
.grid-container {
  display: grid;
  grid-template-areas:
    "header header header header header header"
    "main main main main main main"
    "footer footer footer footer footer footer";
  grid-gap: 5px;
  background-color: #2196f3;
  padding: 1px;
  border: 1px solid #000;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 45px;
  font-size: 20px;
}
.item1 {
  grid-area: header;
}
.item2 {
  grid-area: main;
}
.item3 {
  grid-area: footer;
}
.rombo,
.hexagono,
.pentagono,
.rectangle,
.rectangleReq,
.hexagonoReq {
  background-size: 100% 100%; /* <------ */
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 50px;
  max-height: 150px;
  min-width: 90px;
  max-width: 120px;
  display: inline-block;
  text-align: center;
  font-size: 13px;
  padding-top: 30px;
  position: relative;
  padding-bottom: 30px;
}

.rectangle {
  background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rectangulo-opc.png");
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 17px;
  padding-bottom: 17px;
}
.rectangleReq {
  background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rectangulo.png");
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 17px;
  padding-bottom: 17px;
}

.pentagono {
  background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/pentagono.png");
  padding-right: 15px;
  padding-left: 15px;
}

.hexagono {
  background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/hexagono-opc.png");
  padding-right: 20px;
  padding-left: 20px;
}
.hexagonoReq {
  background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/hexagono.png");
  padding-right: 20px;
  padding-left: 20px;
}

.rombo {
  background-image: url("https://raw.githubusercontent.com/DaaGeney/Proyecto-investigacion/master/backend/static/rombo.png");
  padding-right: 15px;
  padding-left: 15px;
}
</style>