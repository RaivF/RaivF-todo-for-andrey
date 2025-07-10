import { configureStore } from '@reduxjs/toolkit'
import todosReducer, { type Todo } from './features/todos/todoSlice'
import filterReducer from './features/filter/filterSlice'
import { loadTodos, saveTodos } from './hooks/localStorage'

const persistedTodos = loadTodos() as Todo[] | undefined

const store = configureStore({
	reducer: {
		todos: todosReducer,
		filter: filterReducer,
	},
	preloadedState: persistedTodos ? { todos: persistedTodos } : undefined,
})

store.subscribe(() => {
	saveTodos(store.getState().todos)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
