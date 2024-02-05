<script>
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import PageNumberBG from '@/components/PageNumberBG.vue';
import NewPromoDrawer from '@/components/Drawer/NewPromoDrawer.vue';
import RevisePromoDrawer from '@/components/Drawer/ReviseItemDrawer.vue';
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
            promos: [
                { id: 1, plan: '西洋情人節', start_date: '2024.02.14', finish_date: '2024.02.21', ratio: 10, promo_state: '啟用中' },
            ]
        };
    },
    created() {

    },
    methods: {
        updateRatio(promo) {
            console.log('Updated ratio for promo ID:', promo.id, 'New ratio:', promo.ratio);
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
            <div v-for="promo in promos" :key="promo.id" class="promoCard">
                <p class="id">{{ promo.id }}</p>
                    <ReviseItemDrawer />
                    <div class="plan">{{ promo.plan }}</div>
                    <div class="start_date">{{ promo.start_date }}</div>
                    <div class="finish_date">{{ promo.finish_date }}</div>
                    <input type="number" class="ratio" v-model="promo.ratio" @input="updateRatio(promo)"
                        id="ratio"><span>%</span>
                    <div class="promo_state">{{ promo.promo_state }}
                    </div>
            </div>
            <PageNumber />
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backPromotion.scss';
</style>