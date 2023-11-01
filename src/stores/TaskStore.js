import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },
    favCount() {
      return this.favs.length;
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const tasks = await res.json();
      this.tasks = tasks;
      this.isLoading = false;
    },
    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (res.error) console.log(res.error);
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.error) console.log(res.error);
    },
    async toggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          isFav: task.isFav,
        }),
      });
      if (res.error) console.log(res.error);
    },
  },
});
