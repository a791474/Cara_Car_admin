<template>
    <main class="backMember">
        <BackSidebar />

        <section class="backMemberPart">
            <BackTitle />

            <div class="searchBar">
                <select v-model="selectedOption" id="selectedOption">
                    <option value="member_id">會員編號</option>
                    <option value="m_name">會員姓名</option>
                    <option value="m_email">電子信箱</option>
                </select>
                <input type="text" v-model="searchText" :placeholder="placeholderText">
                <button @click="search" class="searchBtn">搜尋</button>
            </div>

            <div class="memberList">
                <ul class="memListTitle">
                    <li>會員編號</li>
                    <li>會員姓名</li>
                    <li>連絡電話</li>
                    <li>電子信箱</li>
                    <li>會員生日</li>
                    <li>聯絡地址</li>
                    <li>封存狀態</li>
                </ul>
                <ul class="memInfoList" v-for="(memInfo, index) in paginated" :key="index">
                    <li> {{ memInfo.member_id }} </li>
                    <li> {{ memInfo.m_name }} </li>
                    <li> {{ memInfo.m_phone }} </li>
                    <li> {{ memInfo.m_email }} </li>
                    <li> {{ memInfo.m_birthday }} </li>
                    <li> {{ memInfo.m_city + memInfo.m_district + memInfo.m_address }} </li>
                    <li class="switch">
                        <Space direction="vertical">
                            <Space>
                                <!-- 這裡要問老師，我們設定的值是0或1，開關之後會變成true或false，預設值v-if沒有用 -->
                                {{ memInfo.m_state }} 
                                <Switch v-model="memInfo.m_state" size="large" class="switchButton">
                                    <template v-if="memInfo.m_state === true" #open>
                                        <span>封存</span>
                                    </template>
                                    <template v-else #close>
                                        <span>正常</span>
                                    </template>
                                </Switch>
                            </Space>
                        </Space>
                    </li>
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
            // searchBar placeholder切換
            selectedOption: 'member_id',
            searchText: '',

            // 頁數切換
            // activeTab: "",
            currentPage: 1,
            perPage: 10,

            // 資料
            // memberInfo: [
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },

            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            //     {
            //         memId : '20000221',
            //         memName : '李小生',
            //         memPhone : '0934788493',
            //         memEmail : 'cara_car@gmail.com',
            //         memBirthday : '1988/07/24',
            //         memAddress : '桃園市中壢區復興路46號8樓',
            //     },
            // ]
            //從後端member表單接資料
            member: [],
        };
    },
    created() { //在頁面載入時同時載入function
        //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
        axios.get(`${import.meta.env.VITE_CARA_URL}/memberCenterLogin.php`)
                .then((response) => {
                    // 成功取得資料後，將資料存入 member 陣列
                    this.member = response.data;
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
            switch (this.selectedOption) {
                case 'm_name':
                    return '請輸入會員姓名'
                case 'm_email':
                    return '請輸入電子信箱'
                default:
                    return '請輸入會員編號'

            }
        },

        // 頁數切換
        paginated() {
            const start = (this.currentPage - 1) * this.perPage; //將當前頁數-1再乘以頁面顯示內容筆數得到start值
            const end = start + this.perPage; //計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
            return this.member.slice(start, end); //用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
        },
        totalPages() {
            return Math.ceil(this.member.length / this.perPage); //用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
        },
    },

};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/backMember.scss'
</style>
