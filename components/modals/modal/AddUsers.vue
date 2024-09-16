<script setup lang="ts">
const modalStore = useModalStore()
const usersStore = useUsersStore()

const assignees = usersStore.users
const selectedUsers = ref([])

const addUsers = () => {
  usersStore.addNewUsers(selectedUsers.value)
  modalStore.hide()
}
</script>

<template>
  <div class="modals__modal" @click.self="modalStore.hide()">
    <div class="modals__modal-block">
      <div class="modals__modal-header">
        <h5>
          <strong>Add new users</strong>

          <nuxt-icon name="close" @click="modalStore.hide()" class="modals__modal-close"/>
        </h5>
      </div>

      <div class="modals__modal-body">
        <form @submit.prevent="addUsers" class="form">

          <ul class="form__items">
            <li class="form__item">
              <MultiSelect
                  id="task-assignees"
                  label="Assignees"
                  :hide_dropdown="true"
                  v-model="selectedUsers"
                  :existingUsers="assignees"
                  placeholder="Add user"
              />
            </li>
          </ul>


          <ul class="form__items">
            <li class="form__item form__item--button">
              <Button type="submit">Add Users</Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>
