import { createContext } from "react";
import type { Category } from "../components/Interfaces";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
});

export default TaskContext;

interface TaskContextType {
  tasks: Category[];
}
