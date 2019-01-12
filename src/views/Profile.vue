<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <div v-if="loading === true">
          <div class="fingerprint-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
        </div>
        <div v-else>
          <h3>Profile <strong>Admin?: </strong> {{ this.isAdmin }}</h3>
          <v-avatar
              v-if="this.imageExt"
              :tile="tile"
              :size="100"
              color="grey lighten-4"
            >
              <img :src="this.imageExt" alt="User Avatar">
            </v-avatar>
          <div v-if="!editing">
            <span> {{ this.userId }}  | {{ this.userLevel }}</span><br />
            <span> {{ this.userEmail }} </span><br />
            <span> {{ this.firstName }} {{ this.lastName}} </span><br />
            <span> Joined: {{ this.joined }} </span><br />
            <span> Updated: {{ this.updated }} </span><br />
            <v-btn color="green" @click="onClickEdit">Edit Profile</v-btn>
          </div>
          <div v-else>
            Edit stuff here
            <form>
              <v-flex xs12 sm6 md3>
                <v-text-field
                  v-model="editedFirstName"
                  label="First Name"
                  single-line
                  outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md3>
              <v-text-field
                v-model="editedLastName"
                label="Last Name"
                single-line
                outline
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 offset-sm3>
                <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="onFilePicked">
              </v-flex>
              <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="150">
              </v-flex>
              <v-btn color="red" @click="onCloseEdit">Close</v-btn>
              <v-btn color="green" @click="onUpdateProfile">Update Profile</v-btn>
            </form>
          </div>
          <div v-if="this.isAdmin">
            <h4>Only show to Admin</h4>
            <p>{{ userProfile.isAdmin }}</p>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      loading: true,
      editing: false,
      userId: null,
      userEmail: '',
      firstName: '',
      lastName: '',
      avatar: '',
      imageUrl: '',
      joined: '',
      updated: '',
      isAdmin: false,
      userLevel: 'free',
      editedFirstName: '',
      editedLastName: '',
      editedAvatar: '',
      image: null,
      imageExt: ''
    }
  },
  computed: {
    ...mapState(['user', 'userProfile'])
  },
  mounted: function() {
    var self = this
    setTimeout(function(){
      self.userId = self.user.uid
      self.userEmail = self.user.email
      if (self.userProfile.isAdmin) {
        self.isAdmin = self.userProfile.isAdmin
      }
      if (self.userProfile.userLevel) {
        self.userLevel = self.userProfile.userLevel
      }
      if (self.userProfile.joinDate) {
        self.joined = self.userProfile.joinDate
      }
      if (self.userProfile.updated) {
        self.updated = self.userProfile.updated
      }
      if (self.userProfile.firstName) {
        self.firstName = self.userProfile.firstName
        self.editedFirstName = self.userProfile.firstName
      }
      if (self.userProfile.lastName) {
        self.lastName = self.userProfile.lastName
        self.editedLastName = self.userProfile.lastName
      }
      if (self.userProfile.avatar) {
        self.avatar = self.userProfile.avatar
        self.editedAvatar = self.userProfile.avatar
      }
      if (self.userProfile.imageUrl) {
        self.imageUrl = self.userProfile.imageUrl
      }
      if (self.userProfile.imageExt) {
        self.imageExt = 'https://firebasestorage.googleapis.com/v0/b/mirror2019-b60e0.appspot.com/o/users%2F'+self.user.uid+self.userProfile.imageExt+'?alt=media'
      }
      self.loading = false
    }, 2000)
  },
  methods: {
    onUpdateProfile () {
      this.editing = false
      const dateNow = new Date()
      this.$store.dispatch('updateUserData', {
        id: this.userId,
        firstName: this.editedFirstName,
        lastName: this.editedLastName,
        image: this.image,
        updated: dateNow
      })
      this.firstName = this.editedFirstName,
      this.lastName = this.editedLastName,
      this.avatar = this.editedAvatar
    },
    onCloseEdit () {
      this.editing = false
    },
    onClickEdit () {
      this.editing = true
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let fileName = files[0].name
      if (fileName.lastIndexOf('.') <= 0) {
        alert('Please add a valid image (.jpg, .png, .gif)')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
