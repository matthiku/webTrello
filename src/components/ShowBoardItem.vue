<template>
  <v-card dark class=" pa-0 elevation-9" :class="deleting ? 'secondary' : 'primary'">
    <v-container fluid grid-list-xl>
      <v-layout row justify-space-between class="pa-0">

        <v-flex xs10 class="pa-0">
          <router-link v-show="!editing" :to="{name: 'SingleBoard', params: {id: board.id}}" 
              class="text-xs-left" tag="v-card-text">{{ board.name }}
          </router-link>
          <div v-show="editing" class="grey lighten-4">
            <v-text-field
              v-model="newName"
              :name="'input-name-'+board.id"
              label="Edit Name:"
              :value="board.name"
              class="input-group--focused"
              @keyup.enter="nameChanged"
            ></v-text-field>
          </div>
        </v-flex>

        <v-flex v-show="editing" xs2 text-xs-right class="pa-0">
          <v-btn fab small @click="editing=false">x</v-btn>
          <v-btn fab small @click="nameChanged">OK</v-btn>
        </v-flex>

        <v-flex v-show="!editing && !deleting" xs2 text-xs-right class="pa-0">
          <v-speed-dial top right direction="left">
            <v-btn slot="activator" class="blue darken-2" small dark fab hover>
              <v-icon>account_circle</v-icon>
              <v-icon>close</v-icon>
            </v-btn>
            <div style="z-index: 100;">
              <v-btn @click="showNameEditor(board.id)" title="edit name" fab dark small class="green"><v-icon>edit</v-icon></v-btn>
              <v-btn title="add new card to this board" fab dark small class="indigo">
                <v-icon>add</v-icon>
              </v-btn>
              <v-btn @click="deleteBoard(board.id)" title="delete this board!" fab dark small class="red">
                <v-icon>delete</v-icon>
              </v-btn>
            </div>
          </v-speed-dial>
        </v-flex>

      </v-layout>
    </v-container>
  </v-card>
</template>


<script>
  export default {
    props: ['board'],

    data () {
      return {
        editing: false,
        deleting: false,
        newName: ''
      }
    },

    mounted () {
      this.newName = this.board.name
    },

    methods: {
      deleteBoard (id) {
        this.deleting = true
        this.board.name = 'deleting board ...'
        Event.$emit('DeleteBoard', id)
      },
      showNameEditor () {
        this.editing = true
      },
      nameChanged () {
        this.editing = false
        if (this.newName !== this.board.name) {
          Event.$emit('boardNameChanged', this.newName, this.board.id)
          this.board.name = this.newName
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
