<template>
    <div class="newItemDrawer">
        
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i>
            新增消息
        </Button>

        <Drawer
            title="新增消息"
            v-model="value"
            width="450"
            :mask-closable="false"
            :styles="styles">
            
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
                                <Option value="2">優惠</Option>
                                <Option value="1">活動</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

            <!-- 是否下架 -->
            <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="是否下架" label-position="top">
                            <RadioGroup v-model="formData.eventState">
                                <Radio label="0">消息上架</Radio>
                                <Radio label="1">消息下架</Radio>
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

                <!-- 消息圖片 -->
                <FormItem label="消息圖片" label-position="top">
                    <!-- <Input type="file" 
                    id="newsImgUpFile" 
                    name="newsImgUpFile" @change="handleFileUpload" 
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

                <!-- 消息內容 -->
                <FormItem label="消息內容" label-position="top">
                    <Input class="eventInformation" type="textarea" v-model="formData.eventInformation" :rows="10" placeholder="請輸入消息介紹資訊" />
                </FormItem>
            </Form>

            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false" >Cancel</Button>
                <Button class="btnSubmit" type="primary" @click="submitForm">
                    <i class="fa-solid fa-plus"></i>
                    新增消息
                </Button>
            </div>
        </Drawer>

    </div>
</template>    

<script>

import axios from 'axios'

    export default {
        data () {
            return {
                value: false,
                styles: {
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: '53px',
                    marginButton: '10px',
                    position: 'static',
                },

                // 設定上面v-model要綁的名稱, 這裡可以自己定義名稱
                formData: {
                    eventTitle: '',
                    classify: '',
                    disLaunch: '',
                    startDate: '',
                    endDate: '',
                    eventImg: '',
                    eventInformation: '',
                },
                imgfiles: [],
			    newImgFile: [],
            }
        },
        methods: {
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

			axios.post(`${import.meta.env.VITE_LPHP_URL}/back/addNewsImgs.php`, FormData)
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
                        const response = await axios.post(`${import.meta.env.VITE_LPHP_URL}/back/postNewsArticle.php`, this.formData);
                        console.log(response.data); // 可以在控制台中查看後端傳回的信息

                        // 提示成功新增資料
                        this.$Modal.confirm({
                            title: '新增消息確認',
                            content: '確定要新增消息嗎?',
                            onOk: () => {
                                resolve();
                            },
                            onCancel: () => {
                                reject();
                            }
                        });
                        // this.$emit('getNewsData');
                        // 關閉抽屜
                        // this.value = false;
                                
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    // 若有欄位為空值，則顯示警告信息
                    alert('所有欄位都必須填寫哦');
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/Drawer/eventNewItemDrawer.scss'
</style>