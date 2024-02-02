<template>

    <main class="backNews">
        <BackSidebar />

        <section class="backNewsPart">
            <BackTitle />
            <NewItemDrawer />
            <ReviseItemDrawer />
            <PageNumber />

        </section>

    </main>

</template>


<script>
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

        };
    },
    methods: {

    },
};
</script>


<style lang="scss" scoped>
@import '@/assets/scss/page/backNews.scss'
</style>
