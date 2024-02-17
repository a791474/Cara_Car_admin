<template>
    <div class="newPromoDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i>
            新增方案
        </Button>

    <Drawer
        title="新增促銷"
        v-model="value"
        width="720"
        :mask-closable="false"
        :styles="styles"
    >
    <Form :model="formData">
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="優惠名稱" label-position="top">
                        <Input v-model="promoData.promo_name" placeholder="請輸入優惠名稱" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣類別" label-position="top">
                        <Select v-model="promoData.pro_category" placeholder="請選擇優惠類別">
                            <Option value="">電動車</Option>
                            <Option value="">模型車</Option>
                            <Option value="">配件</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="折扣率" label-position="top">
                        <Input v-model="promoData.promo_ratio" placeholder="請輸入0~100之間" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣類別" label-position="top">
                        <Select v-model="promoData.pro_category" placeholder="請選擇優惠類別">
                            <Option value="">電動車</Option>
                            <Option value="">模型車</Option>
                            <Option value="">配件</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="折扣開始時間" label-position="top">
                        <Input type="date" v-model="promoData.promo_start_date" placeholder="請輸入開始時間"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="折扣結束時間" label-position="top">
                        <Input type="date" v-model="promoData.promo_end_date" placeholder="請輸入結束時間"></Input>
                    </FormItem>
                </Col>
            </Row>

            <FormItem label="" label-position="top">
                <ul style="display: flex; justify-content:space-around;">
                    <li>已選取商品</li>
                    <li>定價</li>
                </ul>
                <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="001 商品名稱 10000" />
            </FormItem>
        </Form>
        <div class="demo-drawer-footer">
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false" >取消新增</Button>
            <Button class="btnSubmit" type="primary" @click="value = false">
                <i class="fa-solid fa-plus"></i>
                新增方案
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
                name: '',
                url: '',
                owner: '',
                type: '',
                approver: '',
                date: '',
                desc: ''
            },
            promoData:[],
        }
    },
    created() {
        axios.get(`${import.meta.env.VITE_CARA_URL}/back/backPromotion.php`)
                .then((response) => {
                    this.promoData = response.data;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/Drawer/newPromoDrawer.scss';
</style>