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
    <Row :gutter="32">
        <Col span="12">
            <FormItem label="是否下架" label-position="top">
                <RadioGroup v-model="formData.eventState">
                    <Radio :label="0">消息上架</Radio>
                    <Radio :label="1">消息下架</Radio>
                </RadioGroup>
            </FormItem>
        </Col>
    </Row>

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
        <!-- <Input type="text" 
        @change="handleFileUpload"
        v-model="formData.eventImg" 
        :rows="10" /> -->

        <Upload
            :before-upload="handleUpload"
            action=""
        >
            <Button icon="ios-camera"
                >選擇圖片上傳</Button
            >
        </Upload>
        <div v-if="newImgFile.length > 0">
            已選擇的圖片:
            <ul>
                <li v-for="image in newImgFile">
                    {{ image.title }}
                </li>
            </ul>
        </div>
    </FormItem>

    <div class="preview-image" v-if="formData.eventImg">
        <img :src="getNewsImgSrc(formData.eventImg)" alt="圖片預覽" width="50%">
    </div>

    <!-- 內文 -->
    <FormItem label="消息內容" label-position="top">
        <Input class="eventInformation" type="textarea" v-model="formData.eventInformation" :rows="10" placeholder="請輸入消息介紹資訊" />
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
                eventState: '',
                startDate: '',
                endDate: '',
                eventImg: '',
                eventInformation: '',
                // disLaunch: '',
                // launch: '',
                // date: '',
            },
            imgfiles: [],
			newImgFile: [],
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
                this.formData.eventState = this.detail.news_state;

            } 
        },
    },
    methods: {
        // 取得圖片的路徑函式
        getNewsImgSrc(imgName) {
            return new URL(`../../../../imgs/event/${imgName}`, import.meta.url).href
        },
        // 處理圖片上傳
        // handleFileUpload(event) {
        //     const file = event.target.files[0];
        //     const formData = new FormData();
        //     formData.append('file', file);
        // },

        // 處理圖片上傳
		handleUpload(file) {
            this.newImgFile = []
			// 新增圖片到 newImgFile 陣列中
			const reader = new FileReader();
			reader.readAsDataURL(file);
			this.newImgFile.push({
				title: file.name,
				image: file,
				newsId: this.formData.news_id,
			});
			return false;
		},
		//執行圖片上傳
		upload () {
			// 建立 FormData 物件，用於傳送表單資料
			const imgFormData = new FormData();
			// 將 newImgFile 中的每張圖片(每張圖片在以下的foreach叫做image)加入 FormData 中
			this.newImgFile.forEach(image => {
				imgFormData.append('image[]', image.image); // images[]  PHP 中接收圖片資料的陣列參數名稱
				imgFormData.append('news_id', image.newsId); // PHP 中接收圖片資料的陣列參數名稱
			});

			axios.post(`${import.meta.env.VITE_LPHP_URL}/back/addProductImgs.php`, imgFormData)
				.then(response => {
						// 成功處理回應
						console.log('圖片上傳成功', response.data);
						this.$Message.success('圖片上傳成功');
						this.newImgFile = [];
				})
				.catch(error => {
						// 處理錯誤
						console.error('圖片上傳失敗', error);
						this.$Message.error('圖片上傳失敗');
				});

		},


         // 更新數據方法
        reviseData() {
            this.handleBeforeChange()
            .then(() => {

                axios.post(`${import.meta.env.VITE_LPHP_URL}/back/addNewsImgs.php`, this.formData,{
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(response => {
                    // 處理響應
                    console.log(response.data);

                    // 關閉抽屜
                    this.value = false;
                    
                    // 將資料傳給父層更新
                    this.$emit('getNewsData');
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