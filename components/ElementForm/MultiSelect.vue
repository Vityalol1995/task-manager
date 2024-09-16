<template>
  <div class="field" ref="container">
    <label :for="id" class="field__label">{{ label }}</label>

    <div class="field__container">
      <input
          v-model="inputValue"
          @focus="showDropdown = true"
          :placeholder="placeholder"
          class="user-select__input"
          ref="input"
          type="text"
      />
      <button
          v-if="inputValue && inputValue.trim()"
          @click.stop.prevent="addUser"
          class="field__button"
      >
        Add
      </button>
      <ul v-if="showDropdown && filteredUsers.length && !hide_dropdown" class="field__dropdown">
        <li v-for="user in filteredUsers" :key="user.id" @click="selectUser(user)">
          {{ user.name }}
        </li>
      </ul>
    </div>

    <div class="field__selected">
      <ul>
        <li v-for="user in selectedUsers" :key="user.id">
          {{ user.name }}
          <button @click="removeUser(user)" class="field__remove-button">×</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits, defineProps, watch, onMounted, onUnmounted } from 'vue';

interface User {
  id: number;
  name: string;
}

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  modelValue: User[];
  existingUsers: User[];
  hide_dropdown?: boolean
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'newUsers']);

const inputValue = ref('');
const showDropdown = ref(false);
const container = ref<HTMLDivElement | null>(null);
const input = ref<HTMLInputElement | null>(null);

const existingUsers = ref<User[]>(props.existingUsers || []);
const selectedUsers = ref<User[]>(props.modelValue || []);

watch(() => props.existingUsers, (newUsers) => {
  existingUsers.value = newUsers;
});

watch(() => props.modelValue, (newSelection) => {
  selectedUsers.value = newSelection;
});

const filteredUsers = computed(() => {
  const searchTerm = inputValue.value.toLowerCase();
  return existingUsers.value.filter(user =>
      user.name.toLowerCase().includes(searchTerm) &&
      !selectedUsers.value.some(u => u.id === user.id)
  );
});

const addUser = () => {
  if (!inputValue.value) return;

  let user = existingUsers.value.find(u =>
      u.name.toLowerCase() === inputValue.value.toLowerCase()
  );

  if (!user) {
    user = createUser(inputValue.value);
  }

  if (!selectedUsers.value.some(u => u.id === user.id)) {
    selectedUsers.value.push(user);
    emit('update:modelValue', selectedUsers.value);
    emit('newUsers', getNewUsers());
    inputValue.value = '';
    showDropdown.value = false;
  }
};

const createUser = (name: string) => {
  const newUser = { id: Date.now(), name };
  existingUsers.value.push(newUser);
  return newUser;
};

const selectUser = (user: User) => {
  if (!selectedUsers.value.some(u => u.id === user.id)) {
    selectedUsers.value.push(user);
    emit('update:modelValue', selectedUsers.value);
    emit('newUsers', getNewUsers());
    inputValue.value = '';
    showDropdown.value = false;
  }
};

const removeUser = (user: User) => {
  selectedUsers.value = selectedUsers.value.filter(u => u.id !== user.id);
  emit('update:modelValue', selectedUsers.value);
  emit('newUsers', getNewUsers());
};

const getNewUsers = () => {
  return selectedUsers.value.filter(user =>
      !props.existingUsers.some(u => u.id === user.id)
  );
};
const handleClickOutside = (event: MouseEvent) => {
  if (container.value && !container.value.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
