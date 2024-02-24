<template>
    <div class="reviseItemDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>

    <Drawer
        title="修改消息"
        v-model="value"
        width="450"
        :mask-closable="false"
        :styles="styles"
    >
        <Form :model="formData">

    <!-- 消息標題 -->
    <Row :gutter="32">
        <Col span="24">
            <FormItem label="消息標題" label-position="top">
                <Input v-model="formData.eventTitle" placeholder="請輸入消息標題" />
            </FormItem>
        </Col>
    </Row>

    <!-- 消息分類 -->
    <Row :gutter="32">
        <Col span="24">
            <FormItem label="消息分類" label-position="top">
                <Select v-model="formData.classify" placeholder="請選擇消息分類">
                    <Option :value="2">優惠</Option>
                    <Option :value="1">活動</Option>
                </Select>
            </FormItem>
        </Col>
    </Row>
    
    <!-- 是否下架 -->
    <!-- <Row :gutter="32">
        <Col span="12">
            <FormItem label="是否下架" label-position="top">
                    <Checkbox v-model="formData.eventState" label="下架"></Checkbox>
            </FormItem>
        </Col>
    </Row> -->

    <!-- 上下架時間 -->
    <Row :gutter="32">
        <Col span="12">
            <FormItem label="上架時間" label-position="top">
                <DatePicker v-model="formData.startDate" type="date" placeholder="請設定上架時間" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="下架時間" label-position="top">
                <DatePicker v-model="formData.endDate" type="date" placeholder="請設定下架時間" style="display: block" placement="bottom-end"></DatePicker>
            </FormItem>
        </Col>
    </Row>

    <!-- 圖片檔 -->
    <FormItem label="消息圖片" label-position="top">
        <Input type="text" 
        @change="handleFileUpload" 
        v-model="formData.eventImg" 
        :rows="10" />
    </FormItem>

    <!-- 內文 -->
    <FormItem label="消息內容" label-position="top">
        <Input type="textarea" v-model="formData.eventInformation" :rows="10" placeholder="請輸入消息介紹資訊" />
    </FormItem>
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
    data () {
        return {
            value: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },

            // 設定上面v-model要綁的名稱, 這裡可以自己定義名稱
            formData: {
                newsId: '',
                eventTitle: '',
                classify: '',
                startDate: '',
                endDate: '',
                eventImg: '',
                eventInformation: '',
                // eventState: '',
                // disLaunch: '',
                // launch: '',
                // date: '',
            },
        }
    },
    props: {
        detail: {
            type: Object,
            required: true,
        }
    },
    created(){
        
    },
    watch: {
        // 讓v-model能抓的到資料庫裡對應的值
        value(newVal) {
            if(newVal){
                this.formData.newsId = this.detail.news_id;
                this.formData.eventTitle = this.detail.news_title;
                this.formData.classify = this.detail.news_category;
                this.formData.startDate = this.detail.news_start_date;
                this.formData.endDate = this.detail.news_end_date;
                this.formData.eventImg = this.detail.img_path;
                this.formData.eventInformation = this.detail.news_content;
                // this.formData.eventState = this.detail.news_state;
            } 
        },
    },
    methods: {
        // 處理圖片上傳
        handleFileUpload(event) {
            const file = event.target.files[0];
            // 從完整路徑中提取圖片名
            const fileName = file.name;
            // 將圖片名存儲到 formData 中
            this.formData.eventImg = fileName;
        },

         // 更新數據方法
        reviseData() {
            this.handleBeforeChange()
            
            .then(() => {
                axios.post(`${import.meta.env.VITE_LPHP_URL}/back/updateNewsInfo.php`, this.formData)
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
        // 確認是否要更新消息
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
@import '@/assets/scss/components/Drawer/eventReviseItemDrawer.scss'
</style>