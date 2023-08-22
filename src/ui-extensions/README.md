# UI Extensions

This directory contains 2 examples of UI extensions built with frontend technologies other than Angular:

### Vue App

The Vue app is very simple - it is a single static HTML file and a single JavaScript file - the Vue.js runtime.

### Vue 3 App

This App is actually the Vue 3 Hello World. It handles typescript support, and most importantly, it allow to use an embedded router to explore your app in Vendure directly. 

Please be aware that you need to specify the `base` value in the `nuxt.config.ts` in order to compile and server later on the app properly. 

Also, in order to reach route params, the devkit from vendure has been imported to help you figure out how to access route params. 

Please mind that internal router is something you should avoid but if no choice is given to you, you could use router's interceptors to redirect to the correct route

### React App

The React app is more complex than the Vue example as it requires a build step. It can also be run in dev mode with live-reloading. In this case, follow the directions in the [react-ui-extension.module.ts](./modules/react-ui-extension.module.ts) file to point to the dev server URL.

