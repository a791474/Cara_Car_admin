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
                <input v-model.trim="search" :placeholder="placeholderText">
                <!-- <button @click="search" class="searchBtn">搜尋</button> -->
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
                                {{ memInfo.m_state }}
                                <Switch size="large" class="switchButton" v-model="memInfo.m_state" :true-value="1"
                                    :false-value="0" @on-change="changeState(memInfo)" :before-change="handleBeforeChange">
                                    <template #open>
                                        <span>正常</span>
                                    </template>
                                    <template #close>
                                        <span>封存</span>
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
            search: '',

            // 頁數切換
            activeTab: "",
            currentPage: 1,
            perPage: 5,


            //從後端member表單接資料
            memData: [],
            displayData: [],

            // 會員帳號狀態
            memberState: null,


        };
    },
    created() { //在頁面載入時同時載入function
        this.memberData()
        this.fetchMemberState()
    },
    watch: {
        search(newVal, oldVal) {
            // console.log(this.search);
            // console.log('new:'+newVal);
            // console.log('old:'+oldVal);

            // 可以調用下面的methods
            this.filterHandle()
        }
    },
    methods: {
        // 帳號狀態切換確認
        handleBeforeChange() {
            return new Promise((resolve) => {
                this.$Modal.confirm({
                    title: '更改狀態確認',
                    content: '確定要更改狀態嗎?',
                    onOk: () => {
                        resolve();
                    }
                });
            });
        },

        // search功能
        filterHandle() {
            this.displayData = this.memData.filter((memInfo) => {
                if (memInfo.m_email !== null && memInfo.m_email !== undefined) {
                    switch (this.selectedOption) {
                        case 'member_id':
                            return memInfo.member_id.toString().includes(this.search);
                        case 'm_name':
                            return memInfo.m_name.includes(this.search);
                        case 'm_email':
                            return memInfo.m_email.includes(this.search);
                        default:
                            return false;
                    }
                } else {
                    return false;
                }
            })
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },
        memberData() {
            //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
            axios.get(`${import.meta.env.VITE_PHP_URL}/back/backMember.php`)
                .then((response) => {
                    // 成功取得資料後，將資料存入 member 陣列
                    this.memData = response.data.map(item => {
                        return {
                            ...item,
                            m_state: parseInt(item.m_state)
                        }
                    });
                    this.displayData = this.memData;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        async fetchMemberState() {
            try {
                // 發送請求獲取m_state
                const response = await fetch(`${import.meta.env.VITE_CARA_URL}/back/backMemberState.php`);
                const data = await response.json();
                this.memberState = data.m_state;
            } catch (error) {
                console.error('Failed to fetch member state:', error);
            }
        },
        changeState(memInfo) {
            const newState = memInfo.m_state == true ? 1 : 0;
            const currentId = memInfo.member_id;
            // console.log(newState);

            const editItem = new FormData();
            editItem.append("tableName", "member")
            editItem.append("m_state", newState)
            editItem.append("member_id", currentId)
            // console.log(editItem);
            try {
                axios.post(`${import.meta.env.VITE_PHP_URL}/back/backMemberState.php`, editItem, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                // console.log('Updated member state:', newState);
            } catch (error) {
                console.error('Failed to update member state:', error);
            }
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
            const end = start + this.perPage;//計算此頁面中的內容是否達到perPage中的數字最後索引值來得到end值
            return this.displayData.slice(start, end);//用JS的.slice()方法獲取vue data中的member陣列內容顯示內容
        },
        totalPages() {
            return Math.ceil(this.displayData.length / this.perPage);//用Math.ceil()無條件進位，值則是用member陣列物件長度除以顯示內容筆數取得
        },
    },

};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/page/backMember.scss'
</style>
