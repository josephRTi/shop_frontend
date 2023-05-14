<template>
  <div>
    <Banner text='Личный кабинет'></Banner>
    <div>
      <Information/>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Banner";
import Information from "@/components/Account/Information";

export default {
  name: "PersonalAccount",
  components: {Banner, Information}
}
</script>

<style lang="scss" scoped>

</style>
