<script>

export default {
    data() {
        return {

        }
    },
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    methods: {
        changePage(pageNumber) {
            // 告訴父組件更改當前頁碼
            this.$emit('pageChange', pageNumber);
        },
        previousPage() {
            if (this.currentPage > 1) {
                // 告訴父組件減少當前頁碼
                this.$emit('pageChange', this.currentPage - 1);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                // 告訴父組件增加當前頁碼
                this.$emit('pageChange', this.currentPage + 1);
            }
        },
    },
}
</script>

<template>
    <div class="page_number">
        <div class="page_switcher">
            <button class="arrow_btn" @click="previousPage">
                <div class="arrow_rtl"></div>
            </button>
        </div>
        <ol class="page_chooser">
            <li v-for="pageNumber in totalPages" :key="pageNumber" class="chooser_list">
                <button 
                class="number" 
                @click="changePage(pageNumber)" 
                :class="{ active: pageNumber === currentPage }"
                >
                    {{ pageNumber }}
                </button>
            </li>
        </ol>
        <!-- <ol class="page_chooser">
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
        </ol> -->
        <div class="page_switcher">
            <button class="arrow_btn" @click="nextPage">
            <div class="arrow_ltr"></div>
            </button>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/components/pageNumber.scss';
</style>