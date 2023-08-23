import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from '@/App.vue';
import { router } from '@router/index';
import $bus from '@plugins/events';

// import '@public/assets/css/uikit-custom.min.css';
// import '@public/assets/scss/uikit-custom.scss';
// import '@public/assets/css/app.min.css';
// import '@public/assets/css/global.css';
import '@/style.scss';

// import '@plugins/circlePlugin.js';

// import '@public/assets/js/jquery.min.js';
// import '@public/assets/js/plugins.min.js'; // jQuery, UIKit, UIKit Icon, jQUery Easing, CirclePlugins
// import '@public/assets/js/app.js';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.config.globalProperties.$bus = $bus;
app.config.globalProperties.$version = app.version;
app.config.globalProperties.$filters = {
	currencyUSD(value: string | number) {
		return `$ ${value} Dollar`;
	},
	currencyTL(value: string | number) {
		return `₺ ${value} TL`;
	}
};

app.mount('#app');