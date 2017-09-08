<template>
  <div>

    <h4>Boards</h4>

    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>

        <v-flex xs3 v-for="board in boards" :key="board.id">
          <router-link :to="{name: 'SingleBoard', params: {id: board.id}}">
            <v-card dark class="primary">
              <v-card-text class="px-0">{{ board.name }}</v-card-text>
            </v-card>
          </router-link>
        </v-flex>

      </v-layout>
    </v-container>

  </div>
</template>


<script>
export default {
  data () {
    return {
      boards: []
    }
  },

  mounted () {
    if (!token) {
      this.$router.push('/login')
    }
    axios.get('boards?api_token=' + token)
      .then(response => {
        if (response.data) {
          this.boards = response.data.data
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
  }
}
</script>

<style scoped>
  .card {
    cursor: pointer;
  }
</style>
