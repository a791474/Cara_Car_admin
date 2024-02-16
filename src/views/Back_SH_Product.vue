<template>
  <main class="backSHProducts">
    <BackSidebar />

    <section class="backSHProductsInfo">
      <BackTitle />

      <div class="searchBar">
        <select v-model="selectedOption" id="selectedOption">
          <option value="SHProductsNo">商品編號</option>
          <option value="SHProductsTitle">商品分類</option>
        </select>
        <input type="text" v-model="searchText" :placeholder="placeholderText">
        <button @click="search" class="searchBtn">搜尋</button>
        <SHPNewItemDrawer />
      </div>
      <!-- SHProducts -->
      <div class="SHProductsList">
        <ul class="SHProductsTitle">
          <li>商品編號</li>
          <li class="ReviseItemDrawer"></li>
          <li>商品圖片</li>
          <li>商品分類</li>
          <li>商品名稱</li>
          <li>價格</li>
          <li>狀態</li>
        </ul>
        <ul class="SHProductsInfoList" v-for="(SHProductsInfo, index) in paginated" :key="index">
          <li class="SHProductsNo"> {{ SHProductsInfo.SHProductsNo }} </li>
          <li class="SHPReviseItemDrawer">
            <SHPReviseItemDrawer />
          </li>
          <li class="picture"> {{ SHProductsInfo.picture }} </li>
          <li class="classify"> {{ SHProductsInfo.classify }} </li>
          <li class="SHProductsName"> {{ SHProductsInfo.SHProductsName }} </li>
          <li class="SHProductsPrice"> {{ SHProductsInfo.SHProductsPrice }} </li>
          <li class="SHProductsDate"> {{ SHProductsInfo.SHProductsState }}<br>{{ SHProductsInfo.OnDate }}</li>

        </ul>
      </div>



      <PageNumber :totalPages="totalPages" :currentPage="currentPage" @pageChange="changePage" />

    </section>

  </main>
</template>


<script>
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
      selectedOption: 'SHProductsNo',
      searchText: '',

      // 頁數切換
      activeTab: "",
      currentPage: 1,
      perPage: 5,

      // 存放商品資料的陣列      
      SHProductsInfo: [
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '02',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },
        {
          SHProductsNo: '01',
          picture: '商品圖片',
          classify: '商品分類',
          SHProductsName: '超強小汽車車',
          SHProductsPrice: '10000',
          SHProductsState: '上架',
          OnDate: '2024/2/1',
        },

      ]
    };
  },
  methods: {
    search() {
      if (this.searchText.trim() === '') {
        // 如果搜尋框為空，還原顯示所有商品
        this.paginated = this.SHProductsInfo.slice(0, this.perPage);
      } else {
        // 根據搜尋條件過濾商品
        this.paginated = this.SHProductsInfo.filter(product => {
          return product.SHProductsName.toLowerCase().includes(this.searchText.toLowerCase());
        }).slice(0, this.perPage);
      }
    },
    // ---------------------不確定

    // 頁碼
    toggleStatus(index) {
      this.SHProductsInfo[index].status = !this.SHProductsInfo[index].status;
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
        case 'SHProductsName':
          return '請輸入商品分類'
        default:
          return '請輸入商品編號'

      }
    },

    // 頁碼切換
    paginated() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.SHProductsInfo.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.SHProductsInfo.length / this.perPage);
    },
  },
};
</script>


<style lang="scss" scoped>
@import '@/assets/scss/page/backShProducts.scss'
</style>
