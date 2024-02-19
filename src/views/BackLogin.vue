<script>
import { mapActions } from 'pinia'
import userStore from '@/stores/user'
import apiInstance from '@/plugins/auth'
export default {
    data() {
        return {
            account:'',
            psw8888: '',
            passwordVisible: false,
        };
    },
    created(){
        // 判斷有沒有登入過，如果沒有token等同於沒有登入
        const user = this.checkLogin()
        if(user){
        //有登入資訊轉到首頁
        this.$router.push('/BackAdmin')
        }
    },
    methods: {
        ...mapActions(userStore, ['updateToken', 'checkLogin', 'updateUserData']),
    login(){
        const bodyFormData = new FormData();
        bodyFormData.append('admin_account', this.account);
        bodyFormData.append('admin_psw', this.psw8888);
        // console.log(userData);
        // 請記得將php埋入跨域
        apiInstance({
            method: 'post',
            url: `${import.meta.env.VITE_CARA_URL}/back/getConfirmAdmin.php`,
            headers: { "Content-Type": "multipart/form-data" },
            data: bodyFormData
        }).then(res=>{
            if(res && res.data){
                if(res.data.code == 1){
                    this.updateToken(res.data.session_id)
                    this.updateUserData(res.data.adminInfo)
                    this.$router.push('/BackAdmin')

                }else{
                    alert('請輸入正確帳號或密碼')
                }
            }
        }).catch(error=>{
            console.log(error);
        })
    },
    togglePswVisbility() {
        this.passwordVisible = !this.passwordVisible;
    },
    },
};
</script>

<template>
    <div class="bg">
        <div class="backLogin">
            <div class="logo">
                <img src="../assets/imgs/login/back-login-logo.png" alt="logo">
            </div>
            <fieldset class="input-area">
                <input type="email" placeholder="使用者名稱" v-model="account">
                <input :type="passwordVisible ? 'text' : 'password'" v-model="psw8888" placeholder="●●●●●●●●">
                <div id="errorMessage" class="error-message"></div>
                <img v-if="passwordVisible" src="../assets/imgs/login/open-eye.svg" alt="closeEye" class="eye" @click="togglePswVisbility">
                <img v-else src="../assets/imgs/login/close-eye.svg" alt="closeOpen" class="eye" @click="togglePswVisbility">
                <button class="loginBtn" @click="login">登入</button>
            </fieldset>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page/BackLogin.scss'
</style>
