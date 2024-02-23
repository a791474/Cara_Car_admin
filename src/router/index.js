import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    // return 期望滾動到哪個的位置
		// 始终滚動到頂部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'BackLogin',
      component: () => import('../views/BackLogin.vue'),
      meta:{
        title: '後台登入 | Cara Car',
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
      path: '/BackProduct',
      name: 'BackProduct',
      component: () => import('../views/BackProduct.vue'),
      meta:{
        title: '新品管理 | Cara Car',
      }
    },
    {
      path: '/BackOrder',
      name: 'BackOrder',
      component: () => import('../views/BackOrder.vue'),
      meta:{
        title: '新品訂單管理 | Cara Car',
      }
    },
    {
      path: '/Back_SH_Product',
      name: 'Back_SH_Product',
      component: () => import('../views/Back_SH_Product.vue'),
      meta:{
        title: '二手商品管理 | Cara Car',
      }
    },
    {
      path: '/Back_SH_Order',
      name: 'Back_SH_Order',
      component: () => import('../views/Back_SH_Order.vue'),
      meta:{
        title: '二手訂單管理 | Cara Car',
      }
    },
    {
      path: '/BackPromotion',
      name: 'BackPromotion',
      component: () => import('../views/BackPromotion.vue'),
      meta:{
        title: '促銷方案管理 | Cara Car',
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
    {
      path: '/BackAdmin',
      name: 'BackAdmin',
      component: () => import('../views/BackAdmin.vue'),
      meta:{
        title: '權限管理 | Cara Car',
      }
    },
  ]
})
const isAuthenticated = () => {
  const userToken = localStorage.getItem("userToken")
  return userToken? true: false
}

//以下為上方新增meta:{title:}去更改每個頁面的頁簽名稱才需要解開註解。
router.beforeEach(async (to, from) => {
  if( to.meta && to.meta.title){
      document.title = to.meta.title
  }

  if(to.name == 'BackLogin' ){
    return

  }else if ( !isAuthenticated() && to.name !== 'BackLogin') {
    // 檢查用戶是否已登錄
    console.log(1);
    return { name: 'BackLogin' }
  }
})
export default router
