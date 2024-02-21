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
                            <!-- <Option :value="9">九成新</Option>
                            <Option :value="8">八成新</Option>
                            <Option value="9">七成新</Option>
                            <Option value="9">六成新</Option> -->
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
                            placeholder="please enter the description" />
                    </FormItem>

                    <FormItem label="商品規格" label-position="top">
                        <Input type="textarea" v-model="formData.descMore" :rows="4"
                            placeholder="please enter the description" />
                    </FormItem>
                </div>
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
                <Button class="btnSubmit" type="primary" 
                @click="submitData">
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
    props: {
        detail: {
            type: Object,
        }
    },
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
                url: '',
                check: '',
                price: '',
                situation: '',
                type: '',
                approver: '',
                date: '',
                desc: '',
                descMore: '',
            },
            // submitForm: null,
            File: null,
        }
    },
    methods: {
        closeDrawer() {
            this.value = false;
        },
        submitData() {
            // 数据提交逻辑，使用 Axios 发送数据到后端 API
            const newState = this.detail.sh_pro_state == true ? 1 : 0;
            const currentId = this.detail.sh_pro_id;
            const newName = this.detail.sh_pro_name;
            const newEName = this.detail.sh_pro_en_name;
            const newSold = this.detail.sh_pro_sold;
            const newDate = this.detail.launch_date;
            const newPin = this.detail.sh_pro_pin;
            console.log(this.detail);
            const editItem = new FormData();
            editItem.append("tableName", "sh_pro")
            // editItem.append("sh_pro_state", newState)
            editItem.append("sh_pro_state", newState.toString());
            editItem.append("sh_pro_name", newName)
            editItem.append("sh_pro_en_name", newEName)
            editItem.append("sh_pro_sold", newSold)
            editItem.append("launch_date", newDate)
            editItem.append("sh_pro_pin", newPin)
            editItem.append("sh_pro_id", currentId)
            axios.post(`${import.meta.env.VITE_CARA_URL}/back/backSHProductRe.php`, editItem, {
                headers: { "Content-Type": "multipart/form-data" },
                
            }).then(response => {
                alert('確定修改?')
                console.log(editItem);
                // this.closeDrawer()
            })
            .catch(error => {
                console.error('Error submitting data:', error);
            });
            // console.log(newState);
        },
    },
    watch: {
        value(nVal) {
            if (nVal) {
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
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/SHPReviseItemDrawer.scss'
</style>