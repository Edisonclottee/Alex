<template>
  <div class="inputbox">
    新增任务：<input class="taskinput" v-model="inputContent" type="text" placeholder="请输入内容">
    <button @click="addTask">提交</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const inputContent = ref('')
const todoStore = useTodoStore()

const addTask = () => {
  if (inputContent.value.trim() !== '') {
    todoStore.addTask(inputContent.value)
    inputContent.value = ''
  } else {
    alert('请输入内容!')
  }
}
</script>

<style scoped>
.taskinput:focus::placeholder {
  color: transparent;
}

.taskinput {
  margin-right: 20px;
}
</style>