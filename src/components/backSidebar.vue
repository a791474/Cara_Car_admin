<script>
export default {
    data() {
        return {
            activeTab:"",
        };
    },
    methods: {
        currentSidebar(item){
            this.activeTab = item;
            switch (item) {
                case 'member':
                    this.$router.push({ name: 'BackMember' });
                    break;
                case 'products':
                this.$router.push({ name: 'BackProduct' });
                    break;
                case 'orders':
                this.$router.push({ name: 'BackOrder' });
                    break;
                case 'SH-products':
                this.$router.push({ name: 'Back_SH_Product' });
                    break;
                case 'SH-orders':
                this.$router.push({ name: 'Back_SH_Order' });
                    break;
                case 'promotion':
                this.$router.push({ name: 'BackPromotion' });
                    break;
                case 'news':
                this.$router.push({ name: 'BackNews' });
                    break;
                case 'admin':
                this.$router.push({ name: 'BackAdmin' });
                    break;
                default: break;
                }
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
                <li @click="currentSidebar('member')" :class="{ active: activeTab === 'member' }">
                    會員管理
                </li>
                <li @click="currentSidebar('products')" :class="{ active: activeTab === 'products' }">
                    商品管理
                </li>
                <li @click="currentSidebar('orders')" :class="{ active: activeTab === 'orders' }">
                    訂單管理
                </li>
                <li @click="currentSidebar('SH-products')" :class="{ active: activeTab === 'SH-products' }">
                    二手商品管理
                </li>
                <li @click="currentSidebar('SH-orders')" :class="{ active: activeTab === 'SH-orders' }">
                    二手訂單管理
                </li>
                <li @click="currentSidebar('promotion')" :class="{ active: activeTab === 'promotion' }">
                    促銷商品管理
                </li>
                <li @click="currentSidebar('news')" :class="{ active: activeTab === 'news' }">
                    最新消息管理
                </li>
                <li @click="currentSidebar('admin')" :class="{ active: activeTab === 'admin' }">
                    權限管理
                </li>
            </ul>
        </nav>
        <div class="drawBgHello">
            <img src="../assets/imgs/sidebar-bg-hello.png" alt="sidebarBg">
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backSidebar.scss'
</style>