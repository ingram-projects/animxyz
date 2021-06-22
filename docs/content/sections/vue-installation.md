---
title: Installation
id: vue-installation
quote: May the force be with Vue.
---

### Using a package manager

VueAnimXYZ can be installed using your favorite package manager:

<div class="code-label">Vue 2.x</div>

```bash
# with npm
npm install @animxyz/vue

# with yarn
yarn add @animxyz/vue
```

<div class="code-label">Vue 3.x</div>

```bash
# with npm
npm install @animxyz/vue3

# with yarn
yarn add @animxyz/vue3
```

After installation, you will need to import VueAnimXYZ into your project and tell the Vue instance to use the [plugin](https://vuejs.org/v2/guide/plugins.html). This has to be done before you instantiate your Vue app.

<div class="code-label">Vue 2.x</div>

```js
import Vue from 'vue'
import VueAnimXYZ from '@animxyz/vue'
import '@animxyz/core' // Import css here if you haven't elsewhere

Vue.use(VueAnimXYZ)

// Instantiate your Vue instance after using plugins
// new Vue(...)
```

<div class="code-label">Vue 3.x</div>

```js
import { createApp } from 'vue'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core' // Import css here if you haven't elsewhere
import App from './App.vue' // Your entry component

const app = createApp(App)

app.use(VueAnimXyz)

// Mount your Vue instance after using plugins
// app.mount(...)
```

### Using jsDelivr

To install VueAnimXYZ using a CDN put this script in the `<head>` of your `index.html` file:

<div class="code-label">Vue 2.x</div>

```html
<script src="https://cdn.jsdelivr.net/npm/@animxyz/vue@0.6.0/dist/VueAnimXyz.js"></script>
```

<div class="code-label">Vue 3.x</div>

```html
<script src="https://cdn.jsdelivr.net/npm/@animxyz/vue3@0.6.0/dist/VueAnimXyz.js"></script>
```