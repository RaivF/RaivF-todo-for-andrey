import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import TodoItem from './components/TodoItem'
import { deleteTodo, toggleTodo } from './features/todos/todoSlice'
import { useAppDispatch } from './hooks/hooks'

jest.mock('./hooks/hooks')
jest.mock('./features/todos/todoSlice')

describe('TodoItem', () => {
	const mockId = '123'
	const mockText = 'Test todo'
	let dispatchMock: jest.Mock

	beforeEach(() => {
		dispatchMock = jest.fn()
		;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
		;(toggleTodo as unknown as jest.Mock).mockImplementation(id => ({
			type: 'todos/toggle',
			payload: id,
		}))
		;(deleteTodo as unknown as jest.Mock).mockImplementation(id => ({
			type: 'todos/delete',
			payload: id,
		}))
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('renders text without style check', () => {
		render(<TodoItem id={mockId} text={mockText} completed={false} />)
		// проверяем, что текст вообще отрендерился
		expect(screen.getByText(mockText)).toBeTruthy()
	})

	it('dispatches toggleTodo when checkbox is clicked', () => {
		render(<TodoItem id={mockId} text={mockText} completed={false} />)
		const checkbox = screen.getByRole('checkbox')
		fireEvent.click(checkbox)

		expect(toggleTodo).toHaveBeenCalledWith(mockId)
		expect(dispatchMock).toHaveBeenCalledWith({
			type: 'todos/toggle',
			payload: mockId,
		})
	})

	it('dispatches deleteTodo when delete button is clicked', () => {
		render(<TodoItem id={mockId} text={mockText} completed={false} />)
		const deleteButton = screen.getByRole('button')
		fireEvent.click(deleteButton)

		expect(deleteTodo).toHaveBeenCalledWith(mockId)
		expect(dispatchMock).toHaveBeenCalledWith({
			type: 'todos/delete',
			payload: mockId,
		})
	})
})
