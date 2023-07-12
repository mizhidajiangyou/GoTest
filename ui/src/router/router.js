import { createRouter, createWebHistory } from 'vue-router'
import RunBash from '../view/RunBash.vue'

const routes = [
    {
        path: '/',
        name: 'RunBash',
        component: RunBash
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router