<script>
export default {
    components: {

    },
    data() {
        return {

        }
    },
    methods: {
    },
}
</script>

<template>
    <div class="page_number">
        <div class="bgImg01">
            <img src="../../assets/imgs/button/pageNumber/parts_cloud_1 1.png" alt="">
        </div>
        <div class="bgImg02">
            <img src="../../assets/imgs/button/pageNumber/parts_cloud_2 1.png" alt="">
        </div>
        <div class="bgImg03">
            <img src="../../assets/imgs/button/pageNumber/parts_balloon_1 3.png" alt="">
        </div>
        <div class="page_switcher">
            <button class="arrow_btn">
                <div class="arrow_rtl"></div>
            </button>
        </div>
        <ol class="page_chooser">
            <li class="chooser_list">
                <button class="number">
                    1
                </button>
            </li>
            <li class="chooser_list">
                <button class="number">
                    2
                </button>
            </li>
            <li class="chooser_list">
                <button class="number">
                    3
                </button>
            </li>
            <li class="chooser_list">
                <button class="number">
                    4
                </button>
            </li>
            <li class="chooser_list">
                <button class="number">
                    5
                </button>
            </li>
        </ol>
        <div class="page_switcher">
            <button class="arrow_btn">
                <div class="arrow_ltr"></div>
            </button>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/components/pageNumber.scss';
</style>