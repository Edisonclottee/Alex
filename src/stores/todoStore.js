// stores/todoStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todo', () => {
  // State
  const todoInfo = ref([]);
  const active = ref(0);

  // Getters
  const filteredTodoList = computed(() => {
    if (active.value === 0) {
      return todoInfo.value;
    } else if (active.value === 1) {
      return todoInfo.value.filter(item => !item.isCompleted);
    } else {
      return todoInfo.value.filter(item => item.isCompleted);
    }
  });

  const totalTasks = computed(() => todoInfo.value.length);
  const completedTasks = computed(() => todoInfo.value.filter(item => item.isCompleted).length);
  const pendingTasks = computed(() => totalTasks.value - completedTasks.value);
  const isAllSelected = computed(() => {
    if (todoInfo.value.length === 0) return false;
    return todoInfo.value.every(item => item.isCompleted);
  });

  // Actions
  const changeActive = (index) => {
    active.value = index;
  };

  const addTask = (inputcontent) => {
    if (inputcontent !== '') {
      todoInfo.value.push({
        id: todoInfo.value.length > 0 ? Math.max(...todoInfo.value.map(item => item.id)) + 1 : 1,
        task: inputcontent,
        isCompleted: false,
      });
    } else {
      alert('请输入内容!');
    }
  };

  const deleteItem = (id) => {
    const isConfirmed = confirm(`🗑️ 确定要删除吗？`);
    if (isConfirmed) {
      todoInfo.value = todoInfo.value.filter(item => item.id !== id);
    }
  };

  const toggleSelectAll = () => {
    const shouldSelectAll = !isAllSelected.value;
    todoInfo.value.forEach(item => {
      item.isCompleted = shouldSelectAll;
    });
  };

  // 初始化从 localStorage 读取数据
  const initializeFromStorage = () => {
    const savedTodos = localStorage.getItem('myTodoApp');
    if (savedTodos) {
      try {
        todoInfo.value = JSON.parse(savedTodos);
      } catch (e) {
        console.error("解析保存的待办事项数据失败:", e);
      }
    }
  };

  // 保存到 localStorage
  const saveTodosToStorage = () => {
    localStorage.setItem('myTodoApp', JSON.stringify(todoInfo.value));
  };

  return {
    // State
    todoInfo,
    active,
    // Getters
    filteredTodoList,
    totalTasks,
    completedTasks,
    pendingTasks,
    isAllSelected,
    // Actions
    changeActive,
    addTask,
    deleteItem,
    toggleSelectAll,
    initializeFromStorage,
    saveTodosToStorage
  };
});