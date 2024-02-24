<template>
  <main class="backSHProducts">
    <BackSidebar />
    <!-- {{ SHPro }} -->
    <section class="backSHProductsInfo">
      <BackTitle />
      <div class="stateChange">
        <button type="button" @click="checkState = -1" :class="{ 'checked': checkState === -1 }">全部</button>
        <button type="button" @click="checkState = 1" :class="{ 'checked': checkState === 1 }">上架</button>
        <button type="button" @click="checkState = 0" :class="{ 'checked': checkState === 0 }">下架</button>
      </div>
      <div class="searchBar">
        <!-- //商品搜尋 -->
        <select v-model="selectedOption" id="selectedOption">
          <option value="sh_pro_id">商品編號</option>
          <option value="sh_pro_name">商品名稱</option>
        </select>
        <input v-model.trim="searchText" :placeholder="placeholderText">
        <!-- <button @click="performSearch" class="searchBtn">搜尋</button> -->

        <SHPNewItemDrawer />
      </div>
      <!-- SHProducts -->
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
        <ul class="SHProductsInfoList" v-for="(SHProductsInfo, index) in paginated" :key="index">
          <li class="SHProductsNo"> {{ SHProductsInfo.sh_pro_id }} </li>
          <li class="SHPReviseItemDrawer">
            <SHPReviseItemDrawer :detail="SHProductsInfo" />
          </li>
          <li class="picture"> {{ SHProductsInfo.picture }} </li>
          <li class="SHProductsName"> {{ SHProductsInfo.sh_pro_name }} </li>
          <li class="SHProductsPrice"> {{ SHProductsInfo.sh_pro_price }} </li>
          <li class="SHProductsDate"> {{ SHProductsInfo.launch_date }} </li>
          <li><input class="SHPState" type="text" :value="SHPState(SHProductsInfo.sh_pro_state)" readonly>
          </li>
          <!-- <li class="SHProductsDate"> {{ SHProductsInfo.sh_pro_intro }}<br>{{ SHProductsInfo.sh_pro_info }}</li>  -->

        </ul>
      </div>

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
      // placeholderText: "請輸入搜尋內容", // placeholder 文字

      // 頁數切換+上下架篩選後的頁數
      activeTab: "",
      currentPage: 1,
      perPage: 5,
      SHPro: [],
      checkState: -1,// -1, 0, 1

      // 資料
      SHProData: [],
      displayData: [],
    };
  },
  created() {
    this.getSHProData()
    //在頁面載入時同時載入function
    //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
    // 使用 Promise.all 來確保兩個請求都完成後再處理資料
    // Promise.all([
    // axios.get(`${import.meta.env.VITE_CARA_URL}/back/backSHProduct.php`),
    // axios.post(`${import.meta.env.VITE_CARA_URL}/back/backSHProductRe.php`)
    // ])
    // axios.get(`${import.meta.env.VITE_CARA_URL}/back/backSHProduct.php`)
    //   .then((response) => {
    //     // 成功取得資料後，將資料存入陣列
    //     this.SHPro = response.data;
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //   });

  },
  watch: {
    searchText(newVal, oldVal) {
      console.log(this.searchText);
      // console.log('new:'+newVal);
      // console.log('old:'+oldVal);

      // 可以調用下面的methods
      this.filterHandle();
    }
  },
  methods: {
    getSHProData() {
      //axios的get方法(`$import.meta.env.{變數}/檔名.php`)用.env檔中寫的網址來判斷網址URL的前贅
      axios.get(`${import.meta.env.VITE_CARA_URL}/back/backSHProduct.php`)
        .then((response) => {
          // 成功取得資料後，將資料存入 member 陣列
          this.SHPro = response.data;
          this.displayData = response.data;
          this.responseData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    // search功能
    filterHandle() {
      console.log('filterHandle triggered');
      if (this.searchText.trim() === '') {
        this.displayData = [...this.SHPro];
      } else {
        const searchProperty = this.selectedOption;
        this.displayData = this.SHPro.filter((SHProductsInfo) => {
          return SHProductsInfo[searchProperty].toString().includes(this.searchText);
        });
      }
    },

    // 頁碼
    toggleStatus(index) {
      this.SHPro[index].status = !this.SHPro[index].status;
    },
    currentSidebar(item) {
      this.activeTab = item
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
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

    // 上架/未上架
    SHPState() {
      return (SHPState) => SHPState === 1 ? "上架中" : "未上架";
    },
    SHProAfterFilter() {
      if (this.checkState === -1) return this.displayData
      return this.displayData.filter(v => v.sh_pro_state === this.checkState);
    },
    // 頁碼切換 (SHProAfterFilter 這樣才能根據篩選出來的筆數去分頁)
    paginated() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.SHProAfterFilter.slice(start, end);
    },
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
},
loadData(url) {
  axios.get(url)
    .then((response) => {
      this.SHPro = response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, -->