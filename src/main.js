import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// import firebase from "firebase/compat";

Vue.config.productionTip = false

// var firebaseConfig = {
//   apiKey: "AIzaSyDaOL26-792GYx0K_t-_7i4ALF54jCjLdc",
//   authDomain: "icg-sinhala.firebaseapp.com",
//   projectId: "icg-sinhala",
//   storageBucket: "icg-sinhala.appspot.com",
//   messagingSenderId: "395577955856",
//   appId: "1:395577955856:web:be1e2bc7d8ae49d8ef9c95",
//   measurementId: "G-7EWBJ3QXZ3"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
