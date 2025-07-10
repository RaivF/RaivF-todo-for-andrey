import React from 'react'
import { Container, Typography, Stack, Button } from '@mui/material'
import { Link, Routes, Route } from 'react-router-dom'
import TodoList from './components/TodoList'
import About from './components/About'

const App: React.FC = () => (
	<Container maxWidth='sm' sx={{ py: 4 }}>
		<Stack spacing={2} alignItems='center'>
			<Typography variant='h4' align='center'>
				Todo-приложение
			</Typography>

			{/* Навигация */}
			<Stack direction='row' spacing={1}>
				<Button component={Link} to='/' variant='outlined' size='small'>
					Задачи
				</Button>
				<Button component={Link} to='/about' variant='outlined' size='small'>
					О приложении
				</Button>
			</Stack>

			{/* Маршруты */}
			<Routes>
				<Route path='/' element={<TodoList />} />
				<Route path='/about' element={<About />} />
			</Routes>
		</Stack>
	</Container>
)

export default App
