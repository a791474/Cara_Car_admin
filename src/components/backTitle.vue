<script>
export default {
    data() {
        return {

        };
    },
}
</script>
<template>
    <div class="titleFather">
        <div class="backWelcome">
            <h1>Good Morning, Manager </h1>
            <div class="drawBg">
                <img src="../assets/imgs/sidebar-bg-balloon.png" alt="BG">
            </div>
            <RouterLink to="/">
                <button>登出</button>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/backTitle.scss'
</style>