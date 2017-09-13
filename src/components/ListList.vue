<template>
  <v-list two-line>

    <template v-for="item in list.cards">

      <v-list-tile v-bind:key="item.id" @click="" download>

        <v-list-tile-content>
          <v-list-tile-title v-html="item.name"></v-list-tile-title>
          
          <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
        </v-list-tile-content>

      </v-list-tile>

    </template>

  </v-list>  
</template>

<script>
  export default {
    props: ['list']
  }
</script>