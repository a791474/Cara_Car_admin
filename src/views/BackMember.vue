<template>
    <main class="backMember">
        <BackSidebar />

        <section class="backMemberPart">
            <BackTitle />

            <div class="searchBar">
                <select v-model="selectedOption" id="selectedOption">
                    <option value="memNo">會員編號</option>
                    <option value="memName">會員姓名</option>
                    <option value="memEmail">電子信箱</option>
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
                    <li> {{ memInfo.memId }} </li>
                    <li> {{ memInfo.memName }} </li>
                    <li> {{ memInfo.memPhone }} </li>
                    <li> {{ memInfo.memEmail }} </li>
                    <li> {{ memInfo.memBirthday }} </li>
                    <li> {{ memInfo.memAddress }} </li>
                    <li class="switch">
                        <Space direction="vertical">
                            <Space>
                                <Switch size="large" class="switchButton">
                                    <template #open>
                                    <span>封存</span>
                                    </template>
                                    <template #close>
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
            selectedOption: 'memNo',
            searchText: '',

            // 頁數切換
            activeTab: "",
            currentPage: 1,
            perPage: 8,

            // 資料
            memberInfo: [
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
                {
                    memId : '20000221',
                    memName : '李小生',
                    memPhone : '0934788493',
                    memEmail : 'cara_car@gmail.com',
                    memBirthday : '1988/07/24',
                    memAddress : '桃園市中壢區復興路46號8樓',
                },
            ]
        };
    },
    methods: {
        // searchBar placeholder切換
        search() {
            // 实现搜索功能的方法
        },

        // 頁數切換
        toggleStatus(index) {
            this.memberInfo[index].status = !this.memberInfo[index].status;
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
                case 'memName' :
                    return '請輸入會員姓名'
                case 'memEmail' :
                    return '請輸入電子信箱'
                default :
                    return '請輸入會員編號'

            }
        },

        // 頁數切換
        paginated(){
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.memberInfo.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.memberInfo.length / this.perPage);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/backMember.scss'
</style>
