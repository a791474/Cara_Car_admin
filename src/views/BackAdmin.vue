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
            // adminAccounts: [
            //     { id: '001', name: 'Cara Car', role: 'super manager', checked: true },
            //     { id: '002', name: 'Yeeeeeeeeee', role: 'manager', checked: true },
            //     { id: '003', name: 'Lynn', role: 'manager', checked: true },
            //     { id: '004', name: 'YuShin', role: 'manager', checked: true },
            //     { id: '005', name: 'Remkfer', role: 'manager', checked: true },
            //     { id: '006', name: 'Kelly', role: 'manager', checked: true },
            //     { id: '007', name: 'Howpikachu', role: 'manager', checked: true },
            //     { id: '008', name: 'A', role: 'employee', checked: false },
            //     { id: '009', name: 'B', role: 'employee', checked: false },
            //     { id: '010', name: 'C', role: 'employee', checked: false },
            //     { id: '011', name: 'D', role: 'employee', checked: false },
            //     { id: '012', name: 'E', role: 'employee', checked: false },
            //     { id: '013', name: 'F', role: 'employee', checked: false },
            //     { id: '014', name: 'G', role: 'employee', checked: false },
            //     { id: '015', name: 'H', role: 'employee', checked: false },
            //     { id: '016', name: 'I', role: 'employee', checked: false },
            //     { id: '017', name: 'J', role: 'employee', checked: false },
            //     { id: '018', name: 'K', role: 'employee', checked: false },
            //     { id: '019', name: 'L', role: 'employee', checked: false },
            //     { id: '020', name: 'M', role: 'employee', checked: false },
            //     { id: '021', name: 'N', role: 'employee', checked: false },
            //     { id: '022', name: 'O', role: 'employee', checked: false },
            //     { id: '023', name: 'P', role: 'employee', checked: false },
            //     { id: '024', name: 'Q', role: 'employee', checked: false },
            //     { id: '025', name: 'R', role: 'employee', checked: false },
            //     { id: '026', name: 'S', role: 'employee', checked: false },
            //     { id: '027', name: 'T', role: 'employee', checked: false },
            //     { id: '028', name: 'U', role: 'employee', checked: false },
            //     { id: '029', name: 'V', role: 'employee', checked: false },
            //     { id: '030', name: 'W', role: 'employee', checked: false },
            //     { id: '031', name: 'X', role: 'employee', checked: false },
            //     { id: '032', name: 'Y', role: 'employee', checked: false },
            //     { id: '033', name: 'Z', role: 'employee', checked: false },
            //     { id: '034', name: '', role: 'employee', checked: false },
            //     { id: '035', name: '', role: 'employee', checked: false },
            //     { id: '036', name: '', role: 'employee', checked: false },
            //     { id: '037', name: '', role: 'employee', checked: false },
            //     { id: '038', name: '', role: 'employee', checked: false },
            //     { id: '039', name: '', role: 'employee', checked: false },
            //     { id: '040', name: '', role: 'employee', checked: false },
            //     { id: '041', name: '', role: 'employee', checked: false },
            //     { id: '042', name: '', role: 'employee', checked: false },
            //     { id: '043', name: '', role: 'employee', checked: false },
            //     { id: '044', name: '', role: 'employee', checked: false },
            //     { id: '045', name: '', role: 'employee', checked: false },
            //     { id: '046', name: '', role: 'employee', checked: false },
            //     { id: '047', name: '', role: 'employee', checked: false },
            //     { id: '048', name: '', role: 'employee', checked: false },
            //     { id: '049', name: '', role: 'employee', checked: false },
            //     { id: '050', name: '', role: 'employee', checked: false },
            // ],
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
            axios.get(`${import.meta.env.VITE_CARA_URL}/backAdmin.php`)
                .then((response) => {
                    this.adminData = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        // handleBeforeChange() {
        //     return new Promise((resolve) => {
        //         this.$Modal.confirm({
        //             title: "確定切換權限嗎？",
        //             content: "您確定切換權限嗎？",
        //             onOk: () => {
        //                 resolve();
        //             },
        //         });
        //     });
        // },
        // changeState(status){
        //     this.$Message.info('开关状态：' + status);
        // },
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
                <p>啟用中</p>
            </div>
            <div class="subtitle_line"></div>
            <div v-for="(admin, index) in paginated" :key="index" class="admin_account">
                <p>{{ admin.admin_id }}</p>
                <p>{{ admin.ADMIN_ACCOUNT }}</p>
                <p>{{ admin.ADMIN_AUTHORITY }}</p>
                <Space direction="vertical">
                    <Space> 
                        <Switch 
                        size="large"
                        v-model="admin.ADMIN_STATE" 
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
                <!-- <input :id="'s' + index" type="checkbox" class="switch" v-model="admin.ADMIN_STATE">
                <label :for="'s' + index" style="display: none;"></label> -->
                <div class="line"></div>
            </div>
            <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
        </div>
    </div>
    <!-- <PageNumberBG /> -->
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backAdmin.scss';
</style>