<template>
    <div class="newItemDrawer">
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i> 新增消息 </Button>
        <Drawer title="新增消息" v-model="value" width="450" :mask-closable="false" :styles="styles">
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
                        <DatePicker v-model="formData.startDate" type="date" placeholder="請設定上架時間" style="display: block"
                            placement="bottom-end"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="下架時間" label-position="top">
                        <DatePicker v-model="formData.endDate" type="date" placeholder="請設定下架時間" style="display: block"
                            placement="bottom-end"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
                <!-- 消息圖片 -->
                <FormItem label="消息圖片" label-position="top">
                    <!-- <Input type="file" id="newsImgUpFile" name="newsImgUpFile" @change="handleFileUpload"
                        v-model="formData.eventImg" :rows="10" /> -->
                    <input type="file" name="upFile" id="upFile" accept="image/*" @change="uploadImg">
                    <!-- <Button class="upLoad" @click="changeFile">選擇圖片</Button> -->
                </FormItem>
                <!-- 消息內容 -->
                <FormItem label="消息內容" label-position="top">
                    <Input type="textarea" v-model="formData.eventInformation" :rows="10" placeholder="請輸入消息介紹資訊" />
                </FormItem>
            </Form>
            <div class="demo-drawer-footer">
                <Button class="btnCancel" style="margin-right: 8px" @click="value = false">Cancel</Button>
                <Button class="btnSubmit" type="primary" @click="submitForm">
                    <i class="fa-solid fa-plus"></i> 新增消息 </Button>
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
                marginButton: '10px',
                position: 'static',
            },

            // 設定上面v-model要綁的名稱, 這裡可以自己定義名稱
            formData: {
                newsId: '',
                eventTitle: '',
                classify: '',
                disLaunch: '',
                startDate: '',
                endDate: '',
                eventImg: '',
                eventInformation: '',
            },
            // 添加一個用於生成圖片路徑數字的計數變量
            imgPathCounter: 10,
        }
    },
    methods: {
        changeFile() {
            document.getElementById("upFile").click();
        },
        uploadImg(e) {
            // console.log(e.target.files[0])
            if (e.target.files[0]) {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                // formData.append("news_id", this.formData.newsId);
                // 統一規範檔名為member_img_userId
                // formData.append('img_path', `news_img_${this.formData.newsId}.jpg`);
                

                // 使用時間戳記生成唯一的圖片路徑數字
                const timestamp = Date.now();
                formData.append('img_path', `infoCard${timestamp}.jpg`);

                // call api
                axios
                    .post(
                        `${import.meta.env.VITE_PHP_URL}/back/addNewsImgs.php?`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    )
                    .then((res) => {
                        // console.log(res.data)
                        if (res.data.msg === 'Y') {
                            console.log()

                            // this.formData.eventImg = `news_img_${this.formData.newsId}.jpg`
                            // 更新圖

                            this.formData.eventImg = `infoCard${timestamp}.jpg`;
                            // 更新圖片
                        


                        } else {
                            alert("更新圖片失敗！");
                        }
                    })
                    .catch((error) => {
                        console.error("錯誤", error);
                    });
            }
        },
        // 處理圖片上傳
        // handleFileUpload(event) {
        //     const file = event.target.files[0];
        //     // 從完整路徑中提取圖片名
        //     const fileName = file.name;
        //     // 將圖片名存儲到 formData 中
        //     this.formData.eventImg = fileName;
        // },
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
                    const response = await axios.post(`${import.meta.env.VITE_PHP_URL}/back/postNewsArticle.php`, this.formData);
                    console.log(response.data); // 可以在控制台中查看後端傳回的信息
                    
                    // 提示成功新增資料
                    alert('已成功新增資料!');
                    // 關閉抽屜
                    this.value = false;

                    // 將資料傳給父層更新
                    this.$emit('getNewsData');

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