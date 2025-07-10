const TODOS_KEY = 'todos'

// Функция загрузки — возвращает массив задач или undefined
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

// Функция сохранения — принимает массив задач
export function saveTodos(todos: unknown): void {
	try {
		const serialized = JSON.stringify(todos)
		localStorage.setItem(TODOS_KEY, serialized)
	} catch (err) {
		console.warn('Не удалось сохранить todos в localStorage', err)
	}
}
