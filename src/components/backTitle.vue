<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia'
import userStore from '@/stores/user'
export default {
    data() {
        return {
            userStoreData:userStore(), //呼叫user.js的Pinia
        };
    },
    created() {
        this.userData.admin_id = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).id:"";
        this.userData.admin_name = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")).name:"";
        // 判斷有沒有登入過
        this.checkLogin();
        // 把userData從Pinia確定有抽到此Vue檔中，並給admin_id定義
        const admin_id = this.userData.admin_id;
        //console.log(this.userData); //確定有抓到

        //獲取PHP資料之前先傳入admin_id，執行完PHP檔之後將資料傳入user.js內的userData陣列中，而Pinia定義的陣列由下方的mapState獲取
        axios.get(`${import.meta.env.VITE_CARA_URL}/back/getUsername.php?admin_id=${admin_id}`) 
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    },
    // mounted() {
        
    // },
    computed: {
        //使用 mapState 輔助函數將/src/stores/user裡的state/data 映射在這裡
        // !!!要寫在computed
        ...mapState(userStore, ['token', 'userData'])
    },
    methods: {
        //使用 mapActions 輔助函數將/src/stores/user裡的actions/methods 映射在這裡
        ...mapActions(userStore, ['checkLogin', 'updateToken','updateUserData']),
        logout() {
            // 調用pinia的updateToken
            this.$router.push('/')
            this.userStoreData.updateToken("");
            this.userStoreData.updateUserData("");
        },
    }
}
</script>
<template>
    <div class="backWelcome">
        <h1>Good Morning,{{ this.userStoreData.userData.admin_name }}</h1>
        <div class="drawBgBalloon">
            <img src="../assets/imgs/sidebar-bg-balloon.png" alt="BG">
        </div>
        <button v-if="token" @click="logout">登出</button>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backTitle.scss'
</style>