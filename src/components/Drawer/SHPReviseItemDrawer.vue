<template>
    <div class="reviseItemDrawer">

        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

        <Drawer title="修改商品" v-model="value" width="500" :mask-closable="false" :styles="styles">
            <h3>商品編號：{{ detail.sh_pro_id }}</h3>
            <Form :model="formData">
                <!-- <p>商品內容區</p> -->
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
                        <input type="radio" name="state" :value="0" v-model="formData.sh_pro_state">下架中
                        <input type="radio" name="state" :value="1" v-model="formData.sh_pro_state">上架中
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
                    <Col span="12">
                    <FormItem label="未售出 / 已售出" label-position="top" class="onOrRemoved">
                        <input type="radio" name="sold" :value="0" v-model="formData.sh_pro_sold">未售出
                        <input type="radio" name="sold" :value="1" v-model="formData.sh_pro_sold">已售出
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="置頂商品" label-position="top" class="pin">
                        <input type="checkbox" name="pin" :true-value="1" :false-value="0" v-model="formData.sh_pro_pin">置頂
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="商品圖片" label-position="top">
                    <!-- <Button class="btnUpload" type="file" multiple="multiple" v-model="File" @click="value = false">點我上傳
                        </Button> -->
                    <!-- <Input class="btnUpload" type="text" v-model="File" @click="value = false">點我上傳</Input> -->
                    <Input class="btnUpload" type="file" multiple="multiple" @click="value = false">點我上傳</Input>
                    <!-- <Input class="btnUpload" type="file" multiple="multiple" v-model="File" :rows="4"
                            placeholder="please enter the description" /> -->
                    <!-- <div class="upload_pic">
                                    <input type="file" id="picture" name="uploadPic" placeholder="" style="display: none;">
                                    <label for="picture">
                                        <img src="../../assets/imgs/SecondHandSale/uploadPic.png" alt="upFile"
                                            style="cursor: pointer;">
                                    </label>
                                </div> -->
                </FormItem>
                <div class="productsin">
                    商品介紹區
                    <FormItem label="商品介紹(簡述)" label-position="top">
                        <Input type="textarea" v-model="formData.sh_pro_intro" :rows="4" placeholder="請輸入商品介紹" />
                    </FormItem>
                    <FormItem label="商品規格" label-position="top">
                        <Input type="textarea" v-model="formData.sh_pro_info" :rows="4" placeholder="請輸入商品介紹" />
                    </FormItem>
                </div>
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
                <Button class="btnSubmit" type="primary" @click="reviseData">
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
    data() {
        return {
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                position: 'static'
            },
            formData: {
                sh_pro_id: '',
                sh_pro_name: '',
                sh_pro_en_name: '',
                sh_pro_year: '',
                sh_pro_price: '',
                sh_pro_intro: '',
                sh_pro_info: '',
                sh_pro_situation: '',
                sh_pro_state: '',
                launch_date: '',
                sh_pro_sold: '',
                sh_pro_pin: ''
                //url: '', //DB要新增欄位
            },
        }
    },
    props: {
        detail: {
            type: Object,
            // required: true,
        }
    },
    watch: {
        // 抓資料庫的值，後面是.欄位名稱
        value(newVal) {
            if (newVal) {
                this.formData.sh_pro_id = this.detail.sh_pro_id
                this.formData.sh_pro_name = this.detail.sh_pro_name
                this.formData.sh_pro_en_name = this.detail.sh_pro_en_name
                this.formData.sh_pro_year = this.detail.sh_pro_year
                this.formData.sh_pro_price = this.detail.sh_pro_price
                this.formData.sh_pro_intro = this.detail.sh_pro_intro
                this.formData.sh_pro_info = this.detail.sh_pro_info
                this.formData.sh_pro_situation = this.detail.sh_pro_situation
                this.formData.sh_pro_state = this.detail.sh_pro_state
                this.formData.sh_pro_sold = this.detail.sh_pro_sold
                this.formData.launch_date = this.detail.launch_date
                this.formData.sh_pro_pin = this.detail.sh_pro_pin
            }
        },
    },
    methods: {
        closeDrawer() {
            this.value = false;
        },
        // 更新數據方法
        reviseData() {
            this.handleBeforeChange()

                .then(() => {
                    axios.post(`${import.meta.env.VITE_PHP_URL}/back/updateSHProduct.php`, this.formData)
                        .then(response => {
                            console.log(response.data);
                            location.reload()
                            // 處理響應

                            // 提示成功新增資料
                            alert('已成功修改資料!');

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
        // 確認是否要更新商品資料
        handleBeforeChange() {
            return new Promise((resolve, reject) => {
                this.$Modal.confirm({
                    title: '修改二手商品資訊確認',
                    content: '確定要二手商品資訊嗎?',
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
@import '@/assets/scss/components/SHPReviseItemDrawer.scss'
</style>