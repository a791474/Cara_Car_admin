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
        };
    },
    created() {
        this.axiosData();
    },
    computed: {
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
            axios.get(`${import.meta.env.VITE_CARA_URL}/back/backAdmin.php`)
                .then((response) => {
                    this.adminData = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
            handleBeforeChange() {
                return new Promise((resolve) => {
                    this.$Modal.confirm({
                        title: "確定切換權限嗎？",
                        content: "您確定切換權限嗎？",
                        onOk: () => {
                            resolve();
                        },
                    });
                });
            },
        changeState(status){
            // this.$Message.info('开关状态：' + JSON.stringify(status));
            return new Promise((resolve) => {
                    this.$Modal.confirm({
                        title: "確定切換權限嗎？",
                        content: "您確定切換權限嗎？",
                        onOk: () => {
                            resolve();
                        },
                    });
                });
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
                <p>{{ admin.admin_account }}</p>
                <p>{{ admin.admin_authority }}</p>
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