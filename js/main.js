import routes from './routes.js';
import { fetchSite } from './content.js';

export const store = Vue.reactive({
    dark: JSON.parse(localStorage.getItem('dark')) || false,
    site: { name: '3Dash Hardest Levels', version: '', discord: '', rules: [], tags: [] },
    toggleDark() {
        this.dark = !this.dark;
        localStorage.setItem('dark', JSON.stringify(this.dark));
    },
    async loadSite() {
        const site = await fetchSite();
        if (site) {
            this.site = { ...this.site, ...site };
            document.title = this.site.name;
        }
    },
});

store.loadSite();

const app = Vue.createApp({
    data: () => ({ store }),
});
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

app.use(router);

app.mount('#app');
