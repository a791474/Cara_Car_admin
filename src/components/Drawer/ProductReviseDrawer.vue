<template>
	<div class="reviseItemDrawer">
		<Button @click="value = true" type="primary">
			<i class="fa-solid fa-screwdriver-wrench"></i>
			修改
		</Button>

		<Drawer
			title="修改商品"
			v-model="value"
			width="450"
			:mask-closable="false"
			:styles="styles"
		>
			<Form :model="formData">
				<Row :gutter="32">
					<!-- 商品名稱 -->
					<Col span="24">
						<FormItem label="商品名稱-中文" label-position="top">
							<Input
								v-model="formData.pro_name"
								placeholder="請輸入商品中文名稱"
							/>
						</FormItem>
					</Col>
					<Col span="24">
						<FormItem label="商品名稱-英文" label-position="top">
							<Input
								v-model="formData.pro_en_name"
								placeholder="請輸入商品英文名稱"
							/>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="定價" label-position="top">
							<Input v-model="formData.pro_price" placeholder="請輸入價格" />
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="商品類型" label-position="top">
							<Select
								v-model="formData.pro_category"
								placeholder="請選擇商品分類"
							>
								<Option value="電動車">電動車</Option>
								<Option value="配件">配件</Option>
								<Option value="模型車">模型車</Option>
							</Select>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="上架時間" label-position="top">
							<DatePicker
								v-model="formData.launch_date"
								type="date"
								placeholder="請設定上架時間"
								style="display: block"
								placement="bottom-end"
							></DatePicker>
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="下架時間" label-position="top">
							<DatePicker
								v-model="formData.end_date"
								type="date"
								placeholder="請設定下架時間"
								style="display: block"
								placement="bottom-end"
							></DatePicker>
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="12">
						<FormItem
							label="上架 / 下架"
							label-position="top"
							class="onOrRemoved"
						>
							<input
								type="radio"
								name="state"
								:value="0"
								v-model="formData.pro_state"
							/>上架中
							<input
								type="radio"
								name="state"
								:value="1"
								v-model="formData.pro_state"
							/>下架中
						</FormItem>
					</Col>
					<Col span="12">
						<FormItem label="是否置頂" label-position="top" class="onOrRemoved">
							<Checkbox v-model="formData.pro_pin" label="置頂"></Checkbox>
						</FormItem>
					</Col>
				</Row>
				<Row :gutter="32">
					<Col span="24">
						<FormItem label="新增圖片" label-position="top">
							<Upload
								multiple
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
					</Col>
					<Col span="24">
						<FormItem label="商品簡介內容" label-position="top">
							<Input
								type="textarea"
								v-model="formData.pro_intro"
								:rows="10"
								placeholder="請輸入商品簡介內容"
							/>
						</FormItem>
					</Col>
					<Col span="24">
						<FormItem label="商品規格內容" label-position="top">
							<Input
								type="textarea"
								v-model="formData.pro_info"
								:rows="10"
								placeholder="請輸入商品規格內容"
							/>
						</FormItem>
					</Col>
				</Row>
			</Form>
			<div class="product-drawer-footer">
				<Button
					class="btnCancel"
					style="margin-right: 8px"
					@click="value = false"
					>Cancel</Button
				>
				<Button
					class="btnSubmit reviseItemSubmit"
					type="primary"
					@click="reviseData"
				>
					<i class="fa-solid fa-screwdriver-wrench"></i>
					確認修改
				</Button>
			</div>
		</Drawer>
	</div>
</template>

<script>
import axios from "axios";
import { Row } from "view-ui-plus";

export default {
	data() {
		return {
			value: false, //抽屜的開關值
			styles: {
				height: "calc(100% - 55px)",
				overflow: "auto",
				paddingBottom: "16px",
				position: "static",
			},
			formData: {
				pro_id: "",
				pro_name: "",
				pro_en_name: "",
				pro_category: "",
				pro_price: "",
				pro_intro: "",
				pro_info: "",
				launch_date: "",
				end_date: "",
				pro_state: "",
				pro_pin: "",
			},
			imgfiles: [],
			newImgFile: [],
		};
	},
	props: {
		detail: {
			type: Object,
			required: true,
		},
	},
	watch: {
		value(newValue) {
			if (newValue) {
				this.formData.pro_id = this.detail.pro_id;
				this.formData.pro_name = this.detail.pro_name;
				this.formData.pro_en_name = this.detail.pro_en_name;
				this.formData.pro_category = this.detail.pro_category;
				this.formData.pro_price = this.detail.pro_price;
				this.formData.pro_intro = this.detail.pro_intro;
				this.formData.pro_info = this.detail.pro_info;
				this.formData.launch_date = this.detail.launch_date;
				this.formData.end_date = this.detail.end_date;
				this.formData.pro_state = this.detail.pro_state;
				this.formData.pro_pin = this.detail.pro_pin === "1" ? true : false;
				this.getThisProductAllImgs(this.formData.pro_id);
			}
		},
		drawerVisible(newValue) {
			this.$emit("input", newValue); // 監聽抽屉的顯示與隱藏狀態的變化，並通過 $emit 將新的狀態傳遞給父组件
		},
	},
	methods: {
		// 取得這一份商品的全部圖片名稱
		getThisProductAllImgs(pro_id){
			axios.get(`${import.meta.env.VITE_LPHP_URL}/front/thisproductimgs.php?pageId=${pro_id}`)
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
				pro_id: this.formData.pro_id,
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
				imgFormData.append('pro_id', image.pro_id); // PHP 中接收圖片資料的陣列參數名稱
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
			try {
				this.handleBeforeChange()
					.then(() => {
					this.upload()
						axios
							.post(
								`${import.meta.env.VITE_LPHP_URL}/back/updateProductInfo.php`,
								this.formData
							)
							.then((response) => {
								console.log(response.data);
								// 處理響應

								// 關閉抽屜
								this.value = false;

								//更新畫面資料
								this.$emit("refreshGetProductData");
							})
							.catch((error) => {
								console.error(error);
								// 處理錯誤
							});
					})
					.catch((e) => {
						console.warn(e);
					});
			} catch (e) {
				console.warn(e);
			}
		},
		// 確認是否要更新物件
		handleBeforeChange() {
      const keys = Object.keys(this.formData);
      const hasEmptyValue = keys.some(key => {
        return !this.formData[key];
      });
      if (hasEmptyValue){
        this.$Message.error('請填寫所有商品資訊');
        reject();
      } else {
        return new Promise((resolve, reject) => {
				this.$Modal.confirm({
					title: "新增商品確認",
					content: "確定要新增商品嗎?",
					onOk: () => {
						resolve();
					},
					onCancel: () => {
						reject();
					},
				});
			});
      }
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/Drawer/productDrawer.scss";
</style>
