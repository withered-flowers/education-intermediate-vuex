import Vue from "vue";
import Vuex from "vuex";

// import jokes api
import jokesApi from "../apis/jokes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // data incremental yang akan digunakan
    initialNumber: 0,

    // data yang digunakan untuk form
    // karena form datanya bisa tidak hanya satu
    // akan kita definisikan dalam bentuk Object
    formData: {
      value: "Placeholder",
    },

    // Kumpulan dari jokes
    jokes: [],
  },
  mutations: {
    // method mutation untuk mengubah state initialNumber
    // parameter pertama adalah state, untuk mengakses data dari state yang ada
    // parameter kedua (OPTIONAL) adalah payload
    // - berisi data yang dibutuhkan untuk mengubah state tersebut
    CHANGE_INCREMENTAL(state) {
      state.initialNumber += 10000;
    },

    // method mutation untuk menghandle Form
    // karena kita butuh data perubahan, maka kita akan memanfaatkan
    // parameter kedua dari mutation untuk mengubah data
    FORM_HANDLER(state, payload) {
      state.formData = payload;
    },

    // method mutation untuk mengubah state jokes
    // parameter pertama adalah state, untuk mengakses data dari state yang ada
    // parameter kedua (OPTIONAL) adalah payload
    // - berisi data yang dibutuhkan untuk mengubah state tersebut

    // Pada mutation ini kita membutuhkan payload untuk mengubah state jokes
    COMMIT_JOKES(state, payload) {
      // parameter pertama (state), isinya adalah SELURUH isi dari state yang ada pada vuex
      // sehingga kita bisa langsung mengubah state dari jokes dengan menggunakan
      // state.jokes

      // (anggap saja parameter state ini seperti this yang khusus memanggil "data" saja)
      state.jokes = payload;
    },
  },
  actions: {
    // method actions untuk mengambil data dari third party api
    // parameter pertama adalah context
    // - berisi method / properties dari instance store
    // - bisa memanggil commit atau dispatch
    // - context.commit = memanggil mutations
    // - context.dispatch = memanggil action lainnya
    // parameter kedua (OPTIONAL) adalah data (payload)
    // - berisi data yang digunakan untuk memanipulasi logic yang ada pada actions

    // Pada action ini kita tidak membutuhkan payload untuk logic yang ada
    // (Karena hanya fetch data saja)
    async fetchJokes(context) {
      try {
        const response = await jokesApi.get(
          "/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart&amount=10"
        );

        // set state jokes, TAPI tidak boleh diset langsung
        // harus diset via mutations
        const jokes = response.data.jokes;

        // set state jokes dilakukan via context.commit
        context.commit("COMMIT_JOKES", jokes);
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  modules: {},
});
