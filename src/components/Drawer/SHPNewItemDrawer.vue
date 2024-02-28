<template>
    <div class="SHPNewItemDrawer">

        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i>
            新增
        </Button>

        <Drawer title="新增商品" v-model="value" width="500" :mask-closable="false" :styles="styles">
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
                        <input type="radio" name="state" :value="0" v-model="formData.sh_pro_state">下架
                        <input type="radio" name="state" :value="1" v-model="formData.sh_pro_state">上架
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
                    <Upload multiple :before-upload="handleUpload" action="">
                        <Button icon="ios-camera">選擇圖片上傳</Button>
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
                position: 'static'
            },
            formData: {
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
                // url: '',
            },
            // imgfiles: [],
            newImgFile: [],
        }
    },
    watch: {
        value() {
            this.clearForm()
        },
    },
    methods: {
        // 取得這一份商品的全部圖片名稱
        getThisProductAllImgs(sh_pro_id) {
            axios.get(`${import.meta.env.VITE_PHP_URL}/front/thisproductimgs.php?pageId=${sh_pro_id}`)
                .then((response) => {
                    this.imgfiles = response.data;
                    console.log(this.imgfiles);
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
            this.newImgFile.push({
                title: file.name,
                image: file,
                sh_pro_id: '',
            });
            return false;
        },
        //執行二手商品資料新增
        handleNewSHProductInfo() {
            axios.post(`${import.meta.env.VITE_PHP_URL}/back/postbackSHProduct.php`, this.formData)
                .then((response) => {
                    console.log(response.data); // 可以在控制台中查看後端傳回的信息
                    console.log(response.data.sh_pro_id);
                    this.newImgFile.sh_pro_id = response.data.sh_pro_id;
                    console.log("成功新增的 sh_pro_id:", this.newImgFile.sh_pro_id);

                    if (this.newImgFile.sh_pro_id) {
                        this.upload()
                    } else {
                        console.log("未收到 pro_id");
                    }

                })
                .catch(error => {
                    //處理錯誤
                    console.error('商品新增失敗', error);
                });
        },
        //執行圖片上傳
        upload() {
            // 建立 FormData 物件，用於傳送表單資料
            const imgFormData = new FormData();
            // 將 newImgFile 中的每張圖片(每張圖片在以下的foreach叫做image)加入 FormData 中
            this.newImgFile.forEach(image => {
                imgFormData.append('image[]', image.image); // images[]  PHP 中接收圖片資料的陣列參數名稱
                imgFormData.append('sh_pro_id', this.newImgFile.sh_pro_id); // PHP 中接收圖片資料的陣列參數名稱
            });

            axios.post(`${import.meta.env.VITE_PHP_URL}/back/addSHProductImgs.php`, imgFormData)
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
                    this.handleNewSHProductInfo()
                    // location.reload()
                    // 提示成功新增資料
                    alert('已成功新增資料!');

                    // 關閉抽屜
                    this.value = false;

                    this.$emit("refreshSHProData")
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
                sh_pro_price: '',
                sh_pro_intro: '',
                sh_pro_info: '',
                sh_pro_situation: '',
                sh_pro_state: '',
                launch_date: '',
                sh_pro_sold: '',
                sh_pro_pin: ''
                // url: '',
            };
        },
    },
};

</script>

<style lang="scss" scoped>@import '@/assets/scss/components/SHPNewItemDrawer.scss'</style>