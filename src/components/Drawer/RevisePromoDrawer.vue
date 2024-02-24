<template>
    <div class="revisePromoDrawer">
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

    <Drawer
        title="修改促銷"
        v-model="value"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
    <h2>方案編號：{{ detail.promo_id }}</h2>
        <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="優惠名稱" label-position="top">
                        <Input v-model="formData.promo_name" placeholder="優惠名稱" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣類別" label-position="top">
                        <Select v-model="formData.pro_category" placeholder="請選擇優惠類別">
                            <Option value="電動車">電動車</Option>
                            <Option value="模型車">模型車</Option>
                            <Option value="配件">配件</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="折扣率" label-position="top">
                        <Input v-model="formData.promo_ratio" placeholder="請輸入0~100之間" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="上架 / 下架" label-position="top" class="onOrRemoved">
                        <input type="radio" name="state" :value="0" v-model="formData.promo_state">下架
                        <input type="radio" name="state" :value="1" v-model="formData.promo_state">上架
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="折扣開始時間" label-position="top">
                        <Input type="date" v-model="formData.promo_start_date" placeholder="請輸入開始時間"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣結束時間" label-position="top">
                        <Input type="date" v-model="formData.promo_end_date" placeholder="請輸入結束時間"></Input>
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="" label-position="top">
                <ul style="display: flex; justify-content:space-around;">
                    <li>已選取商品</li>
                    <li>定價</li>
                </ul>
                <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="001 商品名稱 10000" readonly/>
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false">取消修改</Button>
            <Button class="btnSubmit" type="primary" @click="revisePromo">
                <i class="fa-solid fa-screwdriver-wrench"></i>
            確認修改
            </Button>
        </div>
    </Drawer>

    </div>
</template>    

<script>
import axios from 'axios';
export default {
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
                promo_id: '',
                promo_name: '',
                promo_ratio: '',
                pro_category: '',
                promo_state: '',
                promo_start_date: '',
                promo_end_date: '',
                desc:'',
            },
        }
    },
    props: {
        detail: {
            type: Object,
        }
    },
    created(){
        
    },
    watch: {
        value(nVal) {
            if(nVal) {
                this.formData.promo_id = this.detail.promo_id
                this.formData.promo_name = this.detail.promo_name
                this.formData.promo_ratio = this.detail.promo_ratio
                this.formData.pro_category = this.detail.pro_category
                this.formData.promo_state = this.detail.promo_state
                this.formData.promo_start_date = this.detail.promo_start_date
                this.formData.promo_end_date = this.detail.promo_end_date
            }
        },
    },
    methods:{
        revisePromo(){
            this.handleBeforeChange()
            .then(() => {
                axios.post(`${import.meta.env.VITE_LPHP_URL}/back/updatePromoDetail.php`, this.formData)
                .then(res=>{
                    console.log(res.data);
                    location.reload()
                })
                .catch(error => {
                    console.error(error);
                });
            })
        },
        handleBeforeChange() {
            return new Promise((resolve, reject) => {
                this.$Modal.confirm({
                    title: '更改促銷內容確認',
                    content: '確定要更新促銷內容嗎?',
                    onOk: () => {
                        resolve();
                        // this.$Modal.success({
                        //     title: '成功',
                        //     content: '已成功更新促銷內容！',
                        //     onOk:() =>{
                        //     }
                        // });
                    },
                    onCancel: () => {
                        reject();
                    }
                });
            });
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/Drawer/revisePromoDrawer.scss'
</style>