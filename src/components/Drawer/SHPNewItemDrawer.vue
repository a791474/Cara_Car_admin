<template>
    <div class="SHPNewItemDrawer">
        <!-- 觸發打開新增商品抽屜的按鈕 -->
        <Button @click="value = true" type="primary">
            <i class="fa-solid fa-plus"></i>
            新增
        </Button>
        <!-- 新增商品的抽屜組件 -->
        <Drawer title="新增商品" v-model="value" width="500" :mask-closable="false" :styles="styles">

            <!-- 商品資訊表單 -->
            <Form :model="formData">

                <p>商品內容區</p>
                <!-- 商品名稱的輸入欄 -->
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
                <!-- 商品年份和狀態的輸入欄 -->
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
                <!-- 商品定價和上架狀態的輸入欄 -->
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
                    </FormItem>
                    </Col>
                </Row>
                <!-- 上架時間、售出狀態和置頂的輸入欄 -->
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
                <!-- 商品圖片上傳 -->
                <FormItem label="商品圖片" label-position="top">
                    <Upload
                    multiple 
                    :accept="['.jpg','.jpeg','.png']"
                    :before-upload="handleUpload" 
                    action="">
                        <Button><i class="fa-regular fa-image" style="margin: 2px;"></i>選擇圖片上傳</Button>
                    </Upload>
                    <div v-if="newImgFile.length > 0">
                        已選擇的圖片:
                        <ul>
                            <li class="uploadImgShow" v-for="image in newImgFile" :key="index">
                                <img :src="image.previewImage" alt="">
								{{ image.title }}
								<Button type="error" @click="cancelUpload(index)">取消</Button>
                            </li>
                        </ul>
                    </div>
                </FormItem>
                <!-- 商品介紹區 -->
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
            <!-- 抽屜底部按鈕 -->
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

    // 監視器，當 value 改變時執行清空表單的方法
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
    },
        //執行二手商品資料新增
        handleNewSHProductInfo() {
            axios.post(`${import.meta.env.VITE_PHP_URL}/back/postbackSHProduct.php`, this.formData)
                .then((response) => {
                    // console.log(response.data); // 可以在控制台中查看後端傳回的信息
                    // console.log(response.data.sh_pro_id);
                    this.newImgFile.sh_pro_id = response.data.sh_pro_id;
                    // console.log("成功新增的 sh_pro_id:", this.newImgFile.sh_pro_id);

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
        // 提交表單
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
                    // 發送事件通知父組件更新商品數據
                    this.$emit("refreshSHProData")

                } catch (error) {
                    console.error(error);
                }
            } else {
                // 若有欄位為空值，則顯示警告信息
                alert('所有欄位都必須填寫哦');
            }
        },
        // 清空表單
        clearForm() {
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

<style lang="scss" scoped>
@import '@/assets/scss/components/SHPNewItemDrawer.scss'
</style>