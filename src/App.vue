<template>
  <v-app>


    <v-toolbar>

      <v-menu open-on-hover offset-y v-if='loggedIn'>
        <v-btn primary flat slot="activator"><v-icon left>developer_board</v-icon> Boards</v-btn>
        <v-list>
          <v-list-tile @click="">
            <router-link to="/" tag="span">My Boards</router-link>
          </v-list-tile>
          <v-list-tile v-for="item in boards" :key="item.title" @click="go('/boards/' + item.id)">
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" @click="go('/')"></v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if='!loggedIn'>
        <router-link to="/register" tag="span"><v-btn flat>Register</v-btn></router-link>
        <router-link to="/login" tag="span"><v-btn flat>Login</v-btn></router-link>
      </div>

      <v-menu open-on-hover offset-y v-if='loggedIn'>
        <v-btn primary flat slot="activator"><v-icon left>developer_board</v-icon>{{ user.username }}</v-btn>
        <v-list>
          <v-list-tile @click="">
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="">
            <router-link to="/logout" tag="span">Logout</router-link>
          </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>


    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>

  </v-app>
</template>



<script>
  export default {

    data () {
      return {
        boards: '',
        title: 'WebTrello',
        user: { username: 'User' },
        loggedIn: false
      }
    },

    methods: {
      go (where) {
        console.log('go: ' + where)
        this.$router.push(where)
      },
      fetchBoardsData () {
        axios.get('boards?api_token=' + token)
          .then(response => {
            if (response.data) {
              this.boards = response.data.data
            }
          })
      }
    },

    created () {
      Event.$on('login', () => {
        this.loggedIn = true
        this.user = JSON.parse(localStorage.getItem('user'))
      })

      Event.$on('logout', () => {
        this.loggedIn = false
      })

      let token = localStorage.getItem('token')
      if (token) {
        this.loggedIn = true
        this.user = JSON.parse(localStorage.getItem('user'))
      }
    },

    mounted () {
      this.fetchBoardsData()
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  .swal-text {
    white-space: pre;
  }
</style>
