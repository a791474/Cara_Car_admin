<script>
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'
export default {
    data() {
        return {

        };
    },
    created(){
        // 判斷有沒有登入過
        this.checkLogin()
    },
    computed: {
        //使用 mapState 輔助函數將/src/stores/user裡的state/data 映射在這裡
        // !!!要寫在computed
        ...mapState(userStore, ['token'])
    },
    methods:{
        //使用 mapActions 輔助函數將/src/stores/user裡的actions/methods 映射在這裡
        ...mapActions(userStore, ['checkLogin', 'updateToken']),
        logout(){
            // 調用pinia的updateToken
            this.updateToken('')
            if(!this.token){
            //清除Token後回到登入頁
            this.$router.push('/')
            }
        }
    }
}
</script>
<template>
        <div class="backWelcome">
            <h1>Good Morning, Manager </h1>
            <div class="drawBgBalloon">
                <img src="../assets/imgs/sidebar-bg-balloon.png" alt="BG">
            </div>
                <button v-if="token" @click="logout">登出</button>
        </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backTitle.scss'
</style>