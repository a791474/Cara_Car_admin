<template>
  <main class="backSHProducts">
    <!-- 側邊欄組件 -->
    <BackSidebar />

    <!-- 顯示{{ SHPro }}資料的區塊 -->
    <section class="backSHProductsInfo">
      <!-- 標題組件 -->
      <BackTitle />

      <!-- 全部、上架、下架的按鈕 -->
      <div class="stateChange">
        <button type="button" @click="checkState = -1" :class="{ 'checked': checkState == -1 }">全部</button>
        <button type="button" @click="checkState = 1" :class="{ 'checked': checkState == 1 }">上架</button>
        <button type="button" @click="checkState = 0" :class="{ 'checked': checkState == 0 }">下架</button>
      </div>

      <!-- 商品搜尋條件 -->
      <div class="searchBar">
        <select v-model="selectedOption" id="selectedOption">
          <option value="sh_pro_id">商品編號</option>
          <option value="sh_pro_name">商品名稱</option>
        </select>
        <input v-model.trim="searchText" :placeholder="placeholderText">

        <!-- 新增商品的抽屜組件 -->
        <SHPNewItemDrawer @refreshSHProData="getSHProData" />
      </div>

      <!-- SHProducts 列表-->
      <div class="SHProductsList">

        <ul class="SHProductsTitle">
          <li>商品編號</li>
          <li class="ReviseItemDrawer"></li>
          <li>商品圖片</li>
          <li>商品名稱</li>
          <li>價格</li>
          <li>上架時間</li>
          <li>狀態</li>
        </ul>

        <!-- 顯示每個資料欄位的資訊 -->
        <ul class="SHProductsInfoList" v-for="(SHProductsInfo, index) in paginated" :key="index">
          <li class="SHProductsNo"> {{ SHProductsInfo.sh_pro_id }} </li>
          <li class="SHPReviseItemDrawer">
            <SHPReviseItemDrawer :detail="SHProductsInfo" @refreshSHProData="getSHProData" />
          </li>
          <li class="picture"> <img :src="getProductImgSrc(SHProductsInfo.img_name)" alt="pic"></li>
          <li class="SHProductsName"> {{ SHProductsInfo.sh_pro_name }} </li>
          <li class="SHProductsPrice"> {{ SHProductsInfo.sh_pro_price }} </li>
          <li class="SHProductsDate"> {{ SHProductsInfo.launch_date }} </li>
          <li><input class="SHPState" type="text" :value="SHPState(SHProductsInfo.sh_pro_state)" readonly>
          </li>
        </ul>
      </div>

      <!-- 分頁組件 -->
      <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />

    </section>

  </main>
</template>


<script>
import axios from 'axios';
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';
import SHPNewItemDrawer from '@/components/Drawer/SHPNewItemDrawer.vue';
import SHPReviseItemDrawer from '@/components/Drawer/SHPReviseItemDrawer.vue';


export default {
  components: {
    BackSidebar,
    BackTitle,
    PageNumber,
    SHPNewItemDrawer,
    SHPReviseItemDrawer,

  },
  data() {
    return {
      // searchBar placeholder切換
      selectedOption: 'sh_pro_id',
      searchText: '',

      // 頁數切換+上下架篩選後的頁數
      activeTab: "",
      currentPage: 1,
      perPage: 3,
      SHPro: [],
      checkState: -1,// -1(全部), 0(下架), 1(上架) 
      // 設定上下架的值type="button" @click="checkState=-1

      // 資料陣列
      SHProData: [],
      displayData: [],
    };
  },
  created() {
    // 當組件被創建時獲取資料
    this.getSHProData()
  },
  watch: {
    searchText(newVal, oldVal) {
      // console.log(this.searchText);
      // console.log('new:'+newVal);
      // console.log('old:'+oldVal);
      // 可以調用下面的methods
      // 監聽搜尋功能
      this.filterHandle();
    }
  },
  methods: {
    getSHProData() {
      //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
      axios.get(`${import.meta.env.VITE_PHP_URL}/back/backSHProduct.php`)
        .then((response) => {
          console.log(response.data);
          // 成功取得資料後，將資料存入 member 陣列
          this.SHPro = response.data;
          this.displayData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    // search功能
    filterHandle() {
      console.log('filterHandle triggered');
      if (this.searchText.trim() == '') {
        this.displayData = [...this.SHPro];
      } else {
        const searchProperty = this.selectedOption;
        this.displayData = this.SHPro.filter((SHProductsInfo) => {
          return SHProductsInfo[searchProperty].toString().includes(this.searchText);
        });
      }
    },
    // 取得圖片的路徑函式
    getProductImgSrc(imgName) {
      return new URL(`${import.meta.env.VITE_IMG_BASE_URL}/sh_products/${imgName}`).href
    },

    // 頁碼
    toggleStatus(index) {
      this.SHPro[index].status = !this.SHPro[index].status;
    },
    //側邊欄的活動
    currentSidebar(item) {
      this.activeTab = item
    },
    //處理分頁變化
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    //搜尋功能的佔位文字
    placeholderText() {
      switch (this.selectedOption) {
        case 'sh_pro_id':
          return '請輸入商品編號';
        case 'sh_pro_name':
          return '請輸入商品名稱';
        default:
          return '請輸入商品名稱';
      }
    },

    // 顯示 上架/未上架 狀態 的屬性 (SHPState)
    SHPState() {
      return (SHPState) => SHPState == 1 ? "上架中" : "未上架";
    },
    //經過過濾後的SHPro
    SHProAfterFilter() {
      if (this.checkState == -1) return this.displayData
      return this.displayData.filter(v => v.sh_pro_state == this.checkState);
    },
    // 分頁切換 (SHProAfterFilter 這樣才能根據篩選出來的筆數去分頁)
    paginated() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.SHProAfterFilter.slice(start, end);
    },
    //分頁的總頁數計算
    totalPages() {
      return Math.ceil(this.SHProAfterFilter.length / this.perPage);
    },
  },
};
</script>


<style lang="scss" scoped>
@import '@/assets/scss/page/backShProducts.scss';
</style>
<!-- filterHandle() {
  if (this.searchText.trim() === '') {
    // 如果搜尋框為空，還原顯示所有商品
    this.paginated = this.SHPro.slice(0, this.perPage);
  } else {
    // 根據搜尋條件過濾商品
    this.SHPro.filter(product => {
      const searchProperty = this.selectedOption === 'SHProductsName' ? 'sh_pro_name' : 'sh_pro_id';
      const regex = new RegExp(this.searchText, 'i');
      return product[searchProperty].toLowerCase().includes(this.searchText.toLowerCase());
    }).slice(0, this.perPage);

  }
},-->