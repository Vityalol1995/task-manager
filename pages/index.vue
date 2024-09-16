<template>
  <div class="container">
    <div class="tasks">
      <div class="task">
        <div class="task__header">
          <h2 class="task__header-title">TO DO ({{tasks.TODO.length}})</h2>
          <Button icon_name="plus" :icon_show="true" class="button--transparent" :button_xs="true" @click="openModal('TODO')">Add Task</Button>
        </div>

        <div class="task__item">
          <draggable
              :animation="400"
              group="tasks"
              class="task__draggable"
              :list="tasks.TODO"
              :ghost-class="'ghost-task'"
              @end="onDragEnd"
              :move="onMove"
              itemKey="id"
              :data-status="'TODO'"
          >
            <template #item="{ element }">
              <div class="task__body" @click="taskSetting(element)">
                <div class="task__body-head">
                  <h3>{{ element.name }}</h3>

                  <ul class="task__body-icons">
                    <li class="task__body-icon">
                      <nuxt-icon filled="white" name="edit"/>
                    </li>
                    <li class="task__body-icon">
                      <nuxt-icon filled="red" name="trash" @click.stop="deleteTask(element)"/>
                    </li>
                  </ul>
                </div>

                <div class="task__body-block" v-if="element.description">
                  <h3 class="task__body-title">
                    Details:
                  </h3>

                  <p class="task__body-text">
                    {{ element.description }}
                  </p>
                </div>

                <div class="task__body-block" v-if="element.assignee">
                  <h3 class="task__body-title">
                    Assignee:
                  </h3>

                  <p class="task__body-text" v-if="element.assignee.length">
                    <span v-for="(item, index) in element.assignee" :key="item.id">
                      {{ item.name }}
                      <span v-if="index < element.assignee.length - 1">, </span>
                    </span>
                  </p>
                </div>

                <div class="task__body-block" v-if="element.priority">
                  <h3 class="task__body-title">
                    Priority:
                  </h3>

                  <p class="task__body-text">
                    {{ element.priority }}
                  </p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="task">
        <div class="task__header">
          <h2 class="task__header-title">IN PROGRESS ({{tasks.IN_PROGRESS.length}})</h2>
          <Button icon_name="plus" :icon_show="true" class="button--transparent" :button_xs="true" @click="openModal('IN_PROGRESS')">Add Task</Button>
        </div>

        <div class="task__item">
          <draggable
              :animation="400"
              class="task__draggable"
              group="tasks"
              :list="tasks.IN_PROGRESS"
              :ghost-class="'ghost-task'"
              @end="onDragEnd"
              :move="onMove"
              itemKey="id"
              :data-status="'IN_PROGRESS'"
          >
            <template #item="{ element }">
              <div class="task__body" @click="taskSetting(element)">
                <div class="task__body-head">
                  <h3>{{ element.name }}</h3>

                  <ul class="task__body-icons">
                    <li class="task__body-icon">
                      <nuxt-icon filled="white" name="edit"/>
                    </li>
                    <li class="task__body-icon">
                      <nuxt-icon filled="red" name="trash" @click.stop="deleteTask(element)"/>
                    </li>
                  </ul>
                </div>

                <div class="task__body-block" v-if="element.description">
                  <h3 class="task__body-title">
                    Details:
                  </h3>

                  <p class="task__body-text">
                    {{ element.description }}
                  </p>
                </div>

                <div class="task__body-block" v-if="element.assignee">
                  <h3 class="task__body-title">
                    Assignee:
                  </h3>

                  <p class="task__body-text" v-if="element.assignee.length">
                    <span v-for="(item, index) in element.assignee" :key="item.id">
                      {{ item.name }}
                      <span v-if="index < element.assignee.length - 1">, </span>
                    </span>
                  </p>
                </div>

                <div class="task__body-block" v-if="element.priority">
                  <h3 class="task__body-title">
                    Priority:
                  </h3>

                  <p class="task__body-text">
                    {{ element.priority }}
                  </p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>

      <div class="task">
        <div class="task__header">
          <h2 class="task__header-title">DONE ({{tasks.DONE.length}})</h2>
          <Button icon_name="plus" :icon_show="true" class="button--transparent" :button_xs="true" @click="openModal('DONE')">Add Task</Button>
        </div>

        <div class="task__item">
          <draggable
              :animation="400"
              class="task__draggable"
              group="tasks"
              :list="tasks.DONE"
              :ghost-class="'ghost-task'"
              @end="onDragEnd"
              :move="onMove"
              itemKey="id"
              :data-status="'DONE'"
          >
            <template #item="{ element }">
              <div class="task__body" @click="taskSetting(element)">
                <div class="task__body-head">
                  <h3>{{ element.name }}</h3>

                  <ul class="task__body-icons">
                    <li class="task__body-icon">
                      <nuxt-icon filled="white" name="edit"/>
                    </li>
                    <li class="task__body-icon">
                      <nuxt-icon filled="red" name="trash" @click.stop="deleteTask(element)"/>
                    </li>
                  </ul>
                </div>

                <div class="task__body-block" v-if="element.description">
                  <h3 class="task__body-title">
                    Details:
                  </h3>

                  <p class="task__body-text">
                    {{ element.description }}
                  </p>
                </div>

                <div class="task__body-block" v-if="element.assignee">
                  <h3 class="task__body-title">
                    Assignee:
                  </h3>

                  <p class="task__body-text" v-if="element.assignee.length">
                    <span v-for="(item, index) in element.assignee" :key="item.id">
                      {{ item.name }}
                      <span v-if="index < element.assignee.length - 1">, </span>
                    </span>
                  </p>
                </div>

                <div class="task__body-block" v-if="element.priority">
                  <h3 class="task__body-title">
                    Priority:
                  </h3>

                  <p class="task__body-text">
                    {{ element.priority }}
                  </p>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { useTasksStore } from "../stores/tasks";
import {useModalStore} from "@/stores/modalStore";

const tasksStore = useTasksStore()
const modalStore = useModalStore()
const openModal = (status:string) => {
  modalStore.show('CreateTask', { status });
};

const deleteTask = (element) => {
  tasksStore.deleteTask(element)
}

const onDragEnd = (event) => {
  const task = event.item._underlying_vm_
  const newStatus = event.to.getAttribute('data-status');
  const oldStatus = event.from.getAttribute('data-status');
  tasksStore.updateTaskStatus(task, newStatus, oldStatus)
};

const taskSetting = (element) => {
  modalStore.show('UpdateTask', { ...element });
}

const tasks = computed(() => tasksStore.currentTasks)
</script>
