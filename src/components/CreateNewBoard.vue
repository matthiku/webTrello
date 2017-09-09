<template>
  <v-card>

    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Create New Board:</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-text-field label="Name" v-model="newBoardName" @keyup.enter="createNewBoard" required></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn primary flat @click="createNewBoard">Save</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        newBoardName: ''
      }
    },

    methods: {
      createNewBoard () {
        if (this.newBoardName) {
          Event.$emit('newBoardCreated', this.newBoardName)
          this.newBoardName = ''
        }
      }
    }
  }
</script>