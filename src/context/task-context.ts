import { createContext } from "react";

const TaskContext = createContext<TaskContextType>({
  tasks: [],
});

export default TaskContext;

interface TaskContextType {
  tasks: string[];
}
