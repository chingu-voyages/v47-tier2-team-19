import { useState } from "react";
import "./App.css";
// DELETE LATER //
import { useContext } from "react";
import TaskContext from "./context/task-context";
// END DELETE //

import { Category } from "./components/Interfaces";
import TableHeader from "./components/TableHeader";
import RowHeader from "./components/RowHeader";

import initialTasks from "./assets/initial-tasks.json";

function App() {
  const categories: Category[] = [];
  initialTasks.map((category: Category, i) => (categories[i] = category));

  const { tasks } = useContext(TaskContext);
  console.log("context", tasks);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-red-500">V47-Tier2-Team-19</h1>
      </div>
      <table>
        <thead>
          <TableHeader />
        </thead>
        <RowHeader categories={categories} />
      </table>
    </>
  );
}

export default App;
