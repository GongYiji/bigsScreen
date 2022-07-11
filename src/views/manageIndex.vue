<template>
    <div class="app-container home">
        <button @click="handleClick">跳啦</button>
    </div>
</template>

<script>
export default {
    name: "Index",
    data () {
        return {

        };
    },
    methods: {
        handleClick () {
            this.$router.push({ path: '/threat/index' })

        }
    },
};
</script>

<style scoped lang="scss">
</style>

