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

            <list-list :list="list"></list-list>

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
            <v-btn class="grey" dark slot="activator">Create new List ...</v-btn>
            <create-new-list type="List" :item="board"></create-new-list>
          </v-menu>
        </div>

      </v-layout>
    </v-container>

  </div>
</template>


<script>
import listList from './ListList'
import boardDataMixin from '../mixins/boardDataMixin'
import createNewList from './CreateNewItem'

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
    listList,
    createNewList
  },

  mixins: [boardDataMixin],

  created () {
    console.log('singleBoard created, fetching data')
    this.fetchBoardsData()
  },

  watch: {
    boards: function () {
      console.log('singleBoard.vue, BOARDS changed!')
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
