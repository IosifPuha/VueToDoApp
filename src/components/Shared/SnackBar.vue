<template>
    <v-snackbar v-model="$store.state.SnackBar.show">
        {{ $store.state.SnackBar.text }}

        <template v-slot:action="{ attrs }">
            <v-btn color="pink" text v-bind="attrs" @click="$store.state.SnackBar.show = false">
                Chiudi
            </v-btn>
        </template>
    </v-snackbar>
</template>
  
<script>
export default {
    name: 'shared-SnackBar'
}
</script>
<style lang="sass">
    div.v-snack:not(.v-snack--absolute)
      height: 100%
  </style>