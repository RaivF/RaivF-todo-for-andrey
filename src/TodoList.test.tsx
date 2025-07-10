// src/App2.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoList from './components/TodoList'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

// Импорт утилит
import * as utils from './components/TodoList.utils'

jest.mock('./hooks/hooks')
jest.mock('./components/TodoItem')

jest
	.spyOn(utils, 'createHandleInputChange')
	.mockImplementation(
		setText => e => setText((e.target as HTMLInputElement).value)
	)
jest
	.spyOn(utils, 'createHandleAdd')
	.mockImplementation((text, dispatch, setText) => () => {
		dispatch({ type: 'todos/add', payload: text })
		setText('')
	})
jest
	.spyOn(utils, 'createHandleFilterChange')
	.mockImplementation(dispatch => (_, value) => {
		dispatch({ type: 'filter/set', payload: value })
	})
jest.spyOn(utils, 'createHandleKeyDown').mockImplementation(handleAdd => e => {
	if (e.key === 'Enter') handleAdd()
})

describe('TodoList', () => {
	let dispatchMock: jest.Mock

	beforeEach(() => {
		dispatchMock = jest.fn()
		;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('renders header, input and add button', () => {
		;(useAppSelector as jest.Mock)
			.mockReturnValueOnce('all') // для filter
			.mockReturnValueOnce([]) // для todos
		render(<TodoList />)

		expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent(
			'Мой список задач'
		)
		expect(screen.getByLabelText('Новая задача')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Добавить' })).toBeEnabled()
	})

	it('updates input value on change and clears after add', () => {
		;(useAppSelector as jest.Mock)
			.mockReturnValueOnce('all')
			.mockReturnValueOnce([])
		render(<TodoList />)

		const input = screen.getByLabelText('Новая задача') as HTMLInputElement
		fireEvent.change(input, { target: { value: 'Buy milk' } })
		expect(input.value).toBe('Buy milk')

		const addButton = screen.getByRole('button', { name: 'Добавить' })
		fireEvent.click(addButton)
		expect(dispatchMock).toHaveBeenCalledWith({
			type: 'todos/add',
			payload: 'Buy milk',
		})
		expect(input.value).toBe('')
	})

	it('dispatches filter change when toggling buttons', () => {
		;(useAppSelector as jest.Mock)
			.mockReturnValueOnce('active') // изначальный filter
			.mockReturnValueOnce([])
		render(<TodoList />)

		const allBtn = screen.getByRole('button', { name: 'Все' })
		fireEvent.click(allBtn)
		expect(dispatchMock).toHaveBeenCalledWith({
			type: 'filter/set',
			payload: 'all',
		})

		const compBtn = screen.getByRole('button', { name: 'Выполнено' })
		fireEvent.click(compBtn)
		expect(dispatchMock).toHaveBeenCalledWith({
			type: 'filter/set',
			payload: 'completed',
		})
	})

	it('shows no-items message when list is empty', () => {
		;(useAppSelector as jest.Mock)
			.mockReturnValueOnce('all')
			.mockReturnValueOnce([])
		render(<TodoList />)

		expect(screen.getByText(/нет задач/i)).toBeInTheDocument()
	})
})
