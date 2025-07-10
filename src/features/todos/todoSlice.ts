import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { FilterStatus } from '../filter/filterSlice'
import { createSelector } from 'reselect'

export interface Todo {
	id: string
	text: string
	completed: boolean
}

const initialState: Todo[] = []

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: {
			reducer(state, action: PayloadAction<Todo>) {
				state.push(action.payload)
			},
			prepare(text: string) {
				return {
					payload: {
						id: nanoid(),
						text,
						completed: false,
					},
				}
			},
		},
		toggleTodo(state, action: PayloadAction<string>) {
			const todo = state.find(t => t.id === action.payload)
			if (todo) {
				todo.completed = !todo.completed
			}
		},
		deleteTodo(state, action: PayloadAction<string>) {
			return state.filter(t => t.id !== action.payload)
		},
		clearAll: () => [],
	},
})

export const { addTodo, toggleTodo, deleteTodo, clearAll } = todoSlice.actions
export default todoSlice.reducer

const selectTodos = (state: RootState) => state.todos
const selectFilter = (_state: RootState, filter: FilterStatus) => filter

export const selectFilteredTodos = createSelector(
	[selectTodos, selectFilter],
	(todos, filter) => {
		switch (filter) {
			case 'active':
				return todos.filter(t => !t.completed)
			case 'completed':
				return todos.filter(t => t.completed)
			default:
				return todos
		}
	}
)
