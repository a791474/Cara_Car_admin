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
            isAdmin: false,
            activeTab: "",
            currentPage: 1,
            perPage: 10,
            adminData: [],
            adminState: 0,
        };
    },
    created() {
        this.axiosData();
        this.checkAdmin();
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
            axios.get(`${import.meta.env.VITE_PHP_URL}/back/backAdmin.php`)
                .then((response) => {
                    this.adminData = response.data.map(item => {
                        return {
                            ...item,
                            admin_state: parseInt(item.admin_state),
                            admin_authority: parseInt(item.admin_authority)
                        }
                    });
                    //用來確認我傳出去的是否為數字型態
                    // if (isNaN(this.adminData[0].admin_state)) {
                    // console.log("admin_state 不是數字");
                    // } else {
                    // console.log("admin_state 是數字");
                    // }
                    // console.log(this.adminData);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        async checkAdmin() {
            let userData = JSON.parse(localStorage.getItem('userData'));
            if (userData && userData.authority == 0) {
                this.isAdmin = true;
            }
        },
        async changeState(admin) {
            if (!this.isAdmin) {
                alert('你沒有操作權限！');
                return
            }
            let newState = admin.admin_state == true ? 1 : 0;
            let currentId = admin.admin_id;

            let editItem = new FormData();
            editItem.append("tableName", "admin")
            editItem.append("admin_state", newState)
            editItem.append("admin_id", currentId)

            try {
                // 發送請求更新admin_state 到後端
                await axios.post(`${import.meta.env.VITE_PHP_URL}/back/backAdminState.php`, editItem, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert('成功更新管理員登入權限！')
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
            <div v-for="admin in paginated" :key="admin.id" class="admin_account">
                <p>{{ admin.admin_id }}</p>
                <p>{{ admin.admin_name }}</p>
                <input id="authority" type="text" :value="authority(admin.admin_authority)" readonly>
                <Space direction="vertical">
                    <Space>
                        <Switch size="large" v-model="admin.admin_state" :true-value="1" :false-value="0"
                            :disabled="!isAdmin" @on-change="changeState(admin)">
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