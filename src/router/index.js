import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/Page1.vue'
import PageTwo from '../views/Page2.vue'

const routes = [{
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            { path: 'home', component: Home },
            { path: 'user', component: User },
            { path: 'mall', component: Mall },
            { path: 'page1', component: PageOne },
            { path: 'page2', component: PageTwo }
        ]
    }


]

const router = new VueRouter({
    routes
})

export default router

Vue.use(VueRouter)