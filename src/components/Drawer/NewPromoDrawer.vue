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
                <!-- {{ formData }} -->
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="優惠名稱" label-position="top">
                        <Input v-model="formData.promo_name" placeholder="請輸入優惠名稱" />
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

                <!-- <FormItem label="" label-position="top">
                    <ul style="display: flex; justify-content:space-around;">
                        <li>已選取商品</li>
                        <li>定價</li>
                    </ul>
                    <Input type="textarea" v-model="formData.desc" :rows="4" placeholder="001 商品名稱 10000" />
                </FormItem> -->
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false">取消新增</Button>
                <Button class="btnSubmit" type="primary" @click="submitForm">
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
    data() {
        return {
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                promo_name: '',
                promo_ratio: '',
                pro_category: '',
                promo_state: '',
                promo_start_date: '',
                promo_end_date: '',
                // desc:'',
            },
        }
    },
    props: {
        // detail: {
        //     type: Object,
        // }
    },
    created() {

    },
    watch: {
        
    },
    methods: {
        async submitForm() {
        // submitForm() {
            // 檢查欄位是否存在空值
            let hasNonEmptyField = false;
            for (const key in this.formData) {
                if (this.formData[key]) {
                    hasNonEmptyField = true;
                    break;
                }
            }

            // 若沒有欄位為空值，則提交表單
            if (hasNonEmptyField) {
                this.handleBeforeSubmit()
                    // .then(() => {
                        try {
                            const response = await axios.post(`${import.meta.env.VITE_PHP_URL}/back/postNewPromo.php`, this.formData);
                            // const response = axios.post(`${import.meta.env.VITE_CARA_URL}/back/postNewPromo.php`, this.formData,{
                            //     headers: { "Content-Type": "multipart/form-data" },
                            // });
                            console.log(response.data);

                            
                        } catch (error) {
                            console.error(error);
                        }
                    // })
            } else {
                // 若有欄位為空值，則顯示警告信息
                alert('所有欄位都必須填寫哦');
            }
        },
        handleBeforeSubmit() {
            return new Promise((resolve, reject) => {
                this.$Modal.success({
                    title: '成功',
                    content: '已成功更新促銷內容！',
                    onOk: () => {
                        location.reload()
                        resolve();
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
@import '@/assets/scss/components/Drawer/newPromoDrawer.scss';
</style>