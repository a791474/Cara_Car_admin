<script>

export default {
    props: {
        detail: {
            type: Object
        }
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
                quantity: '',
                purchaser: '',
                date: '',
                recipient: '',
                phone:'',
                address:'',
                delStatus:'',
                price :'',
                freight:'',
                amount:'',
                remark:'',
                approver: '',
                desc: ''
            },
        }
    },
    watch: {
        value(nVal) {
            if(nVal) {
                this.formData.id = this.detail.sh_ord_id
                this.formData.name = this.detail.sh_pro_name
                this.formData.purchaser = this.detail.m_name
                this.formData.date = this.detail.sh_ord_date
                this.formData.recipient = this.detail.sh_ord_reciever
                this.formData.phone = this.detail.sh_ord_phone
                this.formData.address = this.detail.sh_ord_address
                this.formData.delStatus = this.detail.ord_del_state 
                this.formData.price = this.detail.sh_ord_sum
                this.formData.freight = this.detail.sh_ord_ship
                this.formData.amount = this.detail.sh_ord_total
                this.formData.remark = this.detail.remark
            }
        },
    },
    methods:{
        
    }
}
</script>

<template>
    <div class="searchDrawer">
        <button @click="value = true" type="primary" class="searchBtn">查詢</button>

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
                        <Input v-model="formData.id" placeholder="please enter order number" />
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
                            <Input placeholder="1" disabled />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="購買人" label-position="top">
                            <Input v-model="formData.purchaser" placeholder="please purchaser name" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="下單時間" label-position="top">
                            <Input v-model="formData.date" placeholder="please purchaser name" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="收件人" label-position="top">
                            <Input v-model="formData.recipient" placeholder="please enter recipient name" />
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
                            <Input placeholder="信用卡付款" readonly/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="出貨狀態" label-position="top">
                            <Select v-model="formData.delState" placeholder="please choose payment status">
                                <Option value="1">已出貨</Option>
                                <Option value="0">未出貨</Option>
                            </Select>
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
                            <Input v-model="formData.amount" placeholder="please enter order amount" />
                        </FormItem>
                    </Col>
                    
                </Row>
                <FormItem label="備註欄" label-position="top">
                    <Input type="textarea" v-model="formData.remark" :rows="4" placeholder="please enter the remark" />
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false" >關閉</Button>
            </div>
        </Drawer>

        </div>
</template>

<style lang="scss" scoped>
    .searchBtn{
        background-color: $yellow;
        border: none;
        padding: 3px 10px;
        border-radius: 20px;
        cursor: pointer;
        margin-right: 30px;
    }
</style>