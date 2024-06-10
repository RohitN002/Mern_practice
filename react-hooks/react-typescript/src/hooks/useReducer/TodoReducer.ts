// src/TodoReducer.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface State {
    todos: Todo[];
    searchQuery: string;
    sortOrder: 'asc' | 'desc';
    currentPage: number;
    todosPerPage: number;
}

export type Action =
    | { type: 'add'; payload: string }
    | { type: 'toggle'; payload: number }
    | { type: 'delete'; payload: number }
    | { type: 'edit'; payload: { id: number; text: string } }
    | { type: 'setSearchQuery'; payload: string }
    | { type: 'setSortOrder'; payload: 'asc' | 'desc' }
    | { type: 'setCurrentPage'; payload: number };

export const initialState: State = {
    todos: [], 
    searchQuery: '',
    sortOrder: 'asc',
    currentPage: 1,
    todosPerPage: 5,
};

export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
            };
        case 'toggle':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
                )
            };
        case 'delete':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'edit':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
                )
            };
        case 'setSearchQuery':
            return {
                ...state,
                searchQuery: action.payload,
                currentPage: 1,
            };
        case 'setSortOrder':
            return {
                ...state,
                sortOrder: action.payload,
            };
        case 'setCurrentPage':
            return {
                ...state,
                currentPage: action.payload,
            };
        default:
            throw new Error('Unknown action type');
    }
}
