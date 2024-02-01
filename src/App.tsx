import "./App.css";
import { useContext } from "react";
import TaskContext from "./context/task-context";
import { Category } from "./components/Interfaces";
import TableHeader from "./components/TableHeader";
import RowHeader from "./components/RowHeader";

function App() {
  const { tasks } = useContext(TaskContext);

  const categories: Category[] = [];
  tasks.map((category: Category, i) => (categories[i] = category));

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
