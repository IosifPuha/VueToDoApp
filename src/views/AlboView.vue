<template>
  <div class="mx-auto">
    <v-card class="pa-10 ma-10">

      <div>
        <h4>Giorno:</h4>
        <p>{{ giorno }}</p>
        <h4>Mese:</h4>
        <p>{{ mese }}</p>
        <h4>Anno:</h4>
        <p>{{ anno }}</p>
        <h4>Numero:</h4>
        <p>{{ numero }}</p>
        <h4>Titolo:</h4>
        <p>{{ titolo }}</p>
        <h4>Link dell'immagine:</h4>
        <p>{{ link }}</p>
      </div>
    </v-card>


    <div class="ml-10 ">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="fetchPreviousComic" v-bind="attrs" v-on="on">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </template>
        fumetto precedente
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="fetchNextComic" v-bind="attrs" v-on="on">
            <v-icon>
              mdi-arrow-right
            </v-icon>
          </v-btn>
        </template>
        fumetto successivo
      </v-tooltip>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      giorno: '',
      mese: '',
      anno: '',
      numero: '',
      titolo: '',
      link: ''
    };
  },
  mounted() {
    this.fetchCurrentComic();
  },
  methods: {
    fetchCurrentComic() {// utilizziamo questa API non ufficiale perché quella ufficiale xkcd non funziona, probabilmente per un problema di CORS
      axios.get('https://xkcd.now.sh/?comic=100')
        .then(response => {
          this.giorno = response.data.day
          this.mese = response.data.month
          this.anno = response.data.year
          this.numero = response.data.num
          this.titolo = response.data.title
          this.link = response.data.img
        })
        .catch(error => {
          console.error("errore nella richiesta", error)
        })
    },
    fetchPreviousComic() {
      axios.get(`https://xkcd.now.sh/?comic=${this.numero - 1}`)
        .then(response => {
          this.giorno = response.data.day
          this.mese = response.data.month
          this.anno = response.data.year
          this.numero = response.data.num
          this.titolo = response.data.title
          this.link = response.data.img
        })
        .catch(error => {
          console.error("errore nella richiesta", error)
        })
    },
    fetchNextComic() {
      axios.get(`https://xkcd.now.sh/?comic=${this.numero + 1}`)
        .then(response => {
          this.giorno = response.data.day
          this.mese = response.data.month
          this.anno = response.data.year
          this.numero = response.data.num
          this.titolo = response.data.title
          this.link = response.data.img
        })
        .catch(error => {
          console.error("errore nella richiesta", error)
        })
    }
  }
};
</script>