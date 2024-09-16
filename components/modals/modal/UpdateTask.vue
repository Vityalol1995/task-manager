<script setup lang="ts">
interface Props {
  status: string
}

const props = defineProps<Props>()

const modalStore = useModalStore()
const tasksStore = useTasksStore()

const name = ref<string>('')

const task = reactive<Task>({
  id: '',
  title: '',
  description: '',
  assignee: '',
  status: props.status,
  priority: 'Low'
})

const createTask = () => {
  if (task.title === '') {
    return
  }

  task.id = new Date().getTime()

  tasksStore.setNewTask(task)
  modalStore.hide()
}
</script>

<template>
  <div class="modals__modal" @click.self="modalStore.hide()">
    <div class="modals__modal-block">
      <div class="modals__modal-header">
        <h5>
          <strong>Add new task</strong>

          <img src="~/assets/icon/close.svg" @click="modalStore.hide()" class="modals__modal-close">
        </h5>
      </div>

      <div class="modals__modal-body">
        <form @submit.prevent="createTask" class="form">
          <ul class="form__items">
            <li class="form__item">
              <InputText
                  id="create-task"
                  v-model:value="task.title"
                  label="Task title"
                  placeholder="Add title..."
              />
            </li>
          </ul>

          <ul class="form__items">
            <li class="form__item">
              <InputText
                  id="task-description"
                  v-model:value="task.description"
                  label="Task Description"
                  placeholder="Enter task description..."
              />
            </li>
          </ul>

          <ul class="form__items">
            <li class="form__item">
              <InputText
                  id="task-assignee"
                  v-model:value="task.assignee"
                  label="Assignee"
                  placeholder="Enter assignee..."
              />
            </li>
          </ul>

          <ul class="form__items">
            <li class="form__item">
              <CustomSelect
                  id="task-status"
                  v-model:value="task.status"
                  label="Task Status"
                  :options="[
                    { label: 'TODO', value: 'TODO' },
                    { label: 'In Progress', value: 'IN_PROGRESS' },
                    { label: 'Done', value: 'DONE' }
                  ]"
              />
            </li>
          </ul>

          <ul class="form__items">
            <li class="form__item">
              <CustomSelect
                  id="task-priority"
                  v-model:value="task.priority"
                  label="Priority"
                  :options="[
                    { label: 'Low', value: 'Low' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'High', value: 'High' }
                  ]"
              />
            </li>
          </ul>

          <ul class="form__items">
            <li class="form__item form__item--button">
              <Button type="submit">Add task</Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>
