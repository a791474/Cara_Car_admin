<script>
import axios from 'axios';
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import ShOrderDrawer from '@/components/Drawer/ShOrderDrawer.vue';
export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
        ShOrderDrawer
    },
    data () {
        return {
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                name: '',
                url: '',
                owner: '',
                type: '',
                approver: '',
                date: '',
                desc: ''
            },

            // placehoder切換
            selectedOption: 'memberNo',  //select預設值
            orderList: [],
            newOrderList:[],
            orderDetail:[],
            searchText: '',

             //頁面切換
            activeTab: "",
            currentPage: 1,
            perPage: 7,
                }
    },
    computed:{
        // placceholder切換
        placeholderText() {
            switch (this.selectedOption) {
                case 'productName':
                    return '請輸入商品名稱'
                case 'orderNo':
                    return '請輸入訂單編號'
                default:
                    return '請輸入會員編號'
            }
        },
        // 頁數切換
        paginated(){
            const start = (this.currentPage - 1) * this.perPage;
            const end = start + this.perPage;
            return this.orderList.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.orderList.length / this.perPage);
        },
    },
    created() { //在頁面載入時同時載入function
        //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
        // axios.get(`${import.meta.env.VITE_LPHP_URL}/back/backShOrder.php`)
        //     .then((response) => {
        //         this.orderList = response.data;
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data:", error);
        //     });
        this.getOrderList();
    },
    methods: {
        getOrderList() {
        axios.get(`${import.meta.env.VITE_LPHP_URL}/back/backShOrder.php`)
            .then((response) => {
            this.orderList = response.data;
            this.newOrderList = response.data;
            this.formData = response.data;
            })
            .catch((error) => {
                console.error("獲取數據時出錯:", error);
            });
        },

        // 頁數切換
        toggleStatus(index) {
            this.item[index].status = !this.item[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },
        //搜尋功能
        filterHandle() {
            this.displayData = this.newsData.filter((eventsInfo)=>{

                switch (this.selectedOption) {
                    case 'news_id':
                        return eventsInfo.news_id.toString().includes(this.search);
                    case 'news_title':
                        return eventsInfo.news_title.includes(this.search);
                    default:
                        return false;
                }
            })
        },
        changeState(item){
            return(item) => item === 1 ? "已出貨" : "未出貨";
        },
        showOrderDetails(item){
            this.formData = {
                number: item.sh_ord_id,
                productName: item.sh_pro_name,
                quantity: item.sh_ord_qty,
                memberName: item.m_name,
                time: item.sh_ord_date,
                name: item.sh_ord_reciever,
                phone: item.sh_ord_phone,
                address: item.sh_ord_city + item.sh_ord_district + item.sh_ord_address,
                price: item.sh_ord_sum,
                freight: item.sh_ord_ship,
                total: item.sh_ord_total,
                remark: item.remark,
            };
            this.value = true;
        },
    },
}
</script>

<template>
<div class="shOrder"> 
    <div class="comp">
        <BackSidebar />
        <div class="content">
            <BackTitle />
            <div class="searchBar">
                <select v-model="selectedOption" id="selectedOption" >
                    <option value="orderNo">訂單編號</option>
                    <option value="memberNo">會員編號</option>
                    <option value="productName">商品名稱</option>
                </select>
                <input type="text" v-model="searchText" :placeholder="placeholderText">
                <button @click="search" class="searchBtn">搜尋</button>
            </div>
            <div class="orderTable">
                <div class="listTitle">
                    <ul>
                        <li> </li>
                        <li class="order">訂單編號</li>
                        <li>會員編號</li>
                        <li>商品名稱</li>
                        <li>時間</li>
                        <li>出貨狀態</li>
                    </ul>
                </div>
                
                <div class="orderContent" >
                    <div class="searchButton">
                        <!-- <button @click="value = true" type="primary" class="searchBtn">查詢</button> -->
                        <ShOrderDrawer 
                        :detail="item" />
                    </div>
                    <!-- item.資料庫欄位名稱 -->
                    <div class="orderContent" v-for="(item,index) in paginated" :key="index">
                        <p class="orderContentP">{{item.sh_ord_id}}</p>
                        <p class="orderContentP">{{item.member_id}}</p>
                        <p class="orderContentP">{{item.sh_pro_name}}</p>
                        <p class="orderContentP">{{item.sh_ord_date}}</p>
                    </div>
                    
                
                    <div class="switch">
                        <Space>
                        <Switch size="large"  :true-value="1" :false-value="0"
                            @on-change="changeState(item)">
                            <template #open>
                                <span>已出貨</span>
                            </template>
                            <template #close>
                                <span>未出貨</span>
                            </template>
                        </Switch>
                    </Space>
                    </div>
                </div>
            </div>
            <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />

        </div>
    </div>
</div>
    <!-- side bar -->
    <div class="newItemDrawer">
        <ShOrderDrawer 
        :detail="orderList" />
    
    </div>
    
</template>

<style lang="scss" scoped>
@import "/src/assets/scss/page/_backShOrder.scss";
@import '@/assets/scss/components/switchBtn.scss';
</style>