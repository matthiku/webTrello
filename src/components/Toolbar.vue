<template>
  <v-toolbar>


    <v-menu offset-y :close-on-content-click="true" v-if='loggedIn'>

      <v-btn primary flat slot="activator"><v-icon left>developer_board</v-icon>Boards</v-btn>
      <v-list>

        <v-list-tile @click="">
          <router-link to="/" tag="span">All Boards</router-link>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile>
          <v-menu
              offset-y
              :close-on-content-click="false"
              :nudge-width="200"
              v-model="newBoardMenu"
            >
            <v-btn class="grey" dark slot="activator">Create new board ...</v-btn>
            <create-new-board type="Board" item="board"></create-new-board>            
          </v-menu>
        </v-list-tile>

        <v-divider></v-divider>
        <div v-for="item in boards" :key="item.title" @click="newBoardMenu = false">
          <router-link :to="{name: 'SingleBoard', params: {id: item.id}}" tag="v-list-tile">
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </router-link>
        </div>

      </v-list>
    </v-menu>

    <v-spacer></v-spacer>

    <router-link :to="{name: 'Boards', params: {}}" tag="v-toolbar-title">{{ title }}
    </router-link>

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
</template>


<script>
  import createNewBoard from './CreateNewItem'
  import boardDataMixin from '../mixins/boardDataMixin'

  export default {

    props: ['loggedIn', 'title', 'user'],

    components: {
      createNewBoard
    },

    mixins: [boardDataMixin],

    data () {
      return {
        newBoardMenu: false,
        boards: [],
        lookupBoards: []
      }
    },

    methods: {
      getBoards () {
        this.boards = JSON.parse(localStorage.getItem('boards'))
        this.lookupBoards = JSON.parse(localStorage.getItem('lookupBoards'))
      }
    },

    changed: function () {
      this.getBoards()
    },

    mounted: function () {
      this.getBoards()

      Event.$on('BoardsUpdated', () => {
        this.getBoards()
      })

      Event.$on('DeleteBoard', (id) => {
        this.sendDeleteBoard(id)
      })

      Event.$on('newItemCreated', (type, name, item) => {
        console.log('Event received: newItemCreated')
        this.sendNewItem(type, name, item)
      })

      Event.$on('boardNameChanged', (name, id) => {
        if (name && parseInt(id)) {
          this.changeBoardName(name, id)
        }
      })
    }
  }
</script>
