<script>
import BackSidebar from '@/components/backSidebar.vue';
import BackTitle from '@/components/backTitle.vue';
export default {
    data(){
        return{
    // currentSidebar:"",
    activeTab:"",
    adminList:[
        
    ]
        };
    },
    components:{
    BackSidebar,
    BackTitle,
},
    created() {
        
    },
    methods: {
        
    },
    mounted() {
        
    },
}
</script>

<template>
    <div class="backAdmin">
        <BackSidebar />
        <BackTitle />
        <div class="subtitle">
            <p>管理員編號</p>
            <p>管理員名稱</p>
            <p>權限等級</p>
            <p>使用中</p>
        </div>
        <div class="subtitle_line"></div>
        <div class="admin_">

        </div>
    </div>

</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backSidebar.scss';
@import '@/assets/scss/components/backTitle.scss';
@import '@/assets/scss/page/backAdmin.scss';
</style>