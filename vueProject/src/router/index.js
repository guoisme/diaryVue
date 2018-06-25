import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Reg from '@/pages/Reg'
import Edit from '@/pages/Edit'
import Write from '@/pages/diary/Write'
import Manage from '@/pages/diary/Manage'
import Update from '@/pages/diary/Update'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/reg',
      name:'Reg',
      component:Reg
    },
    {
      path:'/write',
      name:'Write',
      component:Write
    },
    {
      path:'/edit',
      name:'Edit',
      component:Edit
    },
    {
      path:'/manage',
      name:'Manage',
      component:Manage
    },
    {
      path:'/update',
      name:'Update',
      component:Update
    }
  ]
})
