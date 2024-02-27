<script>
export default {
    data() {
        return {
            activeTab: "",
        };
    },
    created() {
        // 在組件創建時初始化activeTab
        this.updateActiveTab();
    },
    methods: {
        updateActiveTab() {
            // 從路由名稱中提取選項名稱
            const tabName = this.$route.name.replace('Back', '')
            // 根據提取的選項名稱設置activeTab
            this.activeTab = tabName;
        },
        currentSidebar(item) {
            this.activeTab = item;
            switch (item) {
                case 'Member':
                    this.$router.push({ name: 'BackMember' });
                    break;
                case 'Product':
                    this.$router.push({ name: 'BackProduct' });
                    break;
                case 'Order':
                    this.$router.push({ name: 'BackOrder' });
                    break;
                case '_SH_Product':
                    this.$router.push({ name: 'Back_SH_Product' });
                    break;
                case '_SH_Order':
                    this.$router.push({ name: 'Back_SH_Order' });
                    break;
                case 'Promotion':
                    this.$router.push({ name: 'BackPromotion' });
                    break;
                case 'News':
                    this.$router.push({ name: 'BackNews' });
                    break;
                case 'Admin':
                    this.$router.push({ name: 'BackAdmin' });
                    break;
                default: break;
            }
        }
    },
}
</script>

<template>
    <section class="sidebarFather">
        <div class="backSidebar">
            <div class="sidebarLogo">
                <img src="../assets/imgs/sidebar-logo.png" alt="logo">
            </div>
            <nav>
                <ul>
                    <li @click="currentSidebar('Member')" :class="{ active: activeTab === 'Member' }">
                        會員管理
                    </li>
                    <li @click="currentSidebar('Product')" :class="{ active: activeTab === 'Product' }">
                        商品管理
                    </li>
                    <li @click="currentSidebar('Order')" :class="{ active: activeTab === 'Order' }">
                        訂單管理
                    </li>
                    <li @click="currentSidebar('_SH_Product')" :class="{ active: activeTab === '_SH_Product' }">
                        二手商品管理
                    </li>
                    <li @click="currentSidebar('_SH_Order')" :class="{ active: activeTab === '_SH_Order' }">
                        二手訂單管理
                    </li>
                    <li @click="currentSidebar('Promotion')" :class="{ active: activeTab === 'Promotion' }">
                        促銷方案管理
                    </li>
                    <li @click="currentSidebar('News')" :class="{ active: activeTab === 'News' }">
                        最新消息管理
                    </li>
                    <li @click="currentSidebar('Admin')" :class="{ active: activeTab === 'Admin' }">
                        權限管理
                    </li>
                </ul>
            </nav>
        </div>
        <div class="drawBgHello">
            <img src="../assets/imgs/sidebar-bg-hello.png" alt="sidebarBg">
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backSidebar.scss'
</style>