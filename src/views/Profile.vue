<template>
  <section>
    <h3>Profile</h3>
    <p>{{displayName}}</p>
  </section>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['user']),
    displayName () {
      return this.user.displayName
    }
  }
}
</script>
