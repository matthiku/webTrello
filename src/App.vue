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

    methods: {
      go (where) {
        this.$router.push(where)
        console.log(this.$router.params)
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

      Event.$on('newBoardCreated', (name) => {
        this.sendNewBoard(name)
      })

      Event.$on('boardNameChanged', (name, id) => {
        if (name && parseInt(id)) {
          this.changeBoardName(name, id)
        }
      })

      let token = localStorage.getItem('token')
      if (token) {
        this.loggedIn = true
        this.user = JSON.parse(localStorage.getItem('user'))
      } else {
        this.$router.push('/login')
      }
    },

    mounted () {
      if (this.boards !== '') {
        this.fetchBoardsData()
      }
    }
  }
</script>


<style lang="stylus">
  @import './stylus/main'
  .swal-text { white-space: pre; }
  [v-app] { display: none; }
</style>
