import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AnimePage from '../components/AnimePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { path: '/home', redirect: '/' },
        { path: '/animes', component: AnimePage }
    ]
})

export default router
