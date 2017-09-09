export default {
  methods: {
    fetchBoardsData () {
      if (!token) {
        return this.$router.push('/login')
      }

      axios.get('boards?api_token=' + token)
        .then(response => {
          if (response.data) {
            this.boards = response.data.data
            this.createIndexedBoards()
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
      return
    },

    createIndexedBoards () {
      for (var i = 0, len = this.boards.length; i < len; i++) {
          this.lookupBoards[this.boards[i].id] = this.boards[i]
      }
      return
    },

    sendNewBoard (name) {
      if (!name) return
      axios.post('/boards?api_token=' + token, {name: name})
        .then(response => {
          if (response.data.data.id) {
            var board = response.data.data
            this.boards.push(board)
            this.createIndexedBoards()
            this.$router.push('/boards/' + board.id)
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
      return
    },

    changeBoardName (name, id) {
      if (!name || !parseInt(id)) return
      axios.patch('/boards/' + id + '/?api_token=' + token, {name: name})
        .then(response => {
          if (response.data.data.id) {
            this.lookupBoards[id]['name'] = response.data.data.name
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
      return
    },

    sendDeleteBoard (id) {
      if (!parseInt(id)) return
      axios.delete('/boards/' + id + '/?api_token=' + token)
        .then(response => {
          if (response.data.data.id) {
            this.fetchBoardsData()
          }
          return
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
}
