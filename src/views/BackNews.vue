<template>

    <main class="backNews">
        <BackSidebar />

        <section class="backNewsPart">
            <BackTitle />

            <div class="searchBar">
                <select v-model="selectedOption" id="selectedOption">
                    <option value="eventNo">消息編號</option>
                    <option value="eventTitle">消息標題</option>
                </select>
                <input type="text" v-model="searchText" :placeholder="placeholderText">
                <button @click="search" class="searchBtn">搜尋</button>
                <EventNewItemDrawer />
            </div>

            <div class="eventsList">

                <!-- {{ newsData }} -->
                <ul class="eventsTitle">
                    <li class="EventReviseItemDrawer"></li>
                    <li>消息編號</li>
                    <li>消息分類</li>
                    <li>標題</li>
                    <li>消息期間</li>
                    <li>消息狀態</li>
                </ul>
                <ul class="eventsInfoList" v-for="(eventsInfo, index) in paginated" :key="index">
                    <li class="EventReviseItemDrawer"> <EventReviseItemDrawer /> </li>
                    <li class="eventNo"> {{ eventsInfo.news_id }} </li>
                    <li class="classify"> {{ eventsInfo.news_category }} </li>
                    <li class="eventTitle"> {{ eventsInfo.news_title }} </li>
                    <li class="eventDate"> {{ eventsInfo.news_start_date }} ~ {{ eventsInfo.news_end_date }}</li>
                    <li class="eventState"> {{ eventsInfo.news_state }} </li>
                </ul>
            </div>
            


            <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />

        </section>
    </main>
</template>


<script>
import axios from 'axios'; //引用axios才可以把api內容取出來
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import EventNewItemDrawer from '@/components/Drawer/EventNewItemDrawer.vue';
import EventReviseItemDrawer from '@/components/Drawer/EventReviseItemDrawer.vue';


export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
        EventNewItemDrawer,
        EventReviseItemDrawer,

    },
    data() {
        return {
            // searchBar placeholder切換
            selectedOption: 'eventNo',
            searchText: '',

            // 頁數切換
            activeTab: "",
            currentPage: 1,
            perPage: 5,

            // 資料
            // eventsInfo: [
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            //     {
            //         eventNo : '202402001',
            //         classify : '活動',
            //         eventTitle : '玩具車攝影比賽',
            //         startDate : '2024/2/1',
            //         endDate : '2024/4/1',
            //         eventState : '公告中',
            //     },
            // ]

            // 資料
            newsData: [],
        };
    },
    created() { //在頁面載入時同時載入function
        //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
        axios.get(`${import.meta.env.VITE_CARA_URL}/back/newsInfo.php`)
                .then((response) => {
                    // 成功取得資料後，將資料存入 member 陣列
                    this.newsData = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
    },
    methods: {
        // searchBar placeholder切換
        search() {
            // 实现搜索功能的方法
        },

        // 頁數切換
        toggleStatus(index) {
            this.eventsInfo[index].status = !this.eventsInfo[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },
    },
    computed: {
        // searchBar placeholder切換
        placeholderText() {
            switch(this.selectedOption) {
                case 'eventTitle' :
                    return '請輸入消息標題'
                default :
                    return '請輸入消息編號'

            }
        },

        // 頁數切換
        paginated(){
            const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
            const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
            return this.newsData.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
        },
        totalPages() {
            return Math.ceil(this.newsData.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
        },
    },
};
</script>


<style lang="scss" scoped>
@import '@/assets/scss/page/backNews.scss'
</style>
