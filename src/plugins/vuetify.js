import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import lineClamp from 'vue-line-clamp'

Vue.use(Vuetify)
Vue.use(lineClamp)

const vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#224979',
        secondary: '#01b7f2',
        accent: '#016dcc',
        info: '#2196f3',
        success: '#54a15e',
        default: '#fff',
        warning: '#fcbb15',        
        'ap-dark-blue': '#224979',
        'ap-light-blue': '#01b7f2',
        'ap-sky-blue': '#20C0F4',
        'ap-light-blue2': '#E9F9FE',
        'ap-dark-gray': '#706e6b',
        'ap-gray': '#b9b9b9',
        'ap-light-gray': '#dddbda',
        'ap-light-bg': '#f3f2f2',
        'ap-border-gray': '#d8d8d8',
        'ap-white': '#fff',
        'ap-black': '#000',
        'ap-link': '#016DCC',
        'ap-error': '#B85D0D',
        'ap-alarm': '#FF7700',
        'ap-confirmed': '#54A15E',
        'ap-orange': '#B85D0D',
        'ap-rate': '#FCBB15',
        'ap-orange-light': '#ff7700',
        'ap-yellow-light': '#fcbb15',
        'ap-yellow-light2': '#fff9bf',
        'ap-blue': '#163a65',
        'ap-dark-light-blue': '#2C5D9A',
        'ap-gray-2':'#707070'
      }
    },
    options: {
      customProperties: true
    }
  }
})

export default vuetify
