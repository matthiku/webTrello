export default {
  methods: {
    fetchBoardsData () {
      if (!token) { return this.$router.push({name: 'Login'}) }

      console.log('getting all boards from backend', this.boards.length)

      axios.get('boards')
        .then(response => {
          if (response.data) {
            this.manageBoards(response.data.data)
            return
          }
          // console.log(response)
          return
        })
    },

    manageBoards (boards) {
      if (boards) {
        console.log('managing new boards, length', boards.length)
        localStorage.setItem('boards', JSON.stringify(boards))
        // create an index array of all board items
        var lb = []
        var len = boards.length
        for (var i = 0; i < len; i++) {
          // console.log('found board id', boards[i].id)
          lb[boards[i].id] = boards[i]
        }
        localStorage.setItem('lookupBoards', JSON.stringify(lb))
        this.lookupBoards = lb
        this.boards = boards
      } else {
        // we can re-create boards from the updated lookupBoards
        this.lookupBoards = this.getLocal('lookupBoards')

        var arrayLength = this.lookupBoards.length
        console.log('refreshing boards, count:', this.boards.length)
        this.boards = []
        for (var j = 0; j < arrayLength; j++) {
          // console.log('single board', j, this.lookupBoards[j])
          if (this.lookupBoards[j] !== null) {
            this.boards.push(this.lookupBoards[j])
          }
        }
        console.log('new boards count:', this.boards.length)
        localStorage.setItem('boards', JSON.stringify(this.boards))
      }
    },

    getLocal (item) {
      return JSON.parse(localStorage.getItem(item))
    },

    cleanLocalStorage () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('boards')
      localStorage.removeItem('lookupBoards')
    },

    sendNewItem (type, name, item) {
      if (!type || !name) return

      console.log('creating new', type, 'Name: ', name, item)
      console.log('# of boards', this.boards.length)

      var vm = this
      if (type === 'Board') {
        axios.post('/boards', {name: name})
          .then(response => {
            if (response.data.data.id) {
              var board = response.data.data
              vm.boards.push(board)
              console.log('vm.boards', vm.boards)
              console.log('vm.board', vm.board)
              vm.manageBoards(vm.boards)
              Event.$emit('closeDialog')
              if (!vm.board) vm.$router.push({name: 'Boards'})
              else vm.$router.push({name: 'SingleBoard', params: {id: board.id}})
              return
            }
            console.log('NEW BOARD: something went wrong!', response.data.data.id, response.data.data, response.data, response)
          })
        return
      }

      if (type === 'List') {
        axios.post('/boards/' + item.id + '/list', {name: name})
          .then(response => {
            if (response.data.data.id) {
              var list = response.data.data
              console.log('Created new List for this board:', list)
              // we need to make sure that lookupBoards is up-to-date!
              // vm.manageBoards()
              console.log('existiert das Board schon?', vm.lookupBoards[item.id])
              if (!vm.lookupBoards[item.id].lists) {
                vm.lookupBoards[item.id].lists = []
              }
              vm.lookupBoards[item.id].lists.push(list)
              // add new list to the board
              console.log('adding new list to board', item.lists)
              item.lists.push(list)
              vm.manageBoards()
              return
            }
            console.log('NEW LIST: something went wrong!', response.data.data.id, response.data.data, response.data, response)
          })
        return
      }
      console.log(type, name, item)
    },

    sendChangeItemName (type, id, name) {
      if (!type || !name || !parseInt(id)) return
      axios.patch('/boards/' + id, {name: name})
        .then(response => {
          if (response.data.data.id) {
            this.lookupBoards[id]['name'] = response.data.data.name
            this.manageBoards()
            Event.$emit('BoardsChanged')
          }
        })
      return
    },

    sendDeleteItem (type, id) {
      if (!type || !parseInt(id)) return
      let vm = this
      console.log('deleting', type, 'id#', id)

      // the DELETE function returns again a full BOARDS list
      axios.delete('/boards/' + id)
        .then(response => {
          if (response.data.data) {
            vm.boards = response.data.data
            // write the new board Array into local storage
            this.manageBoards(vm.boards)
            Event.$emit('BoardsChanged')
            return
          }
          console.log('board deleted???', response)
          return
        })
    }
  }
}
