<template>
  <client-only placeholder="Loading...">
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Components</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-menu bottom origin="center center" transition="scale-transition" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">Create Component</v-btn>
            </template>

            <v-list>
              <v-list-item to="/newComponent/GamificationComponent">
                <v-list-item-title>Gamification Component</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item to="/newComponent/traditionalComponent">
                <v-list-item-title>Traditional Component</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item to="/newComponent/additionalComponent?typeComponent=Web2.0">
                <v-list-item-title>Web 2.0 Component</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-list>
              <v-list-item to="/newComponent/additionalComponent?typeComponent=Technological">
                <v-list-item-title>Technological Component</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </client-only>
</template>

<script>
import {
  getComponents,
  deleteComponent
} from "../../helpers/apiCalls/component";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: true,
        value: "name"
      },
      { text: "URL", value: "url" },
      { text: "Type Component", value: "type" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: []
  }),
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      getComponents()
        .then(response => {
          let temp = {},
            aux = response.data.data;
          for (let i = 0; i < aux.length; i++) {
            temp = {
              name: aux[i].name,
              url: aux[i].info.url,
              type: aux[i].info.typeComponent,
              id: aux[i]._id
            };
            this.desserts.push(temp);
          }
        })
        .catch(error => {});
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
      deleteComponent({ id: item.id }).then(response => {
        console.log("entro al delete");
      });
    }
  }
};
</script>