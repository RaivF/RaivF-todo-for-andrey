const TODOS_KEY = 'todos'

export function loadTodos(): string[] | undefined {
	try {
		const serialized = localStorage.getItem(TODOS_KEY)
		if (serialized === null) return undefined
		return JSON.parse(serialized)
	} catch (err) {
		console.warn('Не удалось загрузить todos из localStorage', err)
		return undefined
	}
}

export function saveTodos(todos: unknown): void {
	try {
		const serialized = JSON.stringify(todos)
		localStorage.setItem(TODOS_KEY, serialized)
	} catch (err) {
		console.warn('Не удалось сохранить todos в localStorage', err)
	}
}
