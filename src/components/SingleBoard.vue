<template>
  <div>

    <h4>Board: {{ board.name }}</h4>

    <div v-if="(board.lists && !board.lists.length)">Board is empty, add new card</div>

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

      </v-layout>
    </v-container>

  </div>
</template>


<script>
import cardList from './CardList'
import boardDataMixin from '../mixins/boardDataMixin'

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

  components: { cardList },

  mixins: [boardDataMixin],

  created () {
    // console.log('singleBoard created, fetching data')
    this.fetchBoardsData()
  },

  watch: {
    'boards' () {
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
