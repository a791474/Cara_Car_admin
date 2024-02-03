<script>
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
            orderList: [
                {
                    orderNo: "1111",
                    memberNo: "20000221",
                    productName: "超強小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "2222",
                    memberNo: "20000222",
                    productName: "急速小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "3333",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "4444",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "5555",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "6666",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "7777",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "8888",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
                {
                    orderNo: "9999",
                    memberNo: "20000223",
                    productName: "復古小汽車車",
                    quantity: "1",
                    time: "2023-12-31",
                    checked: true
                },
            ]
        }
    },
    methods: {
        toggleStatus(index) {
            this.admins[index].status = !this.admins[index].status;
        },
        currentSidebar(item) {
            this.activeTab = item
        }
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
                <select name="searchOption" id="searchOption">
                    <option value="orderno">訂單編號</option>
                    <option value="memberno">會員編號</option>
                    <option value="product">商品名稱</option>
                </select>
                <input type="text" placeholder="請輸入訂單編號">
                <button class="searchBtn">搜尋</button>
            </div>
            <div class="listTitle">
                <ul>
                    <li> </li>
                    <li class="order">訂單編號</li>
                    <li>會員編號</li>
                    <li>商品名稱</li>
                    <li>數量</li>
                    <li>時間</li>
                    <li>出貨狀態</li>
                </ul>
            </div>
            <div class="orderContent" v-for="(item,index) in orderList" key="index">
                <button @click="value = true" type="primary" class="searchBtn">查詢</button>
                <p>{{item.orderNo}}</p>
                <p>{{item.memberNo}}</p>
                <p>{{item.productName}}</p>
                <p>{{item.quantity}}</p>
                <p>{{item.time}}</p>
                
                <div class="switch">
                    <Space direction="vertical">
                        <Space>
                            <Switch size="large">
                                <template #open>
                                <span>已出</span>
                                </template>
                                <template #close>
                                <span>未出</span>
                                </template>
                            </Switch>
                        </Space>
                    </Space>
                </div>
                
            </div>
            <div class="paginator">
                <PageNumber />
            </div>
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
            <FormItem label="備註" label-position="top">
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