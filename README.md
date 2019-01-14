# vue-auth-bolierplate


## Firebase / Firestore Setup
go to
```
http://firebase.coogle.com
```
1. Under the Authentication tab - select email/password and click the activate switch.
  - create a user and set a field in that user 
  ```
  Name: isAdmin  
  Type: boolean
  Value: true
  ```
  This will be your admin user. You can add more admin users if you like.

2. Under the database tab - Create a Cloud Firestore database
3. Under Storage tab - enable storage.
4. At the top of the main menu find "Project Settings" & click on the gear to the right. At the bottom of the next screen in "Your Apps" select "Web App" and replace the code in src/firebase/index.js with the setting shown.

You should then be good to go.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
