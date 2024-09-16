<script setup lang="ts">
import {useTasksStore} from "../stores/tasks";

const tasksStore = useTasksStore()
</script>

<template>
  <div class="wrapper">
    <div class="test" v-if="tasksStore.loader">
      <Loader/>
    </div>
    <Header/>

    <div class="layout">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.test {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
