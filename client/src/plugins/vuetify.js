import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: colors.purple.darken2,
        secondary: colors.purple.darken4,
        accent: colors.deepPurple.lighten2,
        muted: colors.deepPurple.lighten4,
        error: colors.red,
        info: colors.deepPurple.lighten3,
        success: colors.green.lighten1,
        warning: colors.deepOrange.lighten2,
        background: colors.grey.lighten2,

      },
      dark: {
        primary: colors.purple.darken2,
        secondary: colors.purple.darken4,
        accent: colors.deepPurple.lighten2,
        muted: colors.deepPurple.lighten4,
        error: colors.red,
        info: colors.deepPurple.lighten3,
        success: colors.green.lighten1,
        warning: colors.deepOrange.lighten2,
        background: colors.grey.darken4,
      }
    },
  },
});
