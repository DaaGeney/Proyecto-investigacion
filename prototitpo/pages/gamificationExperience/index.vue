<template>
  <v-card flat>
      <div>
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon>mdi-forward</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
    <v-subheader class="title">Do you want?</v-subheader>
    <v-row>
      <v-btn
        text
        color="primary"
        :to='localePath("/gamificationExperience/subjectMatter")'
      
      >Define subject Matter...</v-btn>
    </v-row>
    <v-row>
      <v-btn text color="primary" to="/gamificationExperience/defineExperience">Define Experience...</v-btn>
    </v-row>
<v-row>
      <v-btn text color="primary" to="/gamificationExperience/manageExperiences">Check experiences...</v-btn>
    </v-row>
  </v-card>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticatedAdmin",
  data() {
    return {
        items: [
      {
        text: "Index ",
        disabled: false,
        to: "/"
      },
      {
        text: "Gamification experience",
        disabled: false,
        to: "/gamificationExperience"
      },
    ],
    };
  }
};
</script>