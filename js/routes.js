import List from './pages/List.js';

export default [
    { path: '/', component: List },
    // Anything else goes back to the list
    { path: '/:pathMatch(.*)*', redirect: '/' },
];
