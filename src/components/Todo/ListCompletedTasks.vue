<template>
    <v-list v-if="this.$store.getters.tasksFiltered.length" class="pa-0" flat>
        <draggable v-model="tasks" handle=".handle">
            <task v-for="task, index in tasks" :key="index" :task="task" />
        </draggable>
    </v-list>
    <no-completed-tasks v-else></no-completed-tasks>
</template>
<!--in caso l'array ritornato dal getter che restituisce i task filtrati abbia lunghezza maggiore di zero, allora renderizzeremo la lista di questi task filtrati, altrimenti renderizziamo il componente nocompleted tasks che ci informa che non esiste, tra i task completati, nessun task corrispondente ai criteri di ricerca -->  


<script>
import draggable from 'vuedraggable'
import NoCompletedTasks from '@/components/Todo/NoCompletedTasks.vue'
export default {
    name: 'list-completed-task',
    components: {
        draggable,
        'task': require('@/components/Todo/Task.vue').default,
        'no-completed-tasks': NoCompletedTasks
    },
    computed: {
        tasks: {
            get() { //facciamo vedere solo quelli completati usando il giusto getter
                console.log(this.$store.getters.tasksFiltered);
                return this.$store.getters.tasksFiltered
            },

        }
    }
}
</script>
  