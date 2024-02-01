import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    // return 期望滾動到哪個的位置
		// 始终滚動到頂部
    return { top: 0 }
  },
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component:
    //   meta:{
    //     title: '後台登入 | Cara Car',
    //   }
    // },
    {
      path: '/',
      name: 'BackLogin',
      component: () => import('../views/BackLogin.vue'),
      meta:{
        title: '後台登入 | Cara Car',
      }
    },
    {
      path: '/BackAdmin',
      name: 'BackAdmin',
      component: () => import('../views/BackAdmin.vue'),
      meta:{
        title: '權限管理 | Cara Car',
      }
    },
    {
      path: '/BackMember',
      name: 'BackMember',
      component: () => import('../views/BackMember.vue'),
      meta:{
        title: '會員管理 | Cara Car',
      }
    },
    {
      path: '/BackNews',
      name: 'BackNews',
      component: () => import('../views/BackNews.vue'),
      meta:{
        title: '最新消息管理 | Cara Car',
      }
    },
  ]
})
//以下為上方新增meta:{title:}去更改每個頁面的頁簽名稱才需要解開註解。
router.beforeEach(async (to, from) => {
  if( to.meta && to.meta.title){
      document.title = to.meta.title
  }
})
export default router
