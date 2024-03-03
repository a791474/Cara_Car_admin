<template>
    <div class="reviseItemDrawer">
        <!-- 觸發打開修改商品抽屜的按鈕 -->
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-screwdriver-wrench"></i>
            修改
        </Button>
        <!-- 修改商品的抽屜組件 -->
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
                        <DatePicker v-model="formData.launch_date" type="date" placeholder="請選擇上架時間"
                            style="display: block" placement="bottom-end"></DatePicker>
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
                        <input type="checkbox" name="pin" :true-value="1" :false-value="0"
                            v-model="formData.sh_pro_pin">置頂
                    </FormItem>
                    </Col>
                </Row>
                <FormItem label="商品圖片" label-position="top">
                    <Upload multiple :accept="['.jpg', '.jpeg', '.png']" :before-upload="handleUpload" action="">
                        <Button><i class="fa-regular fa-image" style="margin: 2px;"></i>選擇圖片上傳</Button>
                    </Upload>
                    <div class="SHPImgss">
                        <img :src="getSHPImgSrc(formData.img_name)" alt="圖片預覽">
                    </div>
                    <div>
                        <p>已選擇的圖片:</p>
                        <ul>
                            <li class="uploadImgShow" v-for="image in newImgFile" :key="image">
                                <img :src="image.previewImage" alt="">
                                {{ image.title }}
                                <Button type="error" @click="cancelUpload(index)">取消</Button>
                            </li>
                        </ul>
                    </div>
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
                sh_pro_pin: '',
                img_name: '',
            },
            // imgfiles: [],
            newImgFile: [],
        }
    },
    props: {
        detail: {
            type: Object,
            required: true,
        }
    },
    watch: {
        // 監視 value屬性，當其改變時執行相應操作
        // 抓資料庫的值，後面是.欄位名稱
        value(newVal) {
            if (newVal) {
                // 將父組件傳遞的商品填入表單
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
                this.formData.img_name = this.detail.img_name;
            }
        },
    },
    methods: {
        // 關閉抽屜
        closeDrawer() {
            this.value = false;
        },
        getSHPImgSrc() {
            return new URL(`${import.meta.env.VITE_IMG_BASE_URL}/sh_products/${this.formData.img_name}`).href
        },
        // 取得這一份商品的全部圖片名稱
        getThisProductAllImgs(sh_pro_id) {
            axios.get(`${import.meta.env.VITE_PHP_URL}/front/thisproductimgs.php?pageId=${sh_pro_id}`)
                .then((response) => {
                    this.imgfiles = response.data;
                    // console.log(this.imgfiles);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
                });
        },
        // 處理圖片上傳
        handleUpload(file) {
            // 新增圖片到 newImgFile 陣列中
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // 將圖片 Data URL 添加到 newImgFile 中
                this.newImgFile.push({
                    title: file.name,
                    image: file, // 將 Data URL 分配給圖片的 src
                    previewImage: e.target.result,
                    sh_pro_id: this.formData.sh_pro_id,
                });
            };
            return false;
        },
        // 取消上傳錯誤的圖片
        cancelUpload(index) {
            this.newImgFile.splice(index, 1);
            //我隨便放一個function裡面拿來console.log這個數值的型別是什麼
            // console.log(typeof this.formData.sh_pro_situation);
        },
        //執行圖片上傳
        upload() {
            // 建立 FormData 物件，用於傳送表單資料
            const imgFormData = new FormData();
            // 將 newImgFile 中的每張圖片(每張圖片在以下的foreach叫做image)加入 FormData 中
            this.newImgFile.forEach(image => {
                imgFormData.append('image[]', image.image); // images[]  PHP 中接收圖片資料的陣列參數名稱
                imgFormData.append('sh_pro_id', image.sh_pro_id); // PHP 中接收圖片資料的陣列參數名稱
            });

            //發送圖片上傳請求
            axios.post(`${import.meta.env.VITE_PHP_URL}/back/addSHProductImgs.php`, imgFormData)
                .then(response => {
                    // 成功處理回應
                    // console.log('圖片上傳成功', response.data);
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
            // 處理修改前的確認。包括彈出彈窗等。
            this.handleBeforeChange()

                .then(() => {
                    //確認修改，執行圖片上傳和商品更新的操作
                    this.upload()
                    axios.post(`${import.meta.env.VITE_PHP_URL}/back/updateSHProduct.php`, this.formData)
                        .then(response => {
                            // console.log(response.data);
                            // location.reload()
                            // 處理回應
                            // 提示成功新增資料
                            alert('已成功修改資料!');
                            // 關閉抽屜
                            this.value = false;
                            // 通知父組件更新商品數據
                            this.$emit('refreshSHProData')

                        })
                        .catch(error => {
                            console.error(error);
                            // 處理錯誤
                        });
                })
                .catch(() => {
                    // 用戶取消操作
                });
        },
        // 確認是否要更新商品資料
        handleBeforeChange() {
            return new Promise((resolve, reject) => {
                // 使用 iview Modal 的 confirm 彈窗，提醒用戶確認修改
                this.$Modal.confirm({
                    title: '修改二手商品資訊確認',
                    content: '確定要二手商品資訊嗎?',
                    onOk: () => {
                        resolve(); //用戶確認修改
                    },
                    onCancel: () => {
                        reject(); //用戶取消操作
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