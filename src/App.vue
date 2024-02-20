<script> 
import { RouterView } from 'vue-router'
// import BackSidebar from '@/components/backSidebar.vue';
// import BackTitle from '@/components/backTitle.vue';
// import MainHeader from '@/components/MainHeader.vue'
// import MainFooter from '@/components/MainFooter.vue'

export default {
  components:{
    RouterView,
    // BackSidebar,
    // BackTitle,
    // MainHeader,
    // MainFooter,
  },
  data() {
    return {
      
    }
  },
  methods:{

  },
  watch: {
    // '$route'() {
    //   if (!isLogin && notLoginPage) {
    //   this.$router.push('')
    // }
    // },
  },
  mounted() {
    // if (!isLogin && notLoginPage) {
    //   this.$router.push('')
    // }
  },
}
</script>

<template>

  <RouterView />
</template>

<style>
</style>