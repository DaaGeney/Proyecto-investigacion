import colors from 'vuetify/es5/util/colors'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {

    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      {
        src: 'html2pdf.bundle.min.js'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [{ src: '~plugins/vue-js-modal.js' }],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */


  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Simple usage
    'cookie-universal-nuxt',

    // With options
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
    ['nuxt-material-design-icons'],
    [
      'nuxt-i18n',
      {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              lang:'Language',
              exit:'Exit',
              back: 'Back',
              continue: 'Continue',
              newLearning: 'Create learning objetive',
              save: 'Save',
              cancel: 'Cancel',
              searchE: 'Search experience...',
              title: 'Methodological Gamification',
              manageComponents: 'Manage Components',
              experience: {
                details:'Detalles de experiencia',
                configuration: 'Configuration',
                facilitation: 'Facilitation',
                core: 'Core',
                evaluation: 'Evaluation',
                information: 'Information',
                mandatory: 'Mandatory items',
                optional: 'Optional items',
                title: 'Define experience',
                add:'CREATE ...',
                check: 'Check experience'
              },
              components: {
                info:'Info component',
                manageComponents: 'Manage components',
                newComponent: 'Create Component',
                type1: 'Gamification Component',
                type2: 'Traditional Component',
                type3: 'Web 2.0 Component',
                type4: 'Technological Component',
                subTitle: 'Components',
                index: 'Search',
                name: 'Name',
                description: 'Description',
                studentsTeam: 'Students per team',
                length: 'Length',
                space: 'Space',
                materials: 'Materials',
                subject: 'Subject Matter',
                purpose: 'Purpose',
                learning: 'Learning objetive',
                students: 'Students instructions',
                instructors: 'Instructors instructions',
                file: 'Attached files',
                gamificationComponent: 'Gamification Component',
                traditionalComponent: 'Traditional Component'
              },
              subject: {
                title: 'Define Subject Matter',
                route: 'Index',
                route2: 'Gamification Experience',

                t1: 'Topic',
                t2: 'Subject',
                t3: 'Level',
                t4: 'Program'
              }
            },
            es: {
              lang:'Idioma',
              exit:'Salir',
              back: 'Regresar',
              save: 'Aceptar',
              continue:'Continuar',
              newLearning: 'Crear objetivo de aprendizaje',
              cancel: 'Cancelar',
              searchE: 'Buscar experiencia...',
              title: 'Metodologias de Gamificacion',
              manageComponents: 'Gestionar Componentes',
              experience: {
                details:'Experience details',
                add:'CREAR ...',
                configuration: 'Configuración',
                facilitation: 'Facilitación',
                core: 'Centro',
                evaluation: 'Evaluación',
                information: 'Información',
                mandatory: 'Requerido',
                optional: 'Opcional',
                title:'Definir Experiencia',
                check: 'Ver experiencia'
              },
              components: {
                info:'Información componente',
                manageComponents: 'Gestionar componentes',
                newComponent: 'Crear Componente',
                type1: 'Gamificación',
                type2: 'Tradicional',
                type3: 'Web 2.0 ',
                type4: 'Tecnológico',
                subTitle: 'Componentes',
                index: 'Buscar',
                name: 'Nombre',
                description: 'Descripción',
                studentsTeam: 'Estudiantes por equipo',
                length: 'Tamaño',
                space: 'Espacio',
                materials: 'Materiales',
                subject: 'Tematica',
                purpose: 'Propósito',
                learning: 'Objetivos de aprendizaje',
                students: 'Instrucciones de estudiantes',
                instructors: 'Instrucciones de docentes',
                file: 'Archivos',
                gamificationComponent: 'componente de gamificación',
                traditionalComponent: 'componente tradicional'
              },
              subject: {
                title: 'Definir tema',
                route: 'Inicio',
                route2: 'Experiencia de Gamificacion',
                t1: 'Tema',
                t2: 'Asunto',
                t3: 'Nivel',
                t4: 'Programa'
              }
            }
          }
        }
      }
    ]
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.red.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  }

}
