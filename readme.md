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
- Mutation boleh dipanggil secara langsung untuk mengubah state, namun prefer via action
  (action -> mutation -> state)
- Mutation umumnya bersifat **SYNCHRONOUS**,   
  jangan gunakan hal hal bersifat asynchronous pada Mutation !  
  (mis: Fetch data adalah Async jadi tidak boleh di Mutation, tapi ketika data sudah selesai  
  di-fetch, kemudian ingin dimasukkan ke State, maka sifatnya adalah synchronous, sehingga hal  
  tersebut bisa menjadi sebuah Mutation)

#### Action
Merupakan method yang digunakan secara global untuk mengubah sifat pada state.

Rules of Thumb:
- Action bersifat Asynchronous.
- Action akan melakukan suatu hal jangka panjang (fetch data dari sumber lain, memanggil  
  hal hal yang bersifat async), kemudian akan memanggil Mutation untuk mengubah State.

#### Getter
Sesuai dengan namanya, ini merupakan Getter (pengambil) State. Loh kenapa harus ada ini,  
padahal kan State boleh diambil secara langsung?

Anggap saja Getter ini adalah `computed` pada VueX, mis, dari data State yang merupakan  
Array of Object, kita ingin memfilter sesuatu berdasarkan id nya, atau kata kunci lainnya,  
maka kita bisa menggunakan Getter untuk hal tersebut 😁

Getter bisa dibuat secara:
- Property based (tidak menerima parameter, hanya langsung dipanggil dan terima hasil jadi)
- Method based (menerima parameter, hasil tergantung dari parameter yang dikirimkan)

Terdapat perbedaan mendasar dari keduanya:
- Property based getter hasilnya akan di-cache oleh Vue
- Method based getter hasilnya tidak akan di-cache oleh Vue.

~ Use it wisely ! ~

### Let's Get Started with VueX !
Sudah cukup teorinya, mari saatnya kita mencoba. Pada pembelajaran ini kita akan membuat  
sebuah aplikasi berbasis VueX yang memiliki beberapa fitur utama:
- Sebuah button yang berfungsi untuk menambahkan suatu angka, yang dibuat dalam 2 component  
  yang berbeda (Kiri: button, kanan: tampilan hasil penambahan angka)
- Sebuah form dan hasil panggilan formnya, dibuat dalam 2 component yang berbeda juga.   
  (Kiri: Form, Kanan, tampilan hasil form setelah disubmit)
- Sebuah tabel yang akan menampilkan list jokes dari situs   
  https://v2.jokeapi.dev/, terdiri dari 2 component berupa `TableList` yang   didalamnya terdapat component `TableContent`.

Keseluruhan aplikasi ini akan memanfaatkan VueX.

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

### Langkah Nol
Membuat Template

Ya, pada pembelajaran kali ini, templatenya pun akan kita buat sendiri yah !

Buatlah beberapa components (pada folder `/src/components`) dengan nama di bawah ini:
- `IncrementalLeft.vue`
- `IncrementalRight.vue`
- `FormLeft.vue`
- `FormRight.vue`
- `TableList.vue`
- `TableContent.vue`

Dan modifikasilah isinya sebagai berikut:

`IncrementalLeft.vue`
```html
<!-- File: /src/components/IncrementalLeft.vue -->
<template>
  <button
    class="bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-300 hover:shadow-md"
  >
    Increment
  </button>
</template>

<script>
export default {
  name: "IncrementalLeft",
};
</script>

<style scoped></style>
```

`IncrementalRight.vue`
```html
<template>
  <div>
    <p class="font-semibold">0</p>
  </div>
</template>

<script>
export default {
  name: "IncrementalRight",
};
</script>

<style scoped></style>
```

`FormLeft.vue`
```html
<template>
  <form action="#">
    <div>
      <input
        type="text"
        placeholder="Just write me"
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700"
      />
    </div>
    <div class="mt-4">
      <button
        type="submit"
        class="
          bg-gray-100
          py-2
          px-4
          rounded-md
          hover:bg-gray-300 hover:shadow-md
        "
      >
        Transfer Me
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormLeft.vue",
};
</script>

<style scoped></style>
```

`FormRight.vue`
```html
<template>
  <div>
    <p class="font-semibold">Placeholder for the Form Value</p>
  </div>
</template>

<script>
export default {
  name: "FormRight.vue",
};
</script>

<style scoped></style>
```

