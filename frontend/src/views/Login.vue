<template>
<div>
  <v-row align="center" justify="center">
    <v-col cols="12" md="8">

      <v-form v-model="valid">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="email" label="Email" :rules="emailRules" required dark
            ></v-text-field>
          </v-col>
        </v-row>
              
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="password" label="Password" :rules="passwordRules" type="password" required dark
            ></v-text-field>
          </v-col>
        </v-row>
              
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn block color="primary" @click="login">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</div>
</template>

<script>
import Auth from '../modules/auth'

export default {
  name: 'Login',

  data: function() {
    return {
      valid: false,

      email: '',
      password: '',

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 12 || 'Password must be more than 12 characters',
      ],
    }
  },

  methods: {
    login() {
      Auth.login(
        this.email,
        this.password
      );
    },
  },
}
</script>