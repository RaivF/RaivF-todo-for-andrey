import { type ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import store from '../store'
import theme from '../theme'

interface ProvidersProps {
	children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => (
	<ReduxProvider store={store}>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>{children}</BrowserRouter>
		</ThemeProvider>
	</ReduxProvider>
)
