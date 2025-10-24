<template>
  <div class="buttoncomponent">
    <button type="button" class="btn" :class="todoStore.active === 0 ? 'btn-primary' : 'btn-secondary'" 
            @click="todoStore.changeActive(0)">全部任务</button>
    <button type="button" class="btn" :class="todoStore.active === 1 ? 'btn-primary' : 'btn-secondary'" 
            @click="todoStore.changeActive(1)">未完成</button>
    <button type="button" class="btn" :class="todoStore.active === 2 ? 'btn-primary' : 'btn-secondary'" 
            @click="todoStore.changeActive(2)">已完成</button>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
</script>

<style scoped>
.buttoncomponent {
  margin-top: 30px;
}

.buttoncomponent button:nth-child(2) {
  margin: 0 30px;
}
</style>