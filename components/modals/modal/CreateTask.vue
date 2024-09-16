<script setup lang="ts">
interface Props {
  status: string
}

const props = defineProps<Props>()

const modalStore = useModalStore()
const tasksStore = useTasksStore()

const name = ref('')

const createTask = () => {
  if (name.value === '') {
    return
  }

  const payload = {
    name: name.value,
    id: new Date().getTime(),
    status: props.status
  }

  tasksStore.createTask(payload)
  modalStore.hide()
}
</script>

<template>
  <div class="modals__modal" @click.self="modalStore.hide()">
    <div class="modals__modal-block">
      <div class="modals__modal-header">
        <h5>
          <strong>Create new task</strong>

          <nuxt-icon name="close" @click="modalStore.hide()" class="modals__modal-close"/>
        </h5>
      </div>

      <div class="modals__modal-body">
        <form @submit.prevent="createTask" class="form">
          <ul class="form__items">
            <li class="form__item">
              <InputText
                  id="create-task"
                  v-model:value="name"
                  label="Task name"
                  placeholder="Add name..."
              />
            </li>
          </ul>

          <ul class="form__items">
            <li class="form__item form__item--button">
              <Button type="submit">Create task</Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>
