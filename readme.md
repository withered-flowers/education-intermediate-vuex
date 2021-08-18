## VueX in a Nutshell

### Persyaratan
- Sudah mengerti dan memasang `vue-cli`
- Mengerti dasar dasar css (pada pembelajaran ini menggunakan `Tailwind`)

### What is VueX ?
VueX adalah sebuah state management pada Vue.

Kalau bingung "state management" itu apa, anggap saja sebagai sebuah wadah   
untuk menyimpan data secara global pada Vue, jadi kita tidak perlu menaruh  
data pada sebuah file App atau "Component Utama" 😁

### How to install VueX ?
1. Via npm (`npm install vuex`)
1. Via CLI (preferred !)
  - `npm install -g @vue/cli`
  - `vue create NAMA_PROJECT`
  - Pilih `Manually select features`
  - Centang `Vuex`
  - (Bila menggunakan Prettier dan menggunakan Linter / Formatter, pada saat opsi   
    `Pick a linter / formatter config`, pilih yang ada opsi `ESLint + Prettier`
1. Bila sudah membuat project dengan vue-cli, kita menambahkannya dengan `vue add vuex`.

### How to VueX ?
Dalam VueX sama dengan Vue, terbagi menjadi beberapa "methods" yang digunakan, mirip dengan  
`data, computed, dan watched` di Vue normal. di VueX umumnya terbagi menjadi 5 bagian besar:
- State
- Mutation
- Action
- Getter
- Modules (Tidak dibahas di pembelajaran ini)

#### State
Merupakan data global yang disimpan pada VueX, 

Rules of Thumb:
State **TIDAK BOLEH** diubah secara langsung (no SETTER on State !),   
Gunakan Action atau Mutation (Action Preferred)

#### Mutation
Merupakan method yang digunakan untuk memutasi (mengubah) State. anggap saja seperti SETTER untuk
State. 

Rules of Thumb:
- Mutation **TIDAK BOLEH** dipanggil secara langsung
- Mutation umumnya bersifat **SYNCHRONOUS**,   
  jangan gunakan hal hal bersifat asynchronous pada Mutation !  
  (mis: Fetch data adalah Async jadi tidak boleh di Mutation, tapi ketika data sudah selesai  
  di-fetch, kemudian ingin dimasukkan ke State, maka sifatnya adalah synchronous, sehingga hal  
  tersebut bisa menjadi sebuah Mutation)

#### Action
Merupakan method yang digunakan secara global untuk mengubah sifat pada state.

Rules of Thumb:
- Action bersifat Asynchronous.
- Action akan melakukan suatu hal jangka panjang (fetch data dari sumber lain, memanggil hal hal  
  yang bersifat async), kemudian akan memanggil Mutation untuk mengubah State.

#### Getter
Sesuai dengan namanya, ini merupakan Getter (pengambil) State. Loh kenapa harus ada ini, padahal  
kan State boleh diambil secara langsung?

Anggap saja Getter ini adalah `computed` pada VueX, mis, dari data State yang merupakan Array of  
Object, kita ingin memfilter sesuatu berdasarkan id nya, atau kata kunci lainnya, maka kita bisa  
menggunakan Getter untuk hal tersebut 😁

Getter bisa dibuat secara:
- Property based (tidak menerima parameter, hanya langsung dipanggil dan terima hasil jadi)
- Method based (menerima parameter, hasil tergantung dari parameter yang dikirimkan)

Terdapat perbedaan mendasar dari keduanya:
- Property based getter hasilnya akan di-cache oleh Vue
- Method based getter hasilnya tidak akan di-cache oleh Vue.

~ Use it wisely ! ~

### Let's Get Started with VueX !
Sudah cukup teorinya, mari saatnya kita mencoba. Pada pembelajaran ini kita akan membuat sebuah  
aplikasi berbasis VueX yang akan mengambil list jokes dari situs   
https://official-joke-api.appspot.com/ dan akan menampilkan data tersebut dalam bentuk tabel  
pada aplikasi kita, lewat sebuah component yang bernama `HelloWorld` yang isinya adalah Tabel.

Tabel ini akan mengambil data dari state yang ada pada VueX.

How to?

1. Buka terminal, ketik `vue create NAMA_PROJECT`
1. Pick a preset: `Manually select features`
1. Check the features needed: `Babel`, `Router`, `Vuex`, `Linter / Formatter`
1. Vue version: `2.x`
1. History Mode: `Yes`
1. Linter / Formatter config: *sesuaikan dengan yang dimiliki*
1. Additional Lint features: *sesuaikan dengan preferensi*
1. Where do you prefer placing config? *sesuaikan dengan preferensi*
1. Save this preset? *sesuaikan dengan preferensi*

Selanjutnya karena pada pembelajaran ini menggunakan `Tailwind`, kita akan menambahkannya dengan  
perintah: `vue add tailwind`

Selanjutnya karena pada pembelajaran ini fetcher data menggunakan `axios`, kita juga akan 
menambahkan package `axios` dengan perintah `npm install axios`

#### Langkah Pertama
Menyiapkan provider data berupa `axios instance` terlebih dahulu

1. Buat folder `/src/apis`
2. Buat file dengan nama `jokes.js`
3. Masukkan kode berikut untuk membuat instance axios
```javascript
// File: /src/apis/jokes.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://official-joke-api.appspot.com/",
});

export default instance;
```

#### Langkah Kedua
Membuat method untuk mengambil data dari instance yang ada

Pada langkah ini, kita akan membuat sebuah method bernama `fetchJokes` yang berfungsi untuk  
mengambil data dari API yang ada. karena kita sekarang sedang mempelajari VueX, maka method  
yang digunakan untuk mengambil data ini akan diletakkan pada `/src/store/index.js` pada   
bagian..... `actions` !

(Actions = kumpulan method yang ditujukan untuk `menantikan` sesuatu, async operations, salah  
satunya adalah untuk melakukan fetch data dari luar aplikasi)

Untuk membuat actions ini tentu saja kita harus membekali juga `store` ini dengan beberapa  
data lainnya, yaitu:
- sebuah data, a.k.a `state` bernama `jokes`, yang berisi kumpulan jokes yang ada
- sebuah method untuk mengubah data, a.k.a `mutation` bernama `COMMIT_JOKES`, yang berfungsi  
  untuk mengubah isi dari `jokes`

Sehingga pada saat langkah ini selesai, isi dari `/src/store/index.js` adalah sebagai berikut:
```javascript
// File: /src/store/index.js
import Vue from "vue";
import Vuex from "vuex";

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
    COMMIT_JOKES(state, payload) {},
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
    fetchJokes(context) {},
  },
  modules: {},
});
```

#### Langkah Ketiga
Melengkapi kode untuk method `fetchJokes` 

Selanjutnya kita akan melengkapi method `fetchJokes` yang merupakan action, dimana actions ini  
akan menggunakan instance axios untuk fetch data dan menggunakan mutation `COMMIT_JOKES`.

```javascript
// File: /src/store/index.js
import jokesApi from '../apis/jokes';

...
  actions: {
    // tambahkan kata kata async karena kita akan menunggu fetch data dari axios
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
  }
...
```

#### Langkah Keempat
Melengkapi kode untuk method `COMMIT_JOKES`

Selanjutnya kita akan melengkapi method `COMMIT_JOKES` yang merupakan mutation, dimana mutation  
ini akan mengubah isi dari state `jokes`.

```javascript

```


### Hint VueX
- Harus mengetahui kapan menggunakan state, mutation, action, dan getter
- Ingat bahwa vuex memiliki built in function untuk mempermudah hidup (`mapXXX`)
- Jangan pernah menggunakan v-model untuk mengubah state !
  (See BONUS pada referensi)

### TL;DR
- Action akan memanggil Mutation untuk mengubah State.  
- filtering data State dengan Getter.

### Referensi
- https://vuex.vuejs.org/
- https://vuex.vuejs.org/guide/
- https://vuex.vuejs.org/guide/state.html
- https://vuex.vuejs.org/guide/mutations.html
- https://vuex.vuejs.org/guide/actions.html
- https://vuex.vuejs.org/guide/getters.html
- [BONUS] https://vuex.vuejs.org/guide/forms.html