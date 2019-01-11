<template>
  <div>Logged out</div>
</template>
<script>
export default {
  async mounted () {
    await this.$auth.logout()
    this.$router.replace({name: 'home'})
  }
}
</script>
