<script>
import axios from 'axios';
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import PageNumberBG from '@/components/PageNumberBG.vue';
export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
        PageNumberBG,
    },
    data() {
        return {
            activeTab: "",
            currentPage: 1,
            perPage: 10,
            adminData: [],
            adminState: 0,
        };
    },
    created() {
        this.axiosData();
    },
    computed: {
        authority() {
            return (authority) => authority === 1 ? "一般管理員" : "超級管理員";
        },
        paginated() {
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.adminData.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.adminData.length / this.perPage);
        },
    },
    methods: {
        axiosData() {
            axios.get(`${import.meta.env.VITE_LPHP_URL}/back/backAdmin.php`)
                .then((response) => {
                    this.adminData = response.data;
                    console.log(this.adminData);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        changeState(admin) {
            const newState = admin.admin_state == true ? 1 : 0;
            const currentId =admin.admin_id;
            // console.log(newState);

            const editItem = new FormData();
            editItem.append("tableName", "admin")
            editItem.append("admin_state", newState)
            editItem.append("admin_id", currentId)
            // console.log(editItem);
            try {
                // 發送請求更新admin_state 到後端
                axios.post(`${import.meta.env.VITE_LPHP_URL}/back/backAdminState.php`, editItem, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log('Updated admin state:', newState);
            } catch (error) {
                console.error('Failed to update admin state:', error);
            }
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },
    },
    mounted() {

    },
}
</script>

<template>
    <div class="backAdmin">
        <BackSidebar />
        <div class="adminContent">
            <BackTitle />
            <div class="subtitle">
                <p>管理員編號</p>
                <p>管理員名稱</p>
                <p>權限等級</p>
                <p>啟用狀態</p>
            </div>
            <div class="subtitle_line"></div>
            <div v-for="(admin, index) in paginated" :key="index" class="admin_account">
                <p>{{ admin.admin_id }}</p>
                <p>{{ admin.admin_name }}</p>
                <input id="authority" type="text" :value="authority(admin.admin_authority)" readonly>
                <Space direction="vertical">
                    <Space>
                        <Switch size="large" v-model="admin.admin_state" :true-value="1" :false-value="0"
                            @on-change="changeState(admin)">
                            <template #open>
                                <span>啟用</span>
                            </template>
                            <template #close>
                                <span>關閉</span>
                            </template>
                        </Switch>
                    </Space>
                </Space>
                <div class="line"></div>
            </div>
            <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backAdmin.scss';
</style>