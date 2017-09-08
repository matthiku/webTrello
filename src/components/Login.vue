<template>
  <div class="text-md-center">
    <h2>Login</h2>
    <v-layout>
      <v-flex xs6 offset-xs3>
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="login.email"
              label="Email"
              required
            >
            </v-text-field>

            <v-text-field
              v-model="login.password"
              label="Password"
              type="password"
              required
            >
            </v-text-field>
          </v-card-text>

          <v-btn class="mb-3" success @click='logItIn'>Login</v-btn>
        </v-card>
      </v-flex>

    </v-layout>

  </div>
</template>


<script>
  export default {
    data () {
      return {
        login: {
          email: '',
          password: ''
        }
      }
    },

    methods: {
      logItIn () {
        axios.post('login', this.login)

        .then(response => {
          token = response.data.user.api_token
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          Event.$emit('login')
          this.$router.push('/')
        })

        .catch(function (error) {
          if (error.response) {
            swal('Login Error:', JSON.stringify(error.response.data.message).replace(/{|}|\[|\]/g, '\n'), 'error')
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            console.log(error.request)
          } else {
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      }
    }
  }
</script>