`TableContent.vue`
```html
<template>
  <tbody>
    <tr>
      <td class="border border-gray-300">Placeholder ID</td>
      <td class="border border-gray-300">Placeholder Setup</td>
      <td class="border border-gray-300">Placeholder Punchline</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "TableContent",
};
</script>

<style scoped></style>
```

`TableList.vue`
```html
<template>
  <table class="table-fixed w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="w-1/6 border border-gray-300">ID</th>
        <th class="w-1/3 border border-gray-300">Setup</th>
        <th class="w-1/3 border border-gray-300">Punchline</th>
      </tr>
    </thead>
    <table-content></table-content>
  </table>
</template>

<script>
import TableContent from "./TableContent.vue";
export default {
  components: { TableContent },
  name: "TableList",
};
</script>

<style scoped></style>
```

`App.vue`
```html
<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="container flex flex-col mx-auto">
      <!-- Incremental Section -->
      <div class="mx-auto py-4">
        <h3 class="font-bold">Incremental Section</h3>
      </div>
      <div class="flex flex-row mx-auto py-4">
        <incremental-left class="mr-4"></incremental-left>
        <incremental-right class="ml-4 my-auto"></incremental-right>
      </div>
      <!-- Form Section -->
      <div class="mx-auto py-4">
        <h3 class="font-bold">Form Section</h3>
      </div>
      <div class="flex flex-row mx-auto py-4">
        <form-left class="mr-4"></form-left>
        <form-right class="ml-4 my-auto"></form-right>
      </div>
      <!-- Table Section -->
      <div class="mx-auto py-4">
        <h3 class="font-bold">Table Section</h3>
      </div>
      <div class="mx-auto">
        <table-list></table-list>
      </div>
    </div>
    <!-- <router-view /> -->
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import FormLeft from "./components/FormLeft.vue";
import FormRight from "./components/FormRight.vue";
import IncrementalLeft from "./components/IncrementalLeft.vue";
import IncrementalRight from "./components/IncrementalRight.vue";
import TableList from "./components/TableList.vue";

export default {
  components: {
    IncrementalLeft,
    IncrementalRight,
    FormLeft,
    FormRight,
    TableList,
  },
};
</script>
```

### Langkah Pertama - Incremental Section
Pada langkah ini kita akan menyelesaikan logika untuk Incremental pada component  
`IncrementalLeft` dan `IncrementalRight`.

Ketika button pada `IncrementalLeft` ditekan, akan menambahkan angka yang ada pada  
`IncrementalRight` sebesar 10000.

Untuk bisa menyelesaikan ini, maka selanjutnya kita akan membuka file `src/store/index.js`  
terlebih dahulu, kemudian akan membuat sebuah `state` atau data yang dapat digunakan  
pada semua component yang ada.

```javascript
// File: src/store/index.js
  state: {
    // data incremental yang akan digunakan
    initialNumber: 0,
  },
```

Selanjutnya kita akan menyambungkan state yang ada di `src/store/index.js` ini ke dalam  
text yang ada pada `IncrementalRight.vue`

Dimanakah kita harus menaruh state `initialNumber` ini?

Karena data ini bisa berubah terus menerus, maka kita tidak dapat menaruhnya pada `data`  
pada component `IncrementalRight.vue`, sehingga kita harus meletakkannya pada...   
`computed` !

`IncrementalRight.vue`
```javascript
export default {
  name: "IncrementalRight",
  computed: {
    // Data perubahan yang ada pada store tidak disimpan di bagian "data"
    // namun disimpan pada "computed" !

    // pada bagian ini kita hanya akan mengakses state initialNumber
    // sehingga di sini hanya butuh return state initialNumber saja
    initialNumber() {
      // ingat pada main.js, vuex disimpan dengan nama "store"
      // sehingga kita dapat memanggilnya dengan this.$store
      return this.$store.state.initialNumber;
    },
  },
};
```

Sehingga selanjutnya kita tinggal mendefinisikannya pada bagian template yang ada pada
`IncrementalRight.vue` saja

`IncrementalRight.vue`
```html
<template>
  <div>
    <!-- Setelah didefinisikan pada computed, kita tinggal memanggilnya di sini saja -->
    <p class="font-semibold">{{ initialNumber }}</p>
  </div>
</template>
```

Maka secara otomatis, kita sudah berhasil menyambungkan state `initialNumber` pada component  
`IncrementalRight.vue`

Selanjutnya kita akan memodifikasi `IncrementalLeft.vue` sehingga pada saat tombol ditekan  
state `initialNumber` bisa bertambah sebesar 10000

Untuk itu kita akan membuat sebuah method yang dapat mengubah state `initialNumber` 
terlebih dahulu pada `src/store/index.js`.

