<script>
import axios from 'axios'; //引用axios才可以把api內容取出來
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import NewItemDrawer from '@/components/Drawer/NewItemDrawer.vue';
import ReviseItemDrawer from '@/components/Drawer/ProductReviseDrawer.vue';

export default {
  components: {
    BackSidebar,
    BackTitle,
    PageNumber,
    NewItemDrawer,
    ReviseItemDrawer,
  },
  data() {
    return {
      //搜尋功能類別與值
      selectedOption: 'pro_id',
      searchText: '',

      //頁面切換
      activeTab: "",
      currentPage: 1,
      perPage: 5,

      //接商品資料的陣列
      productsData: [],
      displayData: [],

      // 拋接球資料的陣列
      formData:[],

      //接取錯誤訊息
      errorMessage: '',
    };
  },
  created() { //在頁面載入時同時載入function
    this.getProductData()
  },
  watch:{ //監聽
  },
  methods: {
    getProductData(){
      //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
      axios.get(`${import.meta.env.VITE_CARA_URL}/back/backDisplayAllProductList.php`)
        .then((response) => {
        // 成功取得資料後，將資料存入 member 陣列
          this.productsData = response.data;
          this.displayData = response.data;
        })
        .catch((error) => {
          console.error("axios執行失敗:", error);
        });
    },
    //搜尋功能
    filterHandle(){
      this.displayData = this.productsData.filter((everySingleProduct)=>{
        switch(this.selectedOption){
          case 'pro_id':
            return everySingleProduct.pro_id.toString().includes(this.searchText);
          case 'pro_category':
            return everySingleProduct.pro_category.includes(this.searchText);
          default:
            return false;
        }
      })
    },
    // 取得圖片的路徑函式
    getProductImgSrc(imgName){
      return new URL(`../assets/imgs/product/new_products/${imgName}`, import.meta.url).href
    },
    //將商品上下架狀態從數值轉換成文字
    converPro_stateToText(Pro_state){
      if(Pro_state == 0){
        return '上架中';
      } else if(Pro_state == 1){
        return '已下架';
      }
    },
    //將商品置頂與否狀態轉換成文字
    converPro_pinToText(Pro_pin){
      if(Pro_pin == 0){
        return '非置頂';
      } else if(Pro_pin == 1){
        return '置頂中';
      }
    },
    
    // 頁碼
    toggleStatus(index) {
      this.displayData[index].status = !this.displayData[index].status;
    },
    currentSidebar(item) {
      this.activeTab = item
    },
    changePage(page) {
      this.currentPage = page;
    },

  },
  mounted() {
    
  },
  computed: {
    //placeholderText預設字詞
    placeholderText(){
      switch(this.selectedOption){
        case 'pro_id' :
          return '請輸入商品編號'
        case 'pro_category' :
          return '請輸入商品種類'
      }
    },
    //頁碼顯示與切換
    paginated() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.displayData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.displayData.length / this.perPage);
    },
  }
}
</script>

<template>
  <main class="backProducts">
    <BackSidebar />
    <section class="backProductInfo">
      <BackTitle />

      <!-- 搜尋區 -->
      <div class="searchBar">
        <p>請選擇類別</p>
        <select v-model="selectedOption" id="selectedOption">
          <option value="pro_id">商品編號</option>
          <option value="pro_category">商品分類</option>
        </select>
        <input type="text" v-model="searchText" :placeholder="placeholderText">
        <button @click="filterHandle" class="searchBtn">搜尋</button>
        <NewItemDrawer />
      </div>

      <!-- 商品列表 -->
      <div class="productsList">
        <ul class="productsTitle">
          <li style="width: 60px;">商品編號</li>
          <li style="width: 60px;">修改商品</li>
          <li style="width: 150px;">商品圖片</li>
          <li style="width: 250px;">商品分類</li>
          <li style="width: 250px;">商品名稱</li>
          <li style="width: 90px;">定價/售價</li>
          <li style="width: 100px;">促銷狀態</li>
          <li style="width: 80px;">商品狀態</li>
        </ul>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <ul class="productInfoList" v-for="(productInfo, index) in paginated" :key="index">
          <li class="productNo"> {{ productInfo.pro_id }} </li>
          <li class="ReviseItemDrawer"><ReviseItemDrawer :detail="productInfo"/></li>
          <li class="picture">
            <img :src="getProductImgSrc(productInfo.img_name)" alt="">
          </li>
          <li class="classify"> {{ productInfo.pro_category }} </li>
          <li class="productName"> {{ productInfo.pro_name }} </li>
          <li class="productPriceAndSale">
            <div class="productPrice">
              {{ productInfo.pro_price }}
            </div>
            <div class="productSale">
              {{ productInfo.pro_sale }}
            </div>
          </li>
          <li class="promo_state">
            {{ productInfo.promo_name }}
          </li>
          <li class="productStateAndPin">
            <div class="productState">
              {{ converPro_stateToText(productInfo.pro_state) }}
            </div>
            <div class="productPin">
              {{ converPro_pinToText(productInfo.pro_pin) }}
            </div>
          </li>
        </ul>
      </div>

      <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/backProduct.scss';
</style>