import Vue from "vue";
import * as VueGoogleMaps from 'vue2-google-maps';
Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAZk9Co-0kgo1QUuzDwHYxXIuGaDQTWQMQ',
      libraries: 'places', 
    } 
  })
