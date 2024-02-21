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
    data() {
        return {
            selectOption: 'orderno',
            searchText: '',
            value: false,
            activeTab: "",
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
            orderList:[
            // {
            //     orderNo: "1111",
            //     memberNo: "20000221",
            //     total:"$1,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "2222",
            //     memberNo: "20000222",
            //     total:"$2,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "3333",
            //     memberNo: "20000223",
            //     total:"$4,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "4444",
            //     memberNo: "20000223",
            //     total:"$1,800",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "5555",
            //     memberNo: "20000223",
            //     total:"$3,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "6666",
            //     memberNo: "20000223",
            //     total:"$2,800",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "7777",
            //     memberNo: "20000223",
            //     total:"$1,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "8888",
            //     memberNo: "20000223",
            //     total:"$5,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
            // {
            //     orderNo: "9999",
            //     memberNo: "20000223",
            //     total:"$1,500",
            //     time: "2023-12-31",
            //     checked: true
            // },
        ],
            currentPage: 1,
            perPage: 8,
        };
    },
    created() {
        axios.get(`${import.meta.env.VITE_CARA_URL}/back/backOrder.php`)
        .then((response)=>{
            this.orderList = response.data;
            console.log(this.orderList);
        })
        .catch((error)=>{
            console.error("Error fetching data:", error);
        });
    },
    computed:{
        placeholderText(){
            switch (this.selectOption){
                case 'orderno':
                    return '請輸入訂單編號'
                case 'memberno':
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
    methods: {
        // toggleStatus(index) {
        //     this.item[index].status = !this.item[index].status;
        // },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },
    },
    mounted() {
        
    },
}
</script>

<template>
    <div class="order">
        <div class="orderSidebar">
            <BackSidebar/>
            <div class="orderContent">
                <BackTitle />
                <div class="searchBar">
                    <select name="searchOption" id="searchOption" v-model="selectOption" >
                        <option value="orderno">訂單編號</option>
                        <option value="memberno">會員編號</option>
                    </select>
                    <input type="text" v-model="searchText" :placeholder="placeholderText">
                    <button class="searchBtn">搜尋</button>
                </div>
                <div class="orderTable">
                    <div class="listTitle">
                        <ul>
                            <li></li>
                            <li>訂單編號</li>
                            <li>會員編號</li>
                            <li>總金額</li>
                            <li>下單時間</li>
                            <li>出貨狀態</li>
                        </ul>
                    </div>
                    <div class="orderListContent" v-for="(item,index) in paginated" :key="index">
                        <div class="searchButton">
                            <button @click="value = true" type="primary" class="searchBtn">查詢</button>
                        </div>
                        <p class="orderListContentP">{{item.ord_id}}</p>
                        <p class="orderListContentP">{{item.member_id}}</p>
                        <p class="orderListContentP">{{item.ord_total}}</p>
                        <p class="orderListContentP">{{item.ord_date}}</p>
                    
                        <div class="switch">
                            <Space direction="vertical">
                                <Space>
                                    <Switch size="large" v-model="item.ord_del_state" :true-value="1" :false-value="0" @on-change="changeState(item)" class="switchButton" >
                                        <template #open>
                                            <!-- v-if="item.ord_del_state" -->
                                            <span >已出</span>
                                        </template>
                                        <template #close>
                                            <span >未出</span>
                                        </template>
                                    </Switch>
                                </Space>
                            </Space>
                        </div>
                    </div>
                </div>
                
                <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage"/>
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
                <FormItem label="訂單編號" label-position="top">
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
        <Button class="btnCancel"  @click="value = false" >關閉</Button>
    </div>
</Drawer>

</div>

</template>

<style lang="scss" scoped>
@import "/src/assets/scss/page/_backOrder.scss";
@import '@/assets/scss/components/switchBtn.scss';
</style>