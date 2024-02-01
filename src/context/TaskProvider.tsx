import { useEffect, useState } from "react";
import TaskContext from "./task-context";

const initialData = ["run", "eat breakfast"];

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const loadedData = localStorage.getItem("tasks");

    if (!loadedData) {
      setTasks(initialData);
    } else {
      const parsed = JSON.parse(loadedData) as string[];
      setTasks(parsed);
    }
  }, []);

  const taskContext = { tasks };

  return (
    <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
