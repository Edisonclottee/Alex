<template>
  <div class="task-stats">
    <span>合计：</span>
    <span class="sumTask">总任务: {{ todoStore.totalTasks }} </span>  
    <span class="undone">未完成: {{ todoStore.pendingTasks }}</span> 
    <span class="done">已完成: {{ todoStore.completedTasks }}</span>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
</script>

<style scoped>
.task-stats {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.task-stats span {
  margin-right: 15px;
  font-size: 14px;
}
</style>