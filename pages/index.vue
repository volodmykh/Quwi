<template>
  <div class="home">
    <h2 class="home__title">Home page</h2>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'protect',
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  text-align: center;
  &__title {
    color: #c44512;
    font-weight: normal;
    text-align: center;
  }
}
</style>
