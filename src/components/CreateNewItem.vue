<template>
  <v-card v-show="showing">

    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>Create New {{ type }}:</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile>
        <v-list-tile-content>
          <v-text-field label="Name" v-model="newItemName" @keyup.enter="createNewItem" required></v-text-field>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn primary flat @click="showing=false">Cancel</v-btn>
      <v-spacer></v-spacer>
      <v-btn primary flat @click="createNewItem">Save</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  export default {
    props: ['type'],

    data () {
      return {
        newItemName: '',
        showing: true
      }
    },

    methods: {
      createNewItem () {
        if (this.newItemName) {
          Event.$emit('newItemCreated', this.type || 'board', this.newItemName)
          this.newItemName = ''
          this.showing = false
        }
      }
    }
  }
</script>