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
        ReviseItemDrawer
    },
    data() {
        return {

        };
    },
    created() {

    },
    methods: {

    },
    mounted() {

    },
}
</script>

<template>
    <div class="">
        <BackSidebar />
        <BackTitle />
        <PageNumber />
    </div>
</template>

<style lang="scss" scoped>

</style>