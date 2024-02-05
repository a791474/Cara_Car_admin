<script>
import axios from 'axios';
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import PageNumberBG from '@/components/PageNumberBG.vue';
import NewPromoDrawer from '@/components/Drawer/NewPromoDrawer.vue';
import RevisePromoDrawer from '@/components/Drawer/RevisePromoDrawer.vue';
export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
        PageNumberBG,
        NewPromoDrawer,
        RevisePromoDrawer
    },
    data() {
        return {
            // promos: [
            //     { id: 1, plan: '西洋情人節', start_date: '2024.02.14', finish_date: '2024.02.21', ratio: 10, promo_state: '啟用中' },
            // ]
            promoData:[],
        };
    },
    created() {
        axios.get(`${import.meta.env.VITE_CARA_URL}/backPromotion.php`)
                .then((response) => {
                    this.promoData = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
    },
    methods: {
        updateRatio(promoData) {
            console.log('Updated ratio for promo ID:', promoData.promo_id, 'New ratio:', promoData.promo_ratio);
        }
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
            <div v-for="promo in promoData" :key="promo" class="promoCard">
                <ol>
                    <li>{{ promo.promo_id }}</li>
                    <li><RevisePromoDrawer /></li>
                    <li>{{ promo.promo_name }}</li>
                    <li>{{ promo.promo_start_date }}</li>
                    <li>{{ promo.promo_end_date }}</li>
                    <input type="number" class="ratio" v-model="promo.promo_ratio" @input="updateRatio(promo)"><span>%</span>
                    <!-- <li>{{ promo.promo_state }}</li> -->
                </ol>
            </div>
            <PageNumber />
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backPromotion.scss';
</style>