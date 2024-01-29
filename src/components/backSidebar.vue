<script>
export default {
    data() {
        return {
            // currentSidebar:"",
            activeTab:"",
        };
    },
    methods: {
        currentSidebar(item){
            // this.currentSidebar = item
            this.activeTab = item
        }
    },
}
</script>

<template>
        <div class="backSidebar">
        <div class="sidebarLogo">
            <img src="../assets/imgs/sidebar-logo.png" alt="logo">
        </div>
        <nav>
            <ul>
                <li :class="{ active: activeTab === 'member' }" @click="currentSidebar('member')">會員管理</li>
                <li :class="{ active: activeTab === 'products' }" @click="currentSidebar('products')">商品管理</li>
                <li :class="{ active: activeTab === 'orders' }" @click="currentSidebar('orders')">訂單管理</li>
                <li :class="{ active: activeTab === 'SH-products' }" @click="currentSidebar('SH-products')">二手商品管理</li>
                <li :class="{ active: activeTab === 'SH-orders' }" @click="currentSidebar('SH-orders')">二手訂單管理</li>
                <li :class="{ active: activeTab === 'promotion' }" @click="currentSidebar('promotion')">促銷商品管理</li>
                <li :class="{ active: activeTab === 'news' }" @click="currentSidebar('news')">最新消息管理</li>
                <li :class="{ active: activeTab === 'admin' }" @click="currentSidebar('admin')">權限管理</li>
            </ul>
        </nav>
        <div class="drawBg">
            <img src="../assets/imgs/sidebar-bg-hello.png" alt="sidebarBg">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backSidebar.scss'
</style>