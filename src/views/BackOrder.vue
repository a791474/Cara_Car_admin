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
            selectOption: 'ord_id',
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
                number: '',
                productName: '',
                quantity: '',
                memberName: '',
                time: '',
                name: '',
                phone: '',
                address: '',
                pay: '',
                payment: '',
                price: '',
                freight: '',
                total: '',
                remark: '',
            },
            orderList:[],
            newOrderList:[],
            currentPage: 1,
            perPage: 7,
        };
    },
    created() {
        this.getOrderList();

        
    },
    watch:{
        searchText(){
            console.log(this.searchText);
            this.filterHandle()
        },

    },
    computed:{
        placeholderText(){
            switch (this.selectOption){
                case 'member_id':
                    return '請輸入會員編號'
                case 'ord_id':
                    return '請輸入訂單編號'
                default:
                    return '請輸入訂單編號'
                    
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
        changeState() {
            const newState = this.fromData.ord_del_state == true ? 1 : 0;
            // const currentId =this.fromData.ord_id;
            // console.log(newState);

            const editItem = new FormData();
            editItem.append("tableName", "ord_list")
            editItem.append("ord_del_state", newState)
            // editItem.append("ord_id", currentId)
            // console.log(editItem);
            try {
                // 發送請求更新admin_state 到後端
                axios.post(`${import.meta.env.VITE_PHP_URL}/back/backOrder.php`, editItem, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                // console.log('Updated ord state:', newState);
            } catch (error) {
                console.error('Failed to update ord state:', error);
            }
        },
        toggleStatus(index) {
            this.item[index].status = !this.item[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        },
        changePage(page) {
            this.currentPage = page;
        },
        //searchText
        filterHandle(){
            this.orderList = this.newOrderList.filter((item)=>{

                switch (this.selectOption){
                    case 'ord_id':
                        return item.ord_id.toString().includes(this.searchText);
                    case 'member_id':
                        return item.member_id.toString().includes(this.searchText);
                    default:
                        return false;
                }
            })
        },
        getOrderList(){
        axios.get(`${import.meta.env.VITE_PHP_URL}/back/backOrder.php`)
        .then((response)=>{
            const rawData = response.data;
            const orderMap = new Map();
        
        // 合併相同訂單號碼的項目並加總金額
        for (const item of rawData) {
            if (!orderMap.has(item.ord_id)) {
                orderMap.set(item.ord_id, {
                    ord_id: item.ord_id,
                    member_id: item.member_id,
                    ord_date: item.ord_date,
                    ord_reciever: item.ord_reciever,
                    ord_city: item.ord_city,
                    ord_district: item.ord_district,
                    ord_address: item.ord_address,
                    ord_phone: item.ord_phone,
                    remark: item.remark,
                    ord_ship: item.ord_ship,
                    ord_sum: 0,
                    ord_total: 0,
                    ord_del_state: item.ord_del_state,
                    products: []
                });
            }
            const order = orderMap.get(item.ord_id);
            order.ord_sum += item.ord_sum;
            order.ord_total += item.ord_total;
            order.products.push({
                pro_id: item.pro_id,
                pro_name: item.pro_name,
                ord_qty: item.ord_qty,
                pro_price: item.pro_price,
                promo_ratio: item.promo_ratio,
                pro_sale: item.pro_sale,
                m_name: item.m_name
            });
        }
        
            this.orderList = Array.from(orderMap.values());
            this.newOrderList = Array.from(orderMap.values());
            this.formData = this.orderList[0];
        })
        .catch((error)=>{
            console.error("Error fetching data:", error);
        });
    },
        getProductsByOrderId(orderId) {
            const products = [];
            // 找到相同訂單編號的訂單
            const order = this.newOrderList.find(item => item.ord_id === orderId);
            // 如果找到了訂單
            if (order) {
                // 迭代訂單中的商品
                for (const product of order.products) {
                    products.push({
                        productName: product.pro_name,
                        quantity: product.ord_qty
                    });
                }
            }
            return products;
        },
        showOrderDetails(item){
            this.formData = {
                number: item.ord_id,
                productName: item.pro_name,
                quantity: item.ord_qty,
                member_id: item.member_id,
                memberName: item.m_name,
                time: item.ord_date,
                name: item.ord_reciever,
                phone: item.ord_phone,
                address: item.ord_city + item.ord_district + item.ord_address,
                price: item.ord_sum,
                freight: item.ord_ship,
                total: item.ord_total,
                remark: item.remark,
                products: [],
            };
            // console.log(item);
            // console.log(this.formData);
            this.formData.products = [];
            
            for (const product of item.products) {
            // 創建新的商品對象，包含商品名稱和數量
            const newProduct = {
            productName: product.pro_name,
            quantity: product.ord_qty
            };
            // 將新的商品對象添加到 formData 的 products 屬性中
            this.formData.products.push(newProduct);
            }
            this.value = true;
        },
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
                        <option value="ord_id">訂單編號</option>
                        <option value="member_id">會員編號</option>
                    </select>
                    <input v-model.trim="searchText" :placeholder="placeholderText">
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
                            <button @click="showOrderDetails(item)" type="primary" class="searchBtn">查詢</button>
                        </div>
                        <p class="orderListContentP">{{item.ord_id}}</p>
                        <p class="memberId">{{item.member_id}}</p>
                        <p class="orderListContentP">{{item.ord_total}}</p>
                        <p class="orderListContentP">{{item.ord_date}}</p>
                    
                        <div class="switch">
                            <Space direction="vertical">
                                <Space>
                                    <Switch size="large" v-model="item.ord_del_state" :true-value="1" :false-value="0" @on-change="changeState" class="switchButton" >
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
                <!-- {{newOrderList[2]}} -->
                <!-- {{formData}} -->
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
                    <Input v-model="formData.number" placeholder="please enter order number" />
                </FormItem>
            </Col>
        </Row>
        <!-- <Row :gutter="32" v-for="item in formData" :key="item"> -->
            <!-- 商品&數量會有多個，v-for怎麼寫 -->
            <!-- {{formData}} -->
            <!-- {{orderList}} -->
            <!-- {{newOrderList}} -->
        <!-- <div v-for="(order, orderIndex) in newOrderList" :key="orderIndex"> -->
            <Row :gutter="32" v-for="(product, index) in formData.products" :key="index">
                <Col span="12" >
                    <FormItem label="商品名稱" label-position="top">
                        <Input v-model="product.productName" placeholder="please enter product name" />
                    </FormItem>
                </Col>
                <Col span="12" >
                    <FormItem label="數量" label-position="top">
                        <Input v-model="product.quantity" placeholder="please enter quantity" />
                    </FormItem>
                </Col>
            </Row>
        <!-- </div> -->
        <Row :gutter="32">
            <Col span="12" >
                <FormItem label="購買人" label-position="top">
                    <Input v-model="formData.memberName" placeholder="please purchaser name" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="下單時間" label-position="top">
                    <Input v-model="formData.time" placeholder="please purchaser name" />
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
                    <Input v-model="formData.phone" placeholder="please enter recipient phone number" />
                </FormItem>
            </Col>
            <Col span="24">
                <FormItem label="收件地址" label-position="top">
                    <Input v-model="formData.address" placeholder="please enter recipient address" />
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="32">
            <Col span="12">
                <FormItem label="付款方式" label-position="top">
                    <Input placeholder="信用卡付款"  />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="付款狀態" label-position="top">
                    <Input value="已付款" placeholder="已付款" />
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="32">
            <Col span="12">
                <FormItem label="商品金額" label-position="top">
                    <Input v-model="formData.price" placeholder="please enter product price" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="運費" label-position="top">
                    <Input v-model="formData.freight" placeholder="please enter freight" />
                </FormItem>
            </Col>
        </Row>
        <Row :gutter="32">
            <Col span="24">
                <FormItem label="訂單總金額" label-position="top">
                    <Input v-model="formData.total" placeholder="please enter order amount" />
                </FormItem>
            </Col>
            
        </Row>
        <FormItem label="備註欄" label-position="top">
            <Input type="textarea" v-model="formData.remark" :rows="4" placeholder="please enter the remark" />
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