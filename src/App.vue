<template>
  <div class="sumBox">
    <h1>待办事项</h1>
    <TodoInput />
    <!-- 添加全选复选框 -->
    <div class="select-all-container" v-if="todoStore.todoInfo.length > 0">
      <div class="select-all-box">
        <input 
          type="checkbox" 
          id="selectAll" 
          :checked="todoStore.isAllSelected"
          @change="todoStore.toggleSelectAll"
        >
        <label for="selectAll" class="select-all-label">
          {{ todoStore.isAllSelected ? '取消全选' : '全选' }}
        </label>
      </div>
    </div>
    <TodoList :todo-info="todoStore.filteredTodoList" />
    <TodoButton />
    <TodoSum />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useTodoStore } from './stores/todoStore'
import TodoList from './components/todolist.vue'
import TodoButton from './components/todobutton.vue'
import TodoInput from './components/todoinput.vue'
import TodoSum from './components/todosum.vue'

const todoStore = useTodoStore()

// 初始化数据
onMounted(() => {
  todoStore.initializeFromStorage()
})

// 监听 todoInfo 变化并保存到 localStorage
watch(
  ()=>todoStore.todoInfo,                 // 1. 监视源：要监听的内容 (getter 函数)
  () => {todoStore.saveTodosToStorage()},     // 2. 回调函数
  { deep: true }                       // 3. 配置选项:深度监听，如果不配置，则监听不到todoInfo中的isCompleted等属性变化
)

// watch((todoStore.todoInfo),() => {
//   todoStore.saveTodosToStorage()},       // 1. 监视源：要监听的内容 (getter 函数)
//                                          // 2. 回调函数
//   { deep: true }                       // 3. 配置选项:深度监听，如果不配置，则监听不到todoInfo中的isCompleted等属性变化
// )
</script>

<style scoped>
.sumBox {
  border: 2px solid black;
  padding: 20px;
}

/* 全选容器 - 使用 Flexbox 左对齐 */
.select-all-container {
  display: flex;
  justify-content: flex-start;
  margin: 15px 0;
}

.select-all-box {
  margin: 15px 0;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.select-all-label {
  margin-left: 8px;
  font-weight: 500;
  cursor: pointer;
}

.select-all-box input[type="checkbox"] {
  transform: scale(1.2);
  cursor: pointer;
  margin-left: 5px;
}
</style>