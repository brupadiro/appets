<template>
    <v-app>
      <v-main class="pa-0 overflow">
        <v-content>
          <nuxt />
        </v-content>
      </v-main>
    </v-app>
  </template>

<script>
    import BottomNavigationBar from '../components/BottomNavigationBar'

    export default {
        middleware(cntx) {
            if (cntx.$auth.loggedIn) {
                cntx.redirect("/")
            }
        },
        data() {
            return {
                drawer: false
            }
        },
        methods: {
            logout() {
                this.$auth.logout()
                this.$router.push('/login')
            }
        },
        components: {
            BottomNavigationBar
        }
    }
</script>