<template>
    <div class="reviseItemDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

    <Drawer
        title="修改商品"
        v-model="value"
        width="450"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">
            <Row :gutter="32">
                <!-- 商品名稱 -->
                <Col span="24">
                    <FormItem label="商品名稱-中文" label-position="top">
                        <Input v-model="formData.pro_name" placeholder="請輸入商品中文名稱" />
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="商品名稱-英文" label-position="top">
                        <Input v-model="formData.pro_en_name" placeholder="請輸入商品英文名稱" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="定價" label-position="top">
                        <Input v-model="formData.pro_price" placeholder="請輸入價格" />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="商品類型" label-position="top">
                        <Select v-model="formData.pro_category" placeholder="請選擇商品分類">
                            <Option value="discount">電動車</Option>
                            <Option value="activity">配件</Option>
                            <Option value="activity">模型車</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="上架時間" label-position="top">
                        <DatePicker v-model="formData.launch_date" type="date" placeholder="請設定上架時間" style="display: block" placement="bottom-end"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="下架時間" label-position="top">
                        <DatePicker v-model="formData.end_date" type="date" placeholder="請設定下架時間" style="display: block" placement="bottom-end"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="12">
                    <FormItem label="是否下架" label-position="top">
                            <Checkbox v-model="formData.pro_state" label="下架"></Checkbox>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否置頂" label-position="top">
                            <Checkbox v-model="formData.pro_pin" label="置頂"></Checkbox>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="32">
                <Col span="24">
                    <FormItem label="圖片上傳" label-position="top">
                        <Input type="file" 
                        
                        :rows="10" />
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="商品簡介內容" label-position="top">
                        <Input type="textarea" v-model="formData.pro_intro" :rows="10" placeholder="請輸入商品簡介內容" />
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem label="商品規格內容" label-position="top">
                        <Input type="textarea" v-model="formData.pro_info" :rows="10" placeholder="請輸入商品規格內容" />
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <div class="product-drawer-footer" >
            <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
            <Button class="btnSubmit reviseItemSubmit" type="primary" @click="reviseData">
                <i class="fa-solid fa-screwdriver-wrench"></i>
            確認修改
            </Button>
        </div>
    </Drawer>

    </div>
</template>    

<script>
import { Row } from 'view-ui-plus';


export default {
    data() {
        return {
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '16px',
                position: 'static'
            },
            formData: {
                pro_name: '',
                pro_en_name: '',
                pro_category: '',
                pro_price: '',
                pro_intro: '',
                pro_info: '',
                launch_date: '',
                end_date: '',
                pro_state: '',
                pro_pin: '',
            },
            imgFormData: [],
        };
    },
    props:{
        detail:{
            type: Object,
            required: true,
        }
    },
    watch:{
        value(newValue){
            if(newValue){
                this.formData.pro_name = this.detail.pro_name;
                this.formData.pro_en_name = this.detail.pro_en_name;
                this.formData.pro_category = this.detail.pro_category;
                this.formData.pro_price = this.detail.pro_price;
                this.formData.pro_intro = this.detail.pro_intro;
                this.formData.pro_info = this.detail.pro_info;
                this.formData.launch_date = this.detail.launch_date;
                this.formData.end_date = this.detail.end_date;
                this.formData.pro_state = this.detail.pro_state;
                this.formData.pro_pin = this.detail.pro_pin;
            }
        },
        drawerVisible(newValue) {
            this.$emit('input', newValue);// 監聽抽屉的顯示與隱藏狀態的變化，並通過 $emit 將新的狀態傳遞給父组件
        }
    },
    methods:{
        // 轉換
        // 處理圖片上傳
        handleFileUpload(event) {

        },

         // 更新數據方法
        reviseData() {
            this.handleBeforeChange()
            
            .then(() => {
                axios.post(`${import.meta.env.VITE_LPHP_URL}/back/updateProductInfo.php`, this.formData)
                .then(response => {
                    console.log(response.data);
                    // 處理響應

                    // 提示成功新增資料
                    alert('已成功新增資料!');

                    // 關閉抽屜
                    this.value = false;
                })
                .catch(error => {
                    console.error(error);
                    // 處理錯誤
                });
            })
            .catch(() => {
                // 用户取消操作
            });
        },  
        // 確認是否要更新物件
        handleBeforeChange() {
            return new Promise((resolve, reject) => {
                this.$Modal.confirm({
                    title: '更改商品確認',
                    content: '確定要更新消息嗎?',
                    onOk: () => {
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
@import '@/assets/scss/components/Drawer/productDrawer.scss'
</style>