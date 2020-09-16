<template>
  <div class="pa-3">
    <v-bottom-navigation fixed grow app class="bottom-navigation" height="45px">
      <v-btn color="secondary"  to="/" icon small>
        <v-icon>mdi-text-account</v-icon>
      </v-btn>
      <!--
    <v-btn value="discover"  to="/discover">
      <span>Discover</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    -->
      <v-btn value="my-pets" color="secondary"  to="/myPets" icon small>
          <v-avatar color="primary" size="55px" class="p-absolute elevation-5">
            <v-icon color="white">mdi-map</v-icon>
          </v-avatar>
      </v-btn>
      <!-- 
    <v-btn value="new"  to="/notifications">
      <span>New</span>
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
  -->

      <v-btn value="profile" color="secondary" to="/profile" icon small>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
  export default {
    name: 'BottomNavigationBar',
    data() {
      return {
        bottomNav: 'profile'
      }
    }
  }

</script>

<style>
  .bottom-navigation {
    margin: 12px;
    width: calc(100% - 24px)!important;
    border-radius:3px;
  }
  
.p-absolute{
  position:absolute;
}
</style>
