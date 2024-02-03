<script>
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
export default {
    data() {
        return {
            activeTab: "",
            adminAccounts: [
                { id: '001', name: '王老闆', role: 'super manager', checked: true },
                { id: '002', name: '林副理', role: 'manager', checked: false },
                { id: '003', name: '陳經理', role: 'manager', checked: false }
            ]
        };
    },
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
    },
    created() {

    },
    methods: {
        toggleStatus(index) {
            this.admins[index].status = !this.admins[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        }
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
        <div v-for="(admin, index) in adminAccounts" :key="index" class="admin_account">
            <p>{{ admin.id }}</p>
            <p>{{ admin.name }}</p>
            <p>{{ admin.role }}</p>
            <input :id="'s' + index" type="checkbox" class="switch" v-model="admin.checked">
            <label :for="'s' + index" style="display: none;"></label>
            <div class="line"></div>
        </div>
        <PageNumber />
    </div>
        </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backAdmin.scss';
@import '@/assets/scss/components/switchBtn.scss';
</style>