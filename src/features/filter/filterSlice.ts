import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type FilterStatus = 'all' | 'active' | 'completed'

interface FilterState {
	status: FilterStatus
}

const initialState: FilterState = {
	status: 'all',
}

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<FilterStatus>) {
			state.status = action.payload
		},
	},
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
