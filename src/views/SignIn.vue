<template>
  <form @submit.prevent="onSubmit" >
    <input v-model="login" type="text"/>
    <input v-model="password" type="password"/>
    <input type="submit" value="Login"/>
  </form>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['user']),
    nextRoute () {
      return this.$route.query.redirect || '/'
    }
  },
  data () {
    return {
      login: '',
      password: ''
    }
  },
  watch: {
    user (auth) {
      if(!!auth){
        this.$router.replace(this.nextRoute)
      }
    }
  },
  methods: {
    async onSubmit () {
      const auth = await this.$auth.login(this.login, this.password)
    }
  }
}
</script>

