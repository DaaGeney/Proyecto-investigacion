<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        
      </div>

      <v-card>
        <v-card-title class="headline">Welcome to the prototype of methodological gamification</v-card-title>
        <v-card-text>
          <p>it's an investigation project</p>
          
        </v-card-text>
        <v-card-actions>
          <v-spacer />
       
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
// import { saveAs } from "file-saver";
// import { retrievePDF } from "../helpers/apiCalls/file";

export default {
  middleware: "authenticated",

  components: {
    Logo,
    VuetifyLogo,
  },
  methods: {
    downloadWithCSS() {
      // retrievePDF().then(res=>res.blob()).then((result) => {
      //   const pdfGen = new Blob([result], { type: "application/pdf" });
      //   saveAs(pdfGen, "Resultado.pdf");
      // });
    },
  },
};
</script>
<style >
.text {
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

.grid-container {
  display: grid;
  grid-template-areas:
    "header header header header header header"
    "main main main main main main"
    "footer footer footer footer footer footer";
  grid-gap: 1px;
  background-color: #2196f3;
  padding: 1px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 45px;
  font-size: 20px;
}
</style>
