<template>
  <Teleport to="body">
    <div v-if="isVisible" class="modals" :class="{'modals--open': isVisible }" @click.self="close">
      <component :is="currentComponent" v-bind="currentProps" />
    </div>
  </Teleport>
</template>

<script setup>
import { useModalStore } from '~/stores/modalStore';

const modalStore = useModalStore();

const isVisible = computed(() => modalStore.isVisible);
const currentComponentName = computed(() => modalStore.currentComponent);
const currentProps = computed(() => modalStore.currentProps);

const components = {
  UpdateTask: () => import('@/components/modals/modal/UpdateTask.vue'),
  CreateTask: () => import('@/components/modals/modal/CreateTask.vue'),
  AddUsers: () => import('@/components/modals/modal/AddUsers.vue')
};

const currentComponent = ref(null);

const loadComponent = async () => {
  if (currentComponentName.value && components[currentComponentName.value]) {
    currentComponent.value = (await components[currentComponentName.value]()).default;
  } else {
    currentComponent.value = null;
  }
};

watch(currentComponentName, loadComponent, { immediate: true });

const close = () => {
  modalStore.hide();
};
</script>
