<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="Add a new task" v-model="newTask">
        <button type="submit">Add</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'

export default {
    setup() {
        const taskStore = useTaskStore()
        const newTask = ref('')

        const handleSubmit = () => {
            if (newTask.value.length > 0) {
                taskStore.addTask({
                    id: Date.now(),
                    title: newTask.value,
                    isFav: false

                })
                newTask.value = ''
            }
        }
        return {
            newTask,
            handleSubmit
        }
    }
}
</script>