<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          color="primary"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-view-list" value="false" no-action>
          <template v-slot:activator>
            <v-list-item-title>{{ $t("subject.route2") }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="(admin, i) in admins"
            :key="i"
            :to="localePath(admin[2])"
          >
            <v-list-item-title v-text="admin[0]"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="admin[1]"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title> {{$t('title')}}</v-toolbar-title>
      <v-spacer />
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          v-bind:placeholder="$t('searchE')"
          single-line
          v-model="searchInput"
          hide-details
        ></v-text-field>
        <v-btn icon @click="search">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-row>
      <v-spacer />
      <div>
        <v-menu bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="primary" dark v-bind="attrs" v-on="on">{{
              $t("lang")
            }}</v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title
                ><nuxt-link  :to="switchLocalePath('en')"
                
                  >English</nuxt-link
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item>
              <v-list-item-title
                ><nuxt-link :to="switchLocalePath('es')"
                  >Español</nuxt-link
                ></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { getRole } from "../helpers/apiCalls/auth";

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [],
      admins: [
        [
          this.$t("components.subject"),
          "mdi-plus-circle-outline",
          "/gamificationExperience/subjectMatter",
        ],
        [
          this.$t("experience.title"),
          "mdi-plus-circle-outline",
          "/gamificationExperience/defineExperience",
        ],
        [
          this.$t("experience.check"),
          "mdi-eye",
          "/gamificationExperience/manageExperiences",
        ],
      ],

      miniVariant: false,
      rightDrawer: false,
      searchInput: null,
    };
  },
  mounted() {
    let auth = Cookie.get("auth"); // saving token in cookie for server rendering
    let id = Cookie.get("id"); // saving token in cookie for server rendering
    getRole(id)
      .then((response) => {
        let role = response.data.role;
        if (role == "admin") {
          this.items = [
            {
              icon: "mdi-file-document-edit-outline",
              title: "Manage users",
              to: this.localePath("/manageUser/"),
            },
            {
              icon: "mdi-file-document-edit-outline",
              title: this.$t("manageComponents"),
              to: "/newComponent/",
            },
          ];
        } else {
          this.items = [
            {
              icon: "mdi-file-document-edit-outline",
              title: this.$t("manageComponents"),
              to: "/newComponent/",
            },
          ];
        }
      })
      .catch((error) => {
        Cookie.remove("auth");
        Cookie.remove("id");
        Cookie.remove("role");
        this.$router.replace("/login");
      });
  },
  methods: {
    logout() {
      Cookie.remove("auth");
      Cookie.remove("id");
      Cookie.remove("role");
      this.$router.replace("/login");
    },
    recharge(code){
      switchLocalePath('en')
    this.$router.replace("/");
    },
    search() {
      if (this.searchInput) {
        let aux = this.searchInput;
        this.searchInput = null;
        this.$router.push(
          `/gamificationExperience/manageExperiences?search=${aux}`
        );
      } else {
        this.$router.push(`/gamificationExperience/manageExperiences`);
      }
    },
  },
};
</script>
