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
                        <Input type="file" v-model="imgFormData.proImgs" :rows="10" />
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
            <Button class="btnSubmit reviseItemSubmit" type="primary" @click="value = false">
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
        formData: Object // 這裡是表單數據，通過props接收父组件傳遞的數據
    },
    watch:{
        value(newValue){
            this.newValue;
        },
        drawerVisible(newValue) {
            this.$emit('input', newValue);// 監聽抽屉的顯示與隱藏狀態的變化，並通過 $emit 將新的狀態傳遞給父组件
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/Drawer/productDrawer.scss'
</style>