<template>
    <div class="SHPNewItemDrawer">

        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i>
            新增
        </Button>

        <Drawer 
        title="新增商品" 
        v-model="value" 
        width="500" :mask-closable="false" 
        :styles="styles">
            <Form :model="formData">
                <p>商品內容區</p>
                <Row :gutter="32">
                    <Col span="12">

                    <FormItem label="商品名稱-中文" label-position="top">
                        <Input v-model="formData.sh_pro_name" placeholder="請輸入商品名稱" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="商品名稱-英文" label-position="top">
                        <Input v-model="formData.sh_pro_en_name" placeholder="請輸入商品名稱">
                        <!-- <template #prepend>http://</template>
                            <template #append>.com</template> -->
                        </Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">

                    <FormItem label="商品年分" label-position="top">
                        <Input v-model="formData.sh_pro_year" placeholder="請輸入商品年分" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="商品現況" label-position="top">
                        <Select v-model="formData.sh_pro_situation" placeholder="選擇商品現況">
                            <Option :value="5">五成新</Option>
                            <Option :value="4">四成新</Option>
                            <Option :value="3">三成新</Option>
                            <Option :value="2">二成新</Option>
                            <Option :value="1">一成新</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">

                    <FormItem label="商品定價" label-position="top">
                        <Input v-model="formData.sh_pro_price" placeholder="請輸入商品定價" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="上架 / 下架" label-position="top" class="onOrRemoved">
                        <input type="radio" name="ability[]" :value="0" v-model="formData.sh_pro_state">下架
                        <input type="radio" name="ability[]" :value="1" v-model="formData.sh_pro_state">上架
                        <!-- <template #prepend>http://</template>
                            <template #append>.com</template> -->
                        <!-- </Input> -->
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="上架時間" label-position="top">
                        <DatePicker v-model="formData.launch_date" type="date" placeholder="請選擇上架時間" style="display: block"
                            placement="bottom-end"></DatePicker>
                    </FormItem>
                    </Col>
                    <!-- <Col span="12">
                    <FormItem label="下架時間" label-position="top">
                        <DatePicker v-model="formData.date" type="date" placeholder="請選擇下架時間" style="display: block"
                            placement="bottom-end"></DatePicker>
                    </FormItem>
                    </Col> -->
                </Row>
                <FormItem label="商品圖片" label-position="top">
                    <Button class="btnUpload" type="file" multiple="multiple" v-model="File" @click="value = false">點我上傳
                    </Button>
                    <Input class="btnUpload" type="file" multiple="multiple" v-model="File" :rows="4"
                        placeholder="please enter the description" />
                </FormItem>
                <div class="productsin">
                    商品介紹區
                    <FormItem label="商品介紹(簡述)" label-position="top">
                        <Input type="textarea" v-model="formData.sh_pro_intro" :rows="4"
                            placeholder="please enter the description" />
                    </FormItem>

                    <FormItem label="商品規格" label-position="top">
                        <Input type="textarea" v-model="formData.sh_pro_info" :rows="4"
                            placeholder="please enter the description" />
                    </FormItem>
                </div>
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
                <Button class="btnSubmit" type="primary" @click="submitForm">
                    <i class="fa-solid fa-screwdriver-wrench"></i>
                    新增商品
                </Button>
            </div>
        </Drawer>

    </div>
</template>    

<script>
import axios from 'axios'


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
                sh_pro_name: '',
                sh_pro_en_name: '',
                sh_pro_year: '',
                url: '',
                sh_pro_state: '',
                sh_pro_price: '',
                sh_pro_situation: '',
                type: '',
                launch_date: '',
                sh_pro_intro: '',
                sh_pro_info:'',
                descMore: '',
                sh_pro_pin:''
            },
        }
    },
    methods: {
            async submitForm() {
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
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_CARA_URL}/back/postbackSHProduct.php`, this.formData);
                        console.log(response.data); // 可以在控制台中查看後端傳回的信息

                        // 提示成功新增資料
                        alert('已成功新增資料!');

                        // 關閉抽屜
                        this.value = false;
                                
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    // 若有欄位為空值，則顯示警告信息
                    alert('所有欄位都必須填寫哦');
                }
            },
            clearForm() {
                // 清空表單邏輯
                this.formData = {
                sh_pro_name: '',
                sh_pro_en_name: '',
                sh_pro_year: '',
                url: '',
                sh_pro_state: '',
                sh_pro_price: '',
                sh_pro_situation: '',
                type: '',
                launch_date: '',
                sh_pro_intro: '',
                sh_pro_info:'',
                descMore: '',
                sh_pro_pin:''
                };
            },
    },
};

</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/SHPNewItemDrawer.scss'
</style>