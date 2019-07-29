import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.blue.lighten4,
    secondary: colors.blue.darken2,
    accent: colors.amber.accent3
    // primary: colors.indigo.darken4,
    // secondary: colors.blue.lighten4,
    // accent: colors.amber.accent3
  }
} 
)

