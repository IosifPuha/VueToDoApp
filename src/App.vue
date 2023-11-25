<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img class="pa-4 pt-7" height="170" src="Productivity.jpg">
        <v-avatar>
          <img size="70" src="default-profile-photo.jpg" alt="John" class="mb-1" />
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">Utente</div>
        <div class="white--text text-subtitle-2">@username</div>
      </v-img>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark prominent height="170" src="Productivity.jpg">
      <template v-slot:img="{ props }">
        <v-img v-bind="props"></v-img>
      </template>
      <v-container class="header-container pa-0">
        <v-row class="py-3">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <tools-search v-if="$route.path === '/completed'" />
        </v-row>
        <v-row class="px-3 text-h4">
          <v-app-bar-title>
            {{ $store.state.appTitle }}
          </v-app-bar-title>
        </v-row>
        <v-row class="pa-2 text-h4">
          <tools-select v-if="$route.path === '/completed'" />
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
        <router-view></router-view>
        <SnackBar />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Tutti i task', icon: 'mdi mdi-checkbox-marked-circle-plus-outline', to: '/' },
      { title: 'Completati', icon: 'mdi mdi-clipboard-check-outline', to: '/completed' },
      { title: 'Login', icon: 'mdi mdi-login', to: '/login' },
      {
        title: 'Albo', icon: 'mdi mdi-thought-bubble-outline',
        to: '/albo'
      }
    ]
  }),
  components: {
    'SnackBar': require('@/components/Shared/SnackBar.vue').default,
    'tools-search': require('@/components/Tools/Search.vue').default,
    'tools-select': require('@/components/Tools/SelectName.vue').default,
  },
  mounted() {
    this.$store.dispatch('getTasks')
  }
}
</script>

<style lang="sass">
  .header-container
    max-width: none !important
</style>