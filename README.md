# rally-app

> Rally timing is an app to take times in rally competitions

### Project setup
```
yarn install
```
### Ony for Linux
```
sudo chown root:root node_modules/electron/dist/chrome-sandbox
```

```
sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
```

### Compiles and hot-reloads for development
```
yarn electron:serve
```

### Compiles and minifies for production
```
yarn electron:build --linux deb --win nsis
```

> **Note:** to build for windows from linux need wine

### Customize configuration
See [Vue Configuration Reference](https://cli.vuejs.org/config/).

See [Vue-electron guide](https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/)

### Development tools
- nodeJS >=14.15.1
- yarn >=1.22.5

### online times using firebase
Add firebase config in `~/src/firebase/firebase.config.js`

```js
export const config = {
    // firebase config params here
}
```
