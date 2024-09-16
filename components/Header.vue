<script setup lang="ts">

const modalStore = useModalStore()
const openModal = (status:string) => {
  modalStore.show('AddUsers');
};
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__container">
        <LogoApp/>

        <Button @click="openModal" icon_name="plus" :icon_show="true">Add User</Button>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>
