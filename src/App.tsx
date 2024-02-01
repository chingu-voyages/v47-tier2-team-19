import { useState } from "react";
import "./App.css";
import initialTasks from "./assets/initial-tasks.json";
import TableHeader from "./components/TableHeader";
// DELETE LATER //
import { useContext } from "react";
import TaskContext from "./context/task-context";
// END DELETE //

function App() {
  console.log(initialTasks);

  const { tasks } = useContext(TaskContext);
  console.log("context", tasks);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline text-red-500">
          V47-Tier2-Team-19
        </h1>
      </div>
      <table>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          <TableHeader title="Routine Activities" />
        </tbody>
      </table>
    </>
  );
}

export default App;
