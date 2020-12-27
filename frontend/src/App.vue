<template>
  <v-app>
     <div class="h-48 w-full bg-gray-200 bg-cover bg-center background-image">
    <v-app-bar
      app
      color="transparent"
      dark
    >

      <!-- left -->
      <div class="d-flex align-center">
        <a @click="$router.push('/')" class="white--text">
          <h2 class="font-weight-light ml-2">
            <v-icon>mdi-cloud</v-icon>
            MWS <span class="font-italic red--text">live</span>
          </h2>
        </a>
      </div>

      <v-spacer></v-spacer>

      <!-- right -->
      <span v-if="user.user" class="font-weight-bold mr-3" style="font-size:1.2em">{{ user.user.firstname }}</span>

      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="$router.push('/')"
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>mdi-home-analytics</v-icon>
            </v-btn>
          </template>
          <span>Dashboard</span>
        </v-tooltip> 
      </div>

      <div v-if="user.user">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              @click="logout"
              v-bind="attrs"
              v-on="on"
              icon
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>Logout</span>
        </v-tooltip> 
      </div>

      <div v-else style="display: inherit;">
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="$router.push('/')"
                v-bind="attrs"
                v-on="on"
                icon
              >
                <v-icon>mdi-login</v-icon>
              </v-btn>
            </template>
            <span>Login</span>
          </v-tooltip> 
        </div>

        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="$router.push('/register')"
                v-bind="attrs"
                v-on="on"
                icon
              >
                <v-icon>mdi-account-plus</v-icon>
              </v-btn>
            </template>
            <span>Register</span>
          </v-tooltip> 
        </div>

      </div>

    </v-app-bar>

    <v-main>
      <v-row justify="center">
        <v-col cols="9">
      <router-view></router-view>
        </v-col>
      </v-row>
    </v-main>
     </div>
  </v-app>
</template>

<script>
import Auth from './modules/auth'

export default {
  name: 'App',

  components: {
  },

  methods: {
    logout() {
      Auth.logout();
      this.$router.push({ path: 'login' })
    }
  },
  
  computed: {
    user: function () {
      return Auth.getUser()
    }
  }
};
</script>

<style scoped>
.background-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(./img/imagebackground9.jpg);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
