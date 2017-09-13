<template>
  <div>

    <h4>Board: {{ board.name }}</h4>


    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex xs3 v-for="list in board.lists" :key="list.id">
          <v-card>
            <v-toolbar class="cyan" dark>
              <v-toolbar-title>{{ list.name }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-side-icon></v-toolbar-side-icon>
            </v-toolbar>

            <card-list :list="list"></card-list>

            <v-card-actions>
              <v-btn flat class="orange--text">Add ...</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    
        <div v-if="(board.lists && !board.lists.length)">
          Board is empty
          <v-menu offset-y
            :close-on-content-click="false"
            :nudge-width="200">
            <v-btn class="grey" dark slot="activator">Create new Card ...</v-btn>
            <create-new-card type="Card" :item="board"></create-new-card>
          </v-menu>
        </div>

      </v-layout>
    </v-container>

  </div>
</template>


<script>
import cardList from './CardList'
import boardDataMixin from '../mixins/boardDataMixin'
import createNewCard from './CreateNewItem'

export default {

  data () {
    return {
      boards: [],
      lookupBoards: [],
      board: {
        name: 'loading...'
      }
    }
  },

  components: {
    cardList,
    createNewCard
  },

  mixins: [boardDataMixin],

  created () {
    console.log('singleBoard created, fetching data')
    this.fetchBoardsData()
  },

  watch: {
    boards: function () {
      var boardId = this.$router.history.current.params.id
      if (this.lookupBoards[boardId]) {
        this.board = this.lookupBoards[boardId]
      }
    },
    '$route' () {
      var boardId = this.$router.history.current.params.id
      // console.log('singleBoard ROUTE changed, update data', this.$router)
      if (this.lookupBoards[boardId]) {
        this.board = this.lookupBoards[boardId]
      }
    }
  }
}
</script>

<style scoped>
  .card {
    cursor: pointer;
  }
</style>
