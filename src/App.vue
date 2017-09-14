<template>
  <v-app>

    <my-toolbar 
      :loggedIn="loggedIn" 
      :title="title" 
      :boards="boards"
      :user="user"
    ></my-toolbar>

    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>

  </v-app>
</template>



<script>
  import myToolbar from './components/Toolbar'
  import boardDataMixin from './mixins/boardDataMixin'

  export default {

    data () {
      return {
        boards: '',
        lookupBoards: {},
        title: 'WebTrello',
        user: { username: 'User' },
        loggedIn: false
      }
    },

    components: { myToolbar },

    mixins: [boardDataMixin],

    created () {
      Event.$on('login', (user) => {
        console.log('Logging in', user)
        this.loggedIn = true
        window.token = user.api_token
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.user = this.getLocal('user')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      })

      Event.$on('logout', () => {
        this.loggedIn = false
        token = null
        this.cleanLocalStorage()
      })

      // if the user reloads the page, we have to restore the user data from localStorage
      if (token || localStorage.getItem('token')) {
        if (!token) {
          token = localStorage.getItem('token')
        }
        this.loggedIn = true
        this.user = this.getLocal('user')
        this.boards = this.getLocal('boards')
        this.lookupBoards = this.getLocal('lookupBoards')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      } else {
        this.$router.push('/login')
      }
      console.log('App.vue created.')
    }
  }
</script>


<style lang="stylus">
  @import './stylus/main'
  .swal-text { white-space: pre; }
  [v-app] { display: none; }
</style>
