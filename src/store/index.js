import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

// docs: https://github.com/dannyconnell/localbase#disable-the-gorgeous-logs
let db = new Localbase('db')
db.config.debug = false

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: '',
        done: false,
        addedBy: ''//AGGIUNGIAMO L'USER
      }
    ],
    SnackBar: {
      show: false,
      text: 'There is no message for you'
    },
    search: null, // all'inizio sarà null, il valore verrà cambiato dall'apposito setter definito più in basso nel codice
    appTitle: "TODO APP",
    // contempliamo anche uno user state, che ci servirà poi per registrare ogni task come aggiunto dall'utente corrente
    user: '',
    select: null //contempliamo uno state per il select, come facciamo per la search
  },
  mutations: {  // works with 'commit' key: this.$store.commit('deleteTask', id)
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      task.done = !task.done
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    addTask(state, newTask) { // quando addiamo aggiorniamo l'addedby con lo user corrente
      newTask.addedBy = state.user
      state.tasks.push(newTask)
    },
    showSnackBar(state, text) {
      if (state.SnackBar.show) {
        state.SnackBar.show = false
      }
      setTimeout(() => {
        state.SnackBar.show = true
        state.SnackBar.text = text
      }, 300)
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0]
      task.title = payload.title
    },
    setSearch(state, value) {
      state.search = value
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    // contempliamo anche una mutation per settare l'user, che ci servirà poi per registrare ogni task come aggiunto dall'utente corrente:
    setUser(state, user) {
      state.user = user
    },
    // contempliamo anche una mutation per settare il select, come facciamo per la search
    setSelect(state, value) {
      state.select = value
    }
  },
  actions: { // works with 'dispatch' key: this.$store.dispatch('deleteTask', id)
    addTask({ state, commit }, newTaskTitle) {
      if (newTaskTitle.trim() === '') {
        return
      }
      let max = {
        id: 0
      }
      if (state.tasks.length > 0) {
        max = state.tasks.reduce(function (prev, current) {
          return (prev.id > current.id) ? prev : current
        })
      }
      const newTask = {
        id: max.id + 1,
        title: newTaskTitle.trim(),
        done: false,
        addedBy: state.user
      }
      db.collection('tasks').add(newTask).then(() => {
        commit('addTask', newTask)
        commit('showSnackBar', 'Aggiunto con successo!')
      })
    },
    deleteTask({ commit }, id) {
      db.collection('tasks').doc({ id: id }).delete().then(() => {
        commit('deleteTask', id)
        commit('showSnackBar', 'Ben fatto, task eliminato!')
      })
    },
    doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0]
      db.collection('tasks').doc({ id: id }).update({
        done: !task.done
      }).then(() => {
        commit('doneTask', id)
        commit('showSnackBar', 'Task completato!')
      })
    },
    updateTaskTitle({ commit }, payload) {
      db.collection('tasks').doc({ id: payload.id }).update({
        title: payload.title
      }).then(() => {
        commit('updateTaskTitle', payload)
        commit('showSnackBar', 'Task rinominato')
      })
    },
    getTasks({ commit }) {
      db.collection('tasks').get().then(tasks => { // get from localbase
        commit('setTasks', tasks) // set into vuex memory storage
      })
    },
    setTasks({ commit }, tasks) {
      db.collection('tasks').set(tasks)
      commit('setTasks', tasks)
    }
  },
  getters: {
    tasksFiltered(state) {
      //cerchiamo di gestire la logica di selezione/ricerca nel modo più pulito possibile
      if (state.search) {
        //in caso si stia cercando(con la lente), andiamo a ritornare i task filtrati in base alla keyword che l'utente inserisce nella searchbar
        // in questo modo sia che cerco la keyword con maiuscole o con minuscole, troverà sempre i task che la contengono:
        return state.tasks.filter(task =>
          (task.title.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())
            // voglio anche includere nel risultato i task completati che sono stati aggiunti da uno user che contiene la keyword cercata (nella specifica: il filtro deve agire sia sul nome della persona che sul nome del task):
            ||
            task.addedBy?.toLocaleLowerCase().includes(state.search.toLocaleLowerCase())) && task.done //usando l'optional chaining operator, se non c'è addedBy, non si verificano errori, se invece c'è addedBy vengono trovati tutti i task aggiunti da un utente che contiene la keyword cercata
        )
      }
      if (state.select) { //in caso si stia selezionando un utente (con il menù a tendina), andiamo a ritornare i task completati, filtrati in base all'utente selezionato
        return state.tasks.filter(task => task.addedBy === state.select && task.done)

      }
      return state.tasks.filter(task => task.done) //se non c'è search o select, ritorniamo tutti i task completati

    }, //con questo getter dovremmo ritornare tutti i task (indipendentemente dal fatto che siano completati o meno)
    allTasks: function (state) {
      return state.tasks;
    },
    //facciamo un altro getter per avere i nomi degli utenti che hanno aggiunto task:
    getUniqueUsers: function (state) {
      return [...new Set(state.tasks.map(task => task.addedBy))].filter(user => user !== undefined)
    }
  }
})