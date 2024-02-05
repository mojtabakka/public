import create from "zustand";
interface AddtodoDto {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
interface AddtodoState {
  todos: Array<AddtodoDto>;
  addTodo: (title: string, description: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, data: AddtodoDto) => void;
}
const useStore = create<AddtodoState>((set) => ({
  todos: [],
  addTodo: (title: string, description: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          title,
          description,
          completed: false,
        },
      ],
    })),
  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo: AddtodoDto) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo: AddtodoDto) => todo.id !== id),
    })),

  editTodo: (id: number, data: AddtodoDto) =>
    set((state) => ({
      todos: state.todos.map((item: AddtodoDto) => {
        if (item.id === id) {
          return {
            ...item,
            title: data.title,
            description: data.description,
          };
        }
        return item;
      }),
    })),
}));

export default useStore;
