<template>
  <div>
    <div class="image">
      <h1 class="todo-title">{{ today.day }} {{ today.date }}</h1>
      <span class="app-title">to-do list</span>
    </div>
    <!-- <Header /> -->
    <section class="todo-wrapper">
      <form @keydown.enter.prevent="">
        <input
          type="text"
          class="input-todo"
          v-bind:class="{ active: new_todo }"
          placeholder="Take the garbage out"
          v-model="new_todo"
          v-on:keyup.enter="addItem"
        />
        <div
          class="btn btn-add"
          v-bind:class="{ active: new_todo }"
          @click="addItem"
        >
          +
        </div>
      </form>

      <div v-if="pending.length > 0">
        <p class="status busy">
          You have {{ pending.length }} pending item<span
            v-if="pending.length > 1"
            >s</span
          >
        </p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item in pending" v-bind:key="item.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_' + item.id"
              v-model="item.done"
              type="checkbox"
            />
            <label class="checkbox" v-bind:for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <transition name="slide-fade">
        <p class="status free" v-if="!pending.length">
          <img
            src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg"
            alt="celebration"
          />Time to chill! You have no todos.
        </p>
      </transition>

      <div v-if="completed.length > 0 && showComplete">
        <p class="status">Completed tasks: {{ completedPercentage }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item in completed" v-bind:key="item.title">
            <input
              class="todo-checkbox"
              v-bind:id="'item_' + item.id"
              v-model="item.done"
              type="checkbox"
            />
            <label v-bind:for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>
      <div class="control-buttons">
        <div
          class="btn btn-secondary"
          v-if="completed.length > 0"
          @click="toggleShowComplete"
        >
          <span v-if="!showComplete">Show</span
          ><span v-else>Hide</span> Complete
        </div>
        <div
          class="btn btn-secondary"
          v-if="todoList.length > 0"
          @click="clearAll"
        >
          Clear All
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  
</style>

<script>
export default {
  data() {
    return {
      todoList: [
        { id: 0, title: 'Go to codepen and get inspired', done: false },
        { id: 1, title: 'Pick a project', done: false },
        { id: 4, title: 'Create a new pen', done: true }
      ],
      new_todo: '',
      showComplete: false
    }
  },
  computed: {},
  mounted() {
    this.getTodos()
  },
  watch: {
    todoList: {
      handler: function(updatedList) {
        localStorage.setItem('todo_list', JSON.stringify(updatedList))
      },
      deep: true
    }
  },
  computed: {
    pending: function() {
      return this.todoList.filter(function(item) {
        return !item.done
      })
    },
    completed: function() {
      return this.todoList.filter(function(item) {
        return item.done
      })
    },
    completedPercentage: function() {
      return (
        Math.floor((this.completed.length / this.todoList.length) * 100) + '%'
      )
    },
    today: function() {
      var weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 //January is 0!
      var yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = {
        day: weekday[today.getDay()],
        date: mm + '-' + dd + '-' + yyyy
      }

      return today
    }
  },
  methods: {
    // get all todos when loading the page
    getTodos() {
      if (localStorage.getItem('todo_list')) {
        this.todoList = JSON.parse(localStorage.getItem('todo_list'))
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.todoList.length,
          title: this.new_todo,
          done: false
        })
      }
      // reset new_todo
      this.new_todo = ''
      // save the new item in localstorage
      return true
    },
    deleteItem(item) {
      this.todoList.splice(this.todoList.indexOf(item), 1)
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete
    },
    clearAll() {
      this.todoList = []
    }
  }
}
</script>
