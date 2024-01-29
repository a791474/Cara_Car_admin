<script>
// import BackSidebar from '@/components/backSidebar.vue';
// import BackTitle from '@/components/backTitle.vue';
export default {
    data() {
        return {
            // currentSidebar:"",
            activeTab: "",
            admins: [
                { id: '001', name: '王老闆', permission: 'super manager', status: true },
                { id: '002', name: '林副理', permission: 'manager', status: true },
                { id: '003', name: '陳經理', permission: 'manager', status: true }
            ]
        };
    },
    components: {
        // BackSidebar,
        // BackTitle,
    },
    created() {

    },
    methods: {
        toggleStatus(index) {
            this.admins[index].status = !this.admins[index].status;
        },
        currentSidebar(item) {
            // this.currentSidebar = item
            this.activeTab = item
        }
    },
    mounted() {

    },
}
</script>

<template>
    <div class="backAdmin">
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
            <div class="drawBgHello">
                <img src="../assets/imgs/sidebar-bg-hello.png" alt="sidebarBg">
            </div>
        </div>
        <div class="adminContent">
            <div class="backWelcome">
                <h1>Good Morning, Manager </h1>
                <div class="drawBgBalloon">
                    <img src="../assets/imgs/sidebar-bg-balloon.png" alt="BG">
                </div>
                <RouterLink to="/">
                    <button>登出</button>
                </RouterLink>
            </div>
            <div class="subtitle">
            <p>管理員編號</p>
            <p>管理員名稱</p>
            <p>權限等級</p>
            <p>啟用中</p>
        </div>
        <div class="subtitle_line"></div>
        <div class="admin_account">
            <p>001</p>
            <p>王老闆</p>
            <p>super manager</p>
            <button @click="toggleStatus(index)">啟用</button>
            <div class="line"></div>
        </div>
    </div>
        </div>
</template>

<style lang="scss" scoped>
// @import '@/assets/scss/components/backSidebar.scss';
// @import '@/assets/scss/components/backTitle.scss';
@import '@/assets/scss/page/backAdmin.scss';
</style>