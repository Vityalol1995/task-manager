<script setup lang="ts">
interface Props {
  id: string,
  name: string,
  description?: string,
  assignee?: string
  status: string,
  priority?: string
}

const props = defineProps<Props>()
const modalStore = useModalStore()
const tasksStore = useTasksStore()
const usersStore = useUsersStore()

const name = ref<string>('')
const openStatus = <string>(props.status)

const assignees = usersStore.users

const task = reactive<Task>({
  id: props.id,
  name: props.name,
  description: props.description ?? '',
  assignee: props.assignee ?? '',
  status: props.status,
  priority: props.priority ?? 'Low'
})

const updateTask = () => {
  if (task.name === '') {
    return
  }

  usersStore.addNewUsers(task.assignee)


  tasksStore.updateTask(task, openStatus !== task.status ? openStatus : '')
  modalStore.hide()
}
</script>

<template>
  <div class="modals__modal" @click.self="modalStore.hide()">
    <div class="modals__modal-block">
      <div class="modals__modal-header">
        <h5>
          <strong>Add new task</strong>

          <nuxt-icon name="close" @click="modalStore.hide()" class="modals__modal-close"/>
        </h5>
      </div>

      <div class="modals__modal-body">
        <form @submit.prevent="updateTask" class="form">
          <ul class="form__items">
            <li class="form__item">
              <InputText
                  id="create-task"
                  v-model:value="task.name"
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
              <MultiSelect
                  id="task-assignees"
                  label="Assignees"
                  v-model="task.assignee"
                  :existingUsers="assignees"
                  placeholder="Select or add assignees"
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
                    { label: 'TO DO', value: 'TODO' },
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
