<template>
  <div class="text-md-center">
    <h2>Register</h2>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="register.username"
              label="Username"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="register.email"
              label="Email"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="register.password"
              label="Password"
              type="password"
              required
            >
            </v-text-field>
          </v-card-text>

          <v-btn class="mb-3" success @click='registerIt'>Register</v-btn>

        </v-card>
      </v-flex>

    </v-layout>

  </div>
</template>


<script>
  export default {
    data () {
      return {
        register: {
          username: '',
          email: '',
          password: ''
        }
      }
    },

    methods: {
      registerIt () {
        axios.post('register', this.register)
        .then(response => {
          this.$emit('login', response.data.user)
        })
        .catch(function (error) {
          if (error.response) {
            swal('Login Error:', JSON.stringify(error.response.data.message).replace(/{|}|\[|\]/g, '\n'), 'error')
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      }
    }
  }
</script>

<style>
</style>