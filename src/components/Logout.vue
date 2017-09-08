<template>
  <div>
    <h2>{{ msg }}</h2>
  </div>
</template>


<script>
export default {
  data () {
    return {
      msg: 'You will be logged out now ...'
    }
  },

  created () {
    let token = localStorage.getItem('token')
    if (!token) {
      return false
    }

    axios.get('logout?api_token=' + token)
    .then(response => {
      this.msg = 'You are logged out!'
      localStorage.removeItem('token')
      Event.$emit('logout')
    })
  }
}
</script>
