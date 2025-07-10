import React from 'react'
import { Paper, Typography, Box } from '@mui/material'

const About: React.FC = () => (
	<Paper elevation={2} sx={{ p: 3, mt: 2 }}>
		<Typography variant='h5' gutterBottom>
			О приложении
		</Typography>
		<Box>
			<Typography variant='body1'>
				Это простое SPA для управления списком задач (todo-list), написанное с
				использованием React и TypeScript.
			</Typography>
			<Typography variant='body2'>В проекте используются:</Typography>
			<ul>
				<li>React + TypeScript</li>
				<li>Redux Toolkit для управления состоянием</li>
				<li>Material UI для оформления</li>
				<li>React Router для навигации</li>
				<li>localStorage </li>
			</ul>
			<Typography variant='body2'>
				© 2025 потратил 2 часа жизни на это, специально для тебя, андрей
			</Typography>
		</Box>
	</Paper>
)

export default About
