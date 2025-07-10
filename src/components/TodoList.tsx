import React, { useState, useMemo } from 'react'
import {
	List,
	Paper,
	Typography,
	TextField,
	Button,
	Box,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { selectFilteredTodos } from '../features/todos/todoSlice'
import TodoItem from './TodoItem'
import {
	createHandleInputChange,
	createHandleAdd,
	createHandleFilterChange,
	createHandleKeyDown,
} from './TodoList.utils'

const TodoList: React.FC = () => {
	const dispatch = useAppDispatch()
	const filter = useAppSelector(state => state.filter.status)
	// Получаем отфильтрованные задачи, по умолчанию пустой массив
	const rawTodos = useAppSelector(
		useMemo(() => state => selectFilteredTodos(state, filter), [filter])
	)
	const todos = rawTodos ?? []

	const [text, setText] = useState('')

	const handleInputChange = useMemo(() => createHandleInputChange(setText), [])

	const handleAdd = useMemo(
		() => createHandleAdd(text, dispatch, setText),
		[text, dispatch]
	)

	const handleFilterChange = useMemo(
		() => createHandleFilterChange(dispatch),
		[dispatch]
	)

	const handleKeyDown = useMemo(
		() => createHandleKeyDown(handleAdd),
		[handleAdd]
	)

	return (
		<Paper elevation={2} sx={{ p: 2, mt: 2 }}>
			<Typography variant='h6' gutterBottom>
				Мой список задач
			</Typography>

			<Box display='flex' mb={2}>
				<TextField
					fullWidth
					label='Новая задача'
					value={text}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={handleAdd}
					sx={{ ml: 1 }}
				>
					Добавить
				</Button>
			</Box>

			<Box mb={2} textAlign='center'>
				<ToggleButtonGroup
					value={filter}
					exclusive
					onChange={handleFilterChange}
					size='small'
				>
					<ToggleButton value='all'>Все</ToggleButton>
					<ToggleButton value='active'>В работе</ToggleButton>
					<ToggleButton value='completed'>Выполнено</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			<List>
				{todos.length === 0 ? (
					<Typography align='center'>нет задач</Typography>
				) : (
					todos.map(todo => (
						<TodoItem
							key={todo.id}
							id={todo.id}
							text={todo.text}
							completed={todo.completed}
							data-testid='todo-item'
						/>
					))
				)}
			</List>
		</Paper>
	)
}

export default TodoList
