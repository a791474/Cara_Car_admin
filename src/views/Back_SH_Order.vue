<script>
import axios from 'axios';
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
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
            searchText: '',

             //頁面切換
            activeTab: "",
            currentPage: 1,
            perPage: 8,
                }
    },
    computed:{
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
        axios.get(`${import.meta.env.VITE_CARA_URL}/back/backShOrder.php`)
                .then((response) => {
                    this.orderList = response.data;
                    console.log(response);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
                
    },
    methods: {
        toggleStatus(index) {
            this.item[index].status = !this.item[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
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
                        <!-- <li>數量</li> -->
                        <li>時間</li>
                        <li>出貨狀態</li>
                    </ul>
                </div>
                
                <div class="orderContent" v-for="(item,index) in orderList" :key="index">
                    <div class="searchButton">
                        <button @click="value = true" type="primary" class="searchBtn">查詢</button>
                    </div>
                    <!-- item.資料庫欄位名稱 -->
                    <p class="orderContentP">{{item.sh_ord_id}}</p>
                    <p class="orderContentP">{{item.member_id}}</p>
                    <p class="orderContentP">{{item.sh_pro_name}}</p>
                    <!-- <p class="orderContentP">{{item.quantity}}</p> -->
                    <p class="orderContentP">{{item.sh_ord_date}}</p>
                
                    <div class="switch">
                        <!-- <Space direction="vertical">
                            <Space>
                                <Switch v-model="item.ord_del_state" size="large">
                                    {{ item.ord_del_state }}<template v-if="item.ord_del_state === true" #open>
                                    <span>已出</span>
                                    </template>
                                    <template v-else #close>
                                    <span>未出</span>
                                    </template>
                                     {{ item.ord_del_state ? '已出' : '未出' }} 
                                </Switch>
                            </Space>
                        </Space> -->
                        <Space>
                        <Switch size="large" v-model="item.ord_del_state" :true-value="1" :false-value="0"
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

    <Drawer
        title="訂單內容"
        v-model="value"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
            <Col span="24" >
                <FormItem label="訂單編號" label-position="Left">
                    <Input v-model="formData.name" placeholder="please enter order number" />
                </FormItem>
            </Col>
        </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="商品名稱" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter product name" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="數量" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter quantity" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="購買人" label-position="top">
                        <Input v-model="formData.name" placeholder="please purchaser name" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="下單時間" label-position="top">
                        <Input v-model="formData.name" placeholder="please purchaser name" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="收件人" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter recipient name" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="收件人電話" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter recipient phone number" />
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="收件地址" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter recipient address" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="付款方式" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter payment method" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="付款狀態" label-position="top">
                        <Select v-model="formData.type" placeholder="please choose payment status">
                            <Option value="YES">已付款</Option>
                            <Option value="NO">未付款</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="商品金額" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter product price" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="運費" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter freight" />
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="24">
                    <FormItem label="訂單總金額" label-position="top">
                        <Input v-model="formData.name" placeholder="please enter order amount" />
                    </FormItem>
                </Col>
                
            </Row>
            <FormItem label="備註欄" label-position="top">
                <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="please enter the remark" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false" >關閉</Button>
        </div>
    </Drawer>

    </div>
    
</template>

<style lang="scss" scoped>
@import "/src/assets/scss/page/_backShOrder.scss";
@import '@/assets/scss/components/switchBtn.scss';
</style>