<template>
    <main class="backMember">
        <BackSidebar />

        <section class="backMemberPart">
            <BackTitle />
            <PageNumber />

        </section>

    </main>
    
</template>

<script>
import BackTitle from '@/components/backTitle.vue';
import BackSidebar from '@/components/backSidebar.vue';
import PageNumber from '@/components/PageNumber.vue';


export default {
    components: {
        BackSidebar,
        BackTitle,
        PageNumber,
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
@import '@/assets/scss/page/backMember.scss'
</style>