Method yang dapat mengubah state dapat dibuat pada bagian `mutations`, sehingga sebut saja 
namanya adalah `CHANGE_INCREMENTAL`

`src/store/index.js`
```javascript
  mutations: {
    // method mutation untuk mengubah state initialNumber
    // parameter pertama adalah state, untuk mengakses data dari state yang ada
    // parameter kedua (OPTIONAL) adalah payload
    // - berisi data yang dibutuhkan untuk mengubah state tersebut
    CHANGE_INCREMENTAL(state) {
      state.initialNumber += 10000;
    },
  }
```

Selanjutnya kita akan memodifikasi `IncrementalLeft.vue` agar dapat menggunakan mutation  
`CHANGE_INCREMENTAL` yang sudah kita buat ini.

`IncrementalLeft.vue`
```html
<template>
  <!-- Setelah didefinisikan di bawah, kita tinggal memanggil methodnya di sini  -->
  <button
    class="bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-300 hover:shadow-md"
    @click="changeIncremental"
  >
    Increment
  </button>
</template>

<script>
export default {
  name: "IncrementalLeft",
  // kita akan membuat sebuah method terlebih dahulu
  methods: {
    changeIncremental() {
      // kita akan memanggil mutation CHANGE_INCREMENTAL
      // dengan menggunakan store.commit

      // anggap saja store.commit seperti emit, tapi untuk memanggil mutation
      this.$store.commit("CHANGE_INCREMENTAL");
    },
  },
};
</script>

<style scoped></style>
```

Setelah bagian ini selesai dibuat, kita akan coba untuk menjalankan kode di atas, dan  
melihat hasilnya apakah button pada `IncrementalLeft` bisa menambahkan hasil pada  
`IncrementalRight`?

#### Langkah Kedua - Form Section
Pada bagian ini kita akan mencoba untuk menyelesaikan bagian Form, dimana pada saat form  
yang ada pada `FormLeft` ini disubmit, maka akan memengaruhi konten yang ditampilkan  
pada `FormRight`.

Untuk itu pertama tama kita akan membuka kembali `src/store/index.js` dan menambahkan   
sebuah state baru bernama `formValue` dan sebuah mutation bernama `FORM_HANDLER`

`src/store/index.js`
```javascript
...
  state: {
    // data incremental yang akan digunakan
    initialNumber: 0,

    // data yang digunakan untuk form
    // karena form datanya bisa tidak hanya satu
    // akan kita definisikan dalam bentuk Object
    formData: {
      value: "Placeholder",
    },
  },
  ...
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
  },
...
```

Selanjutnya kita akan mengikat data yang ada pada `FormRight` terlebih dahulu agar dapat  
tersambung pada state `formData`

`FormRight.vue`
```html
<template>
  <div>
    <p class="font-semibold">{{ formData.value }}</p>
  </div>
</template>

<script>
export default {
  name: "FormRight.vue",
  // masih sama menggunakan computed
  computed: {
    formData() {
      // hati hati ini dalam bentuk Object
      return this.$store.state.formData;
    },
  },
};
</script>

<style scoped></style>
```

Selanjutnya kita akan menyambungkan `FormLeft.vue` agar dapat mengubah state `formData`

`FormLeft.vue`
```html
<template>
  <!--  tambahkan event submit prevent terhadap method yang sudah dibuat -->
  <form action="#" @submit.prevent="submitFormHandler">
    <div>
      <!-- 3. binding input dengan localDataForm -->
      <input
        type="text"
        placeholder="Just write me"
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700"
        v-model="localFormData.name"
      />
    </div>
    <div class="mt-4">
      <button
        type="submit"
        class="
          bg-gray-100
          py-2
          px-4
          rounded-md
          hover:bg-gray-300 hover:shadow-md
        "
      >
        Transfer Me
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormLeft.vue",
  // 1. di sini kita akan mendefinisikan data lokal terlebih dahulu
  data() {
    return {
      // 2. data ini akan dibinding pada input yang ada di atas
      localFormData: {
        name: "",
      },
    };
  },
  // 4. Siapkan method untuk submit form
  methods: {
    submitFormHandler() {
      // kita di sini hanya perlu melemparkan data ke mutation yang ada
      // parameter kedua adalah si payload yang dibutuhkan

      // ingat pada state yang ada, nama propsnya adalah "value", bukan "name"
      this.$store.commit("FORM_HANDLER", { value: this.localFormData.name });
    },
  },
};
</script>

<style scoped></style>
```

