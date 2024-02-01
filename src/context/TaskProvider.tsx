import { useEffect, useState } from "react";
import TaskContext from "./task-context";
import initialTasks from "../assets/initial-tasks.json";
import type { Category } from "../components/Interfaces";

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Category[]>([]);

  useEffect(() => {
    // get data from localStorage on first app render
    const loadedData = localStorage.getItem("tasks");

    if (!loadedData) {
      // if no data is available, set state to initialTasks
      setTasks(initialTasks);
    } else {
      //data is available in localStorage, set state
      const parsed = JSON.parse(loadedData) as Category[];
      setTasks(parsed);
    }
  }, []);

  const taskContext = { tasks };

  return (
    <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
