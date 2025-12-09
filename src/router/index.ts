import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AnimePage from '../components/AnimePage.vue'
import AnimeDetailPage from '../components/AnimeDetailPage.vue'
import MyListPage from '../components/MyListPage.vue'
import QuizPage from '../components/Quiz.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/catalog', name: 'catalog', component: AnimePage },
        { path: '/my-list', name: 'my-list', component: MyListPage },
        { path: '/animes/:id', name: 'anime-detail', component: AnimeDetailPage },
        { path: '/quiz', name: 'quiz', component: QuizPage }
    ]
})

export default router
