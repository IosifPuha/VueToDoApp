<template>
    <v-select clearable label="filtra in base all'utente" :items="($store.getters.getUniqueUsers)"
        v-model="$store.state.select" @change="$store.commit('setSelect', $event)"></v-select>
</template>
<script>
//dobbiamo per forza usare lo script altrimenti non possiamo accedere al $store
</script>
