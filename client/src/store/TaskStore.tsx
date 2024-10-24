import { create } from "zustand";

type Task = {
  id: number;
  title: string;
  description: string;
  attachment?: string | null;
  deuDate: string;
  isCompleted: boolean;
  userId?: string | null;
  createdAt: string;
  updatedAt: string;
};
type TaskStateType = {
  tasks: Task[];
};
type TaskActonsType = {
  setTask: (newTask: Task[]) => void;
};

export type TaskStoreType = TaskStateType & TaskActonsType;

const TaskStore = create<TaskStoreType>((set) => ({
  tasks: [],

  setTask: (tasks: Task[]) => set({ tasks }),
}));
export default TaskStore;
