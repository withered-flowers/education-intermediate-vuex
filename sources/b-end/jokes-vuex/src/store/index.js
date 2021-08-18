import Vue from "vue";
import Vuex from "vuex";

// import jokes api
import jokesApi from "../apis/jokes";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Kumpulan dari jokes
    jokes: [],
  },
  mutations: {
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
        const response = await jokesApi.get("/jokes/programming/ten");

        // set state jokes, TAPI tidak boleh diset langsung
        // harus diset via mutations
        const jokes = response.data;

        // set state jokes dilakukan via context.commit
        context.commit("COMMIT_JOKES", jokes);
      } catch (err) {
        console.log(err.response);
      }
    },
  },
  modules: {},
});
