<script setup lang="ts">
interface SelectOption {
  label: string,
  value: string | number
}
interface Props {
  value: string | number,
  label?: string | null,
  options: SelectOption[],
  id: string
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:value', value: string | number): void
}>();

const emitUpdate = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emit('update:value', value);
};
</script>

<template>
  <div class="field">
    <label :for="props.id" class="field__label" v-if="props.label && props.label.length > 0">
      {{ props.label }}
    </label>
    <select :id="props.id" :value="props.value" @change="emitUpdate">
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
