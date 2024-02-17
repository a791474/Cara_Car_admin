<script>
import axios from 'axios'; //引用axios才可以把api內容取出來
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import NewItemDrawer from '@/components/Drawer/NewItemDrawer.vue';
import ReviseItemDrawer from '@/components/Drawer/ReviseItemDrawer.vue';

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
      selectedOption: '',
      searchText: '',

      //頁面切換
      activeTab: "",
      currentPage: 1,
      perPage: 8,

      //接商品資料的陣列
      productsData: [],

      //接取錯誤訊息
      errorMessage: '',
    };
  },
  created() { //在頁面載入時同時載入function
    //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
    axios.get(`${import.meta.env.VITE_CARA_URL}/back/backProductList.php`)
      .then((response) => {
        // 成功取得資料後，將資料存入陣列
        this.productsData = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.errorMessage = "執行失敗: " + error.message; // 存儲錯誤訊息
      });

  },
  methods: {
    // 頁碼
    toggleStatus(index) {
      this.productsData[index].status = !this.productsData[index].status;
    },
    currentSidebar(item) {
      this.activeTab = item
    },
    changePage(page) {
      this.currentPage = page;
    },
    //搜尋功能

  },
  mounted() {

  },
  computed: {
    //頁碼顯示與切換
    paginated() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.productsData.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.productsData.length / this.perPage);
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
        <select v-model="selectedOption" id="selectedOption">
          <option value="searchProductNo">商品編號</option>
          <option value="searchProductName">商品分類</option>
        </select>
        <input type="text" v-model="searchText" :placeholder="placeholderText">
        <button @click="search" class="searchBtn">搜尋</button>
        <NewItemDrawer />
      </div>

      <!-- 商品列表 -->
      <div class="productsList">
        <ul class="productsTitle">
          <li>商品編號</li>
          <li class="ReviseItemDrawer"></li>
          <li>商品圖片</li>
          <li>商品分類</li>
          <li>商品名稱</li>
          <li>定價/售價</li>
          <li>促銷狀態</li>
          <li>商品狀態</li>
        </ul>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        <ul class="productInfoList" v-for="(item, index) in paginated" :key="index">
          <li class="productNo"> {{ item.pro_id }} </li>
          <li class="ReviseItemDrawer">
            <ReviseItemDrawer />
          </li>
          <li class="picture">
            <!-- {{ item.img_name }}  -->
            <!-- <img :src="路徑/item.img_name" alt=""> -->
            <img src="https://fakeimg.pl/300x200/200">
          </li>
          <li class="classify"> {{ item.pro_category }} </li>
          <li class="productName"> {{ item.pro_name }} </li>
          <li class="productPriceAndSale">
            <div class="productPrice">
              {{ item.pro_price }}
            </div>
            <div class="productSale">
              {{ item.pro_sale }}
            </div>
          </li>
          <li class="promo_state">
            {{ item.promo_state }}
          </li>
          <li class="productStateAndPin">
            <div class="productState">
              {{ item.pro_state }}
            </div>
            <div class="productPin">
              {{ item.pin_state }}
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