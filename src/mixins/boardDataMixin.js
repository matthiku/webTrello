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
      // we can re-create boards from the updated lookupBoards
      this.lookupBoards = JSON.parse(localStorage.getItem('lookupBoards'))
      this.boards = []
      var arrayLength = this.lookupBoards.length
      for (var j = 0; j < arrayLength; j++) {
        if (!this.lookupBoards[j] === undefined) {
          this.boards.push(this.lookupBoards[j])
        }
      }
      localStorage.setItem('boards', JSON.stringify(this.boards))
      return
    },

    sendNewItem (type, name, item) {
      if (!type || !name) return

      console.log('creating new', type, 'Name: ', name, item)
      // console.log('# of boards', this.boards.length)

      var vm = this
      if (type === 'Board') {
        axios.post('/boards?api_token=' + token, {name: name})
          .then(response => {
            if (response.data.data.id) {
              var board = response.data.data
              this.manageBoards()
              console.log('trying to show Board with id', board.id)
              this.$router.push({name: 'SingleBoard', params: {id: board.id}})
              return
            }
            console.log('NEW BOARD: something went wrong!', response.data.data.id, response.data.data, response.data, response)
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
      }

      if (type === 'Card') {
        axios.post('/boards/' + item.id + '/list?api_token=' + token, {name: name})
          .then(response => {
            if (response.data.data.id) {
              var card = response.data.data
              // we need to make sure that lookupBoards is up-to-date!
              console.log(vm.lookupBoards[item.id])
              vm.lookupBoards[item.id].lists.push(card)
              vm.manageBoards()
              console.log('trying to show Board with id', card.id)
              vm.$router.push({name: 'SingleBoard', params: {id: card.id}})
              return
            }
            console.log('NEW CARD: something went wrong!', response.data.data.id, response.data.data, response.data, response)
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
      }
      console.log(type, name, item)
    },

    changeBoardName (name, id) {
      if (!name || !parseInt(id)) return
      axios.patch('/boards/' + id + '?api_token=' + token, {name: name})
        .then(response => {
          if (response.data.data.id) {
            this.lookupBoards[id]['name'] = response.data.data.name
            Event.$emit('BoardsUpdated')
            // TODO update this.boards as well!!!
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

      axios.delete('/boards/' + id + '?api_token=' + token)
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
