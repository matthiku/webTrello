<template>
  <div>

    <h4>{{ board.name }}</h4>

    <div v-if="(board.lists && !board.lists.length)">Board is empty</div>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex xs3 v-for="list in board.lists" :key="list.id">
          <v-card dark class="indigo lighten-1">
              <v-card-text class="px-0">{{ list.name }}</v-card-text>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>


<script>
export default {

  data () {
    return {
      board: {
        title: 'loading...',
        name: ''
      }
    }
  },

  mounted () {
    if (!token) {
      this.$router.push('/login')
    }

    // pull the lists for this board from the backend
    var boardId = this.$router.history.current.params.id // this.$router.params.id
    if (!parseInt(boardId)) {
      return
    }
    axios.get('boards/' + boardId + '?api_token=' + token)
      .then(response => {
        if (response.data) {
          this.board = response.data.data
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.message) {
            swal('Backend Error:', JSON.stringify(error.response.data.message).replace(/{|}|\[|\]/g, '\n'), 'error')
          } else {
            swal('Backend Error:', JSON.stringify(error.response).replace(/{|}|\[|\]/g, '\n'), 'error')
          }
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
  },
  created () {
    console.log('SingleBoard created')
  },
  updated () {
    console.log('SingleBoard updated')
  }
}
</script>

<style scoped>
  .card {
    cursor: pointer;
  }
</style>