#### Langkah Ketiga - Table Section
Pada bagian ini kita akan mencoba untuk menyelesaikan bagian pada Table, dimana table akan  
menampilkan data dari eksternal, kemudian akan ditampilkan pada tabel yang kita miliki.

Untuk bisa menyelesaikan itu, maka kita harus menyiapkan provider data berupa   
`axios instance` terlebih dahulu.

1. Buat folder `/src/apis`
2. Buat file dengan nama `jokes.js`
3. Masukkan kode berikut untuk membuat instance axios
```javascript
// File: /src/apis/jokes.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://v2.jokeapi.dev/",
});

export default instance;
```

#### Langkah Keempat
Membuat method untuk mengambil data dari instance yang ada

Pada langkah ini, kita akan membuat sebuah method bernama `fetchJokes` yang berfungsi  
untuk mengambil data dari API yang ada. karena kita sekarang sedang mempelajari VueX,  
maka method yang digunakan untuk mengambil data ini akan diletakkan pada  
`/src/store/index.js` pada bagian..... `actions` !

(Actions = kumpulan method yang ditujukan untuk `menantikan` sesuatu, async operations,  
salah satunya adalah untuk melakukan fetch data dari luar aplikasi)

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

#### Langkah Kelima
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
  }
...
```

#### Langkah Keenam
Melengkapi kode untuk method `COMMIT_JOKES`

Selanjutnya kita akan melengkapi method `COMMIT_JOKES` yang merupakan mutation, dimana mutation  
ini akan mengubah isi dari state `jokes`.

```javascript
...
  mutations: {
    ...
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
...
```

Sampai di sini kita sudah berhasil membuat logic untuk fetch data dan menyimpannya pada  
state, selanjutnya kita akan menyambungkan kode yang sudah dibuat ini ke dalam component   
yang sudah dibuat !

### Langkah Ketujuh
Menyambungkan logic dengan component `TableContent` dan `TableList`.

Pertama-tama kita akan membuka `TableList` terlebih dahulu, dan akan memanggil action  
`fetchJokes` dalam component ini.

Karena `fetchJokes` ini harus dipanggil pada saat `TableList` dibuat, maka kita akan  
meletakkan kode ini dengan menggunakan lifecycle `created` dalam component `TableList`

`TableList.vue`
```javascript
export default {
  components: { TableContent },
  name: "TableList",
  created() {
    // panggil action fetchJokes agar dapat mengambil data yang ada
    // dengan menggunakan store.dispatch

    // anggap saja seperti this.emit, tapi untuk action
    this.$store.dispatch("fetchJokes");
  },
};
```

Selanjutnya kita akan membinding value dari state `jokes` ke dalam component `TableList`  
agar dapat dipassing ke dalam `TableContent`

`TableList.vue`
```javascript
<template>
  <table class="table-fixed w-full border-collapse border border-gray-300">
    <thead>
      <tr class="bg-gray-100">
        <th class="w-1/6 border border-gray-300">ID</th>
        <th class="w-1/3 border border-gray-300">Setup</th>
        <th class="w-1/3 border border-gray-300">Punchline</th>
      </tr>
    </thead>
    <!-- lakukan v-for seperti kondisi normal -->
    <table-content
      v-for="joke in jokes"
      :key="'joke' + joke.id"
      :joke="joke"
    ></table-content>
  </table>
</template>

<script>
import TableContent from "./TableContent.vue";

export default {
  components: { TableContent },
  name: "TableList",
  beforeCreate() {
    // panggil action fetchJokes agar dapat mengambil data yang ada
    // dengan menggunakan store.dispatch

    // anggap saja seperti this.emit, tapi untuk action
    this.$store.dispatch("fetchJokes");
  },
  computed: {
    // kita akan menyimpan state jokes di sini
    jokes() {
      return this.$store.state.jokes;
    },
  },
};
</script>

<style scoped></style>
```

Selanjutnya kita hanya perlu memodifikasi `TableContent.vue` untuk menggunakan data `joke`  
yang dilempar (tentu saja dengan ... `props`)

`TableContent.vue`
```html
<template>
  <tbody>
    <tr>
      <td class="border border-gray-300">{{ joke.id }}</td>
      <td class="border border-gray-300">{{ joke.setup }}</td>
      <td class="border border-gray-300">{{ joke.delivery }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "TableContent",
  props: ["joke"],
};
</script>

<style scoped></style>
```

Jadi tidak pasti bahwa dengan menggunakan VueX artinya kita benar benar 100% meninggalkan  
props yah ^_^, hanya penggunaannya jadi lebih berkurang !

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