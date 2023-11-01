<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia-logo">
      <h1>Pinia Tasks</h1>
    </header>
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav Tasks</button>
    </nav>
    <!-- loading -->
    <div v-if="isLoading" class="loading">
      Loading Tasks...
    </div>
    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>
        You have {{ totalCount }} tasks
      </p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>
        You have {{ favCount }} fav tasks
      </p>
      <div v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import TaskDetails from './components/TaskDetails.vue'
import TaskForm from './components/TaskForm.vue'
import { useTaskStore } from './stores/TaskStore'
import { storeToRefs } from 'pinia'

export default {

  components: {
    TaskDetails,
    TaskForm
  },

  setup() {
    const taskStore = useTaskStore()

    const {
      tasks,
      favs,
      totalCount,
      favCount,
      isLoading
    } = storeToRefs(taskStore)

    // fetch tasks
    taskStore.getTasks()

    const filter = ref('all')

    return {
      taskStore,
      filter,
      tasks,
      favs,
      totalCount,
      favCount,
      isLoading
    }
  }
}
</script>