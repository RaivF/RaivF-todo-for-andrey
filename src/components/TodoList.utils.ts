// src/utils/todoListUtils.ts

import type { FilterStatus } from '../features/filter/filterSlice'
import { addTodo } from '../features/todos/todoSlice'
import { setFilter } from '../features/filter/filterSlice'
import type { AppDispatch } from '../store'

export const createHandleInputChange =
	(setText: React.Dispatch<React.SetStateAction<string>>) =>
	(e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
	}

export const createHandleAdd =
	(
		text: string,
		dispatch: AppDispatch,
		setText: React.Dispatch<React.SetStateAction<string>>
	) =>
	() => {
		const trimmedText = text.trim()
		if (trimmedText) {
			dispatch(addTodo(trimmedText))
			setText('')
		}
	}

export const createHandleFilterChange =
	(dispatch: AppDispatch) =>
	(_event: React.MouseEvent<HTMLElement>, newFilter: FilterStatus | null) => {
		if (newFilter) {
			dispatch(setFilter(newFilter))
		}
	}

export const createHandleKeyDown =
	(handleAdd: () => void) => (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleAdd()
	}
