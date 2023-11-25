<template>
  <div class="about pa-16">
    <h1>Log-in</h1>
    <v-form @submit.prevent="submit">
      <v-text-field v-model="Nome" label="Nome" :rules="rules" outlined></v-text-field>
      <v-btn type="submit" color="secondary">Login</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Nome: '',
      submitted: false,
      rules: [
        value => {
          if (value || this.submitted) return true
          return "Devi inserire un nome"
        }
      ]
    }
  },
  methods: {
    submit() {
      if (this.rules[0](this.Nome) === true) {
        this.$store.commit('setUser', this.Nome)
        this.Nome = ''
        this.submitted = true
        this.$store.commit('showSnackBar', 'Login effettuato con successo')
      }
      else {
        this.$store.commit('showSnackBar', "Inserisci un nome!")
      }
    }
  }
}
</script>