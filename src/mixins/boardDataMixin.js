export default {
  methods: {
    fetchBoardsData () {
      if (!token) { return this.$router.push('/login') }

      // console.log('getting all boards from backend', this.boards.length)

      axios.get('boards?api_token=' + token)
        .then(response => {
          if (response.data) {
            this.manageBoards(response.data.data)
            return
          }
          // console.log(response)
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
      return
    },

    manageBoards (boards) {
      if (boards) {
        this.boards = boards
        localStorage.setItem('boards', JSON.stringify(this.boards))
        for (var i = 0, len = this.boards.length; i < len; i++) {
            this.lookupBoards[this.boards[i].id] = this.boards[i]
        }
        localStorage.setItem('lookupBoards', JSON.stringify(this.lookupBoards))
        Event.$emit('BoardsUpdated')
        return
      }
      this.boards = JSON.parse(localStorage.getItem('boards'))
      this.lookupBoards = JSON.parse(localStorage.getItem('lookupBoards'))
      return
    },

    sendNewItem (type, name) {
      if (!type || !name) return

      console.log('creating new', type, 'Name: ', name)
      // console.log('# of boards', this.boards.length)

      axios.post('/boards?api_token=' + token, {name: name})
        .then(response => {
          if (response.data.data.id) {
            var board = response.data.data
            this.manageBoards()
            console.log('trying to show Board with id', board.id)
            this.$router.push({name: 'SingleBoard', params: {id: board.id}})
            return
          }
          console.log('something went wrong!', response)
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
            console.log('Backend Error!', error)
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
            Event.$emit('BoardsUpdated')
            // TODO update this.boards!!!
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
      let vm = this
      console.log('boards:', vm.boards)
      console.log('deleting', id)

      axios.delete('/boards/' + id + '/?api_token=' + token)
        .then(response => {
          console.log('vm:', vm)
          if (response.data.data.id) {
            console.log('board deleted, renewing data now:')
            vm.fetchBoardsData()
            console.log('data renewed, back to Boards:')
            vm.$router.push({name: 'Boards'})
            console.log('after re-routing')
            console.log('boards:', vm.boards)
            return
          }
          console.log('board deleted???', response)
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
