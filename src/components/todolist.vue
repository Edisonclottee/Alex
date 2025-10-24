<template>
  <ul class="list-group">
    <li v-for="item in todoInfo" :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-start">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" :id="item.id" v-model="item.isCompleted">
        <label class="form-check-label" :for="item.id" :class="item.isCompleted ? 'delete' : ''">
          {{ item.task }}
        </label>
      </div>
      <span class="badge badge-primary badge-pill" v-if="item.isCompleted">已完成</span>
      <span class="badge badge-warning badge-pill" v-else>未完成</span>
      <button class="delete-btn" @click="deleteFeature(item.id)">删除</button>
    </li>
  </ul>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()

defineProps({
  todoInfo: {        // 定义接收的prop 的名称
    type: Array,      //规定 prop 必须是什么类型
    required: true,     //必须性验证
    default: () => [] //当prop 没有被传入时使用的默认值，数组是引用类型，如果直接写 default: []，所有组件实例会共享同一个数组，使用函数 () => [] 确保每个组件实例获得独立的数组副本
  }
})

const deleteFeature = (id) => {
  todoStore.deleteItem(id)
}
</script>

<style scoped>
.list-group {
  width: 500px;
  margin-top: 15px;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}

.list-group-item {
  padding: 12px 16px;
  border: 1px solid #dee2e6;
  transition: background-color 0.3s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.delete {
  text-decoration: line-through;
  color: #6c757d;
}
</style>