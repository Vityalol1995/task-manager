<script setup lang="ts">
import IconSvg from "@/components/IconSvg.vue";
interface Props {
  icon_name?: string;
  icon_show?: boolean;
  only_icon?: boolean;
  button_xs?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <button
    class="button"
    :class="{
      'button--xs': button_xs,
    }"
  >
    <IconSvg
      v-if="props.icon_show && props.icon_name"
      :name="props.icon_name"
      width="16"
      height="16"
    />
    <slot v-if="!only_icon"></slot>
  </button>
</template>
