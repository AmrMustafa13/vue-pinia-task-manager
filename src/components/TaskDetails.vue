<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="$event => handleDelete(task)">delete</i>
            <i class="material-icons" @click="$event => handleToggleFav(task)"
                :class="{ 'active': task.isFav }">favorite</i>
        </div>
    </div>
</template>

<script>

import { useTaskStore } from '../stores/TaskStore';

export default {
    props: ['task'],
    setup() {
        const taskStore = useTaskStore();

        const handleDelete = (task) => {
            taskStore.deleteTask(task.id);
        }

        const handleToggleFav = (task) => {
            taskStore.toggleFav(task.id);
        }

        return {
            taskStore,
            handleDelete,
            handleToggleFav
        }
    }
}
</script>