<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn 
                      type="submit"
                      >
                      Sign In
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

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
      loading: false,
      email: '',
      password: '',
      auth: null
    }
  },
  watch: {
    user (auth) {
      if(auth){
        this.$router.replace(this.nextRoute)
      }
    }
  },
  methods: {
    async onSignin () {
      const auth = await this.$auth.login(this.email, this.password)
      this.auth = auth
    }
  }
}
</script>

