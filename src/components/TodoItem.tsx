import React, { memo, useCallback } from 'react'
import { ListItem, ListItemText, IconButton, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '../hooks/hooks'
import { deleteTodo, toggleTodo } from '../features/todos/todoSlice'

interface TodoItemProps {
	id: string
	text: string
	completed: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
	const dispatch = useAppDispatch()

	const handleToggle = useCallback(() => {
		dispatch(toggleTodo(id))
	}, [dispatch, id])

	const handleDelete = useCallback(() => {
		dispatch(deleteTodo(id))
	}, [dispatch, id])

	return (
		<ListItem
			divider
			secondaryAction={
				<IconButton edge='end' onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			}
		>
			<Checkbox edge='start' checked={completed} onChange={handleToggle} />
			<ListItemText
				primary={text}
				sx={{ textDecoration: completed ? 'line-through' : 'none' }}
			/>
		</ListItem>
	)
}

export default memo(TodoItem)
