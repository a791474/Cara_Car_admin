<template>
    <div class="reviseItemDrawer">

        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

        <Drawer title="修改商品" v-model="value" width="500" :mask-closable="false" :styles="styles">
            <Form :model="formData">
                <p>商品內容區</p>
                <Row :gutter="32">
                    <Col span="12">

                    <FormItem label="商品名稱-中文" label-position="top">
                        <Input v-model="formData.name" placeholder="請輸入商品名稱" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="商品名稱-英文" label-position="top">
                        <Input v-model="formData.ename" placeholder="請輸入商品名稱">
                        <!-- <template #prepend>http://</template>
                            <template #append>.com</template> -->
                        </Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">

                    <FormItem label="商品年分" label-position="top">
                        <Input v-model="formData.year" placeholder="請輸入商品年分" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="商品現況" label-position="top">
                        <Select v-model="formData.situation" placeholder="選擇商品現況">
                            <Option :value="9">九成新</Option>
                            <Option :value="8">八成新</Option>
                            <Option value="7">七成新</Option>
                            <Option value="6">六成新</Option>
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
                        <Input v-model="formData.price" placeholder="請輸入商品定價" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="上架 / 下架" label-position="top" class="onOrRemoved">
                        <input type="radio" name="ability[]" :value="0" v-model="formData.check">下架
                        <input type="radio" name="ability[]" :value="1" v-model="formData.check">上架
                        <!-- <template #prepend>http://</template>
                            <template #append>.com</template> -->
                        <!-- </Input> -->
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                    <FormItem label="上架時間" label-position="top">
                        <DatePicker v-model="formData.date" type="date" placeholder="請選擇上架時間" style="display: block"
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
                    <!-- <Button class="btnUpload" type="file" multiple="multiple" v-model="File" @click="value = false">點我上傳
                    </Button> -->
                    <!-- <Input class="btnUpload" type="text" v-model="File" @click="value = false">點我上傳</Input> -->

                    <Input class="btnUpload" type="file" multiple="multiple" v-model="File" @click="value = false">點我上傳</Input>

                    <!-- <Input class="btnUpload" type="file" multiple="multiple" v-model="File" :rows="4"
                        placeholder="please enter the description" /> -->
                </FormItem>
                <div class="productsin">
                    商品介紹區
                    <FormItem label="商品介紹(簡述)" label-position="top">
                        <Input type="textarea" v-model="formData.desc" :rows="4"
                            placeholder="請輸入商品介紹" />
                    </FormItem>

                    <FormItem label="商品規格" label-position="top">
                        <Input type="textarea" v-model="formData.descMore" :rows="4"
                            placeholder="請輸入商品介紹" />
                    </FormItem>
                </div>
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
                <Button class="btnSubmit" type="primary" 
                @click="reviseData">
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
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                name: '',
                ename: '',
                year: '',
                situation: '',
                price: '',
                date: '',
                desc: '',
                descMore: '',
            },
            
        }
    },
    props: {
        detail: {
            type: Object,
            required: true,
        }
    },
    watch: {
        // 抓資料庫的值，後面是.欄位名稱
        value(newVal) {
            if (newVal) {
                this.formData.name = this.detail.sh_pro_name
                this.formData.ename = this.detail.sh_pro_en_name
                this.formData.year = this.detail.sh_pro_year
                this.formData.situation = this.detail.sh_pro_situation

                // this.formData.check = this.detail.sh_pro_state

                this.formData.price = this.detail.sh_pro_price
                this.formData.date = this.detail.launch_date
                this.formData.desc = this.detail.sh_pro_intro
                this.formData.descMore = this.detail.sh_pro_info
                // this.formData.type = this.detail.promo_start_date
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
                axios.post(`${import.meta.env.VITE_CARA_URL}/back/backSHProductRe.php`, this.formData)
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
        // 確認是否要更新商品資料
        handleBeforeChange() {
            return new Promise((resolve, reject) => {
                this.$Modal.confirm({
                    title: '更改消息確認',
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
@import '@/assets/scss/components/SHPReviseItemDrawer.scss'
</style>