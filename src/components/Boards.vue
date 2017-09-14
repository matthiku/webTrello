<template>
  <div>

    <h4>My Boards</h4>

    <v-container grid-list-md>
      <v-layout row wrap>

        <v-flex xs3 v-for="board in boards" :key="board.id">
          <show-board-item :board="board"></show-board-item>
        </v-flex>

        <v-flex xs3>
          <v-card @click="addNewBoard" dark class="grey lighten-2 elevation-3 pa-0">
            <v-card-text class="pa-0">
              <v-card-actions>
                <v-btn flat class="orange--text">
                  add new board
                </v-btn>
                <v-spacer></v-spacer>
                <v-menu offset-y
                  :close-on-content-click="false"
                  :nudge-width="200">
                  <v-btn fab small dark class="indigo" slot="activator">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                  <create-new-board type="Board" item="board"></create-new-board>
                </v-menu>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>


<script>
import boardDataMixin from '../mixins/boardDataMixin'
import createNewBoard from './CreateNewItem'
import ShowBoardItem from './ShowBoardItem'

export default {
  data () {
    return {
      boards: [],
      lookupBoards: []
    }
  },

  mixins: [boardDataMixin],

  components: {
    createNewBoard,
    ShowBoardItem
  },

  methods: {
    addNewBoard () {
      this.sendNewItem('Board')
    }
  },

  created () {
    console.log('Boards.vue created, fetching data')
    this.fetchBoardsData()

    Event.$on('BoardsChanged', () => {
      console.log('BoardsChanged')
      this.boards = this.getLocal('boards')
    })
  }

}
</script>
