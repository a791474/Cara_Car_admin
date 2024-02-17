<script>
import axios from 'axios';
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import NewPromoDrawer from '@/components/Drawer/NewPromoDrawer.vue';
import RevisePromoDrawer from '@/components/Drawer/RevisePromoDrawer.vue';
export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
        NewPromoDrawer,
        RevisePromoDrawer
    },
    data() {
        return {
            activeTab: "",
            currentPage: 1,
            perPage: 5,
            promoData:[],
        };
    },
    created() {
        axios.get(`${import.meta.env.VITE_CARA_URL}/back/backPromotion.php`)
                .then((response) => {
                    this.promoData = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
    },
    computed:{
        // 頁數切換
        paginated(){
            const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
            const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
            return this.promoData.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
        },
        totalPages() {
            return Math.ceil(this.promoData.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
        },
        Checkboxes(){
            return this.paginated.map(promo => {
            return promo.promo_state === 1;
        });
        },
        promoState(){
            return (promoState) => promoState === 1 ? "啟用中" : "未啟用";
        },
    },
    methods: {
        updateRatio(promoData) {
            console.log('Updated ratio for promo ID:', promoData.promo_id, 'New ratio:', promoData.promo_ratio);
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
    <div class="promotion">
        <BackSidebar />
        <div class="promoContent">
            <BackTitle />
            <div class="addButton">
                <NewPromoDrawer />
            </div>
            <div class="subtitle">
                <ol>
                    <li>方案編號</li>
                    <li></li>
                    <li>促銷名稱</li>
                    <li>起始日期</li>
                    <li>結束日期</li>
                    <li>折扣率</li>
                    <li>狀態</li>
                </ol>
            </div>
            <div class="subtitle_line"></div>
            <div v-for="(promo, index) in paginated" :key="index" class="promoCard">
                <ol>
                    <li class="promo_id">{{ promo.promo_id }}</li>
                    <li><RevisePromoDrawer :detail="promo"/></li>
                    <li class="promo_name">{{ promo.promo_name }}</li>
                    <li class="promo_start_date">{{ promo.promo_start_date }}</li>
                    <li class="promo_end_date">{{ promo.promo_end_date }}</li>
                    <li>
                        <input id="promoRatio" type="number" class="ratio" v-model="promo.promo_ratio" @input="updateRatio(promo)"><span>%</span>
                    </li>
                    <li><input id="promoState" type="text" :value="promoState(promo.promo_state)" readonly></li>
                </ol>
            </div>
            <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backPromotion.scss';
</style>