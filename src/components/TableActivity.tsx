import { useState } from "react";
import { Activity } from "../Interfaces"
import { useCurrentMonth } from "../hooks/useCurrentMonth";
import Modal from "./Modal";

const daysDictionary: {[key: string]: string} = {
  M: "monday",
  T: "tuesday",
  W: "wednesday",
  Th: "thursday",
  F: "friday",
  Sa: "saturday",
  S: "sunday"
}

interface TableActivityProps {
  initialActivity: Activity;
  handleCheck: (newActivity: Activity, catIndex: string, actIndex: string) => void;
  catIndex: number;
  actIndex: number;
}

const TableActivity = ({initialActivity, handleCheck, catIndex, actIndex}: TableActivityProps) => {
  const {weekDays} = useCurrentMonth();
  const [activity, setActivity] = useState(initialActivity);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({name: "", description: ""});

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const [catIndex, actIndex, taskIndex, day] = e.target.id.split("-");
    const checked = e.target.checked;
    const newActivity = {
      ...activity,
      tasks: activity.tasks.map((task, i) => {
        if (i !== +taskIndex) return task;
        if (checked) {
          return {
            ...task,
            doneDays: task.doneDays ? task.doneDays.concat(day) : [day],
          };
        }
        return {
          ...task,
          doneDays: task.doneDays ? task.doneDays.filter(existingDay => existingDay !== day) : [],
        };
      })
    };
    setActivity(newActivity);
    handleCheck(newActivity, catIndex, actIndex);
  }

  const toggleModal = (name?: string, description?: string, id?: string) => {
    setModalData((prevData) => ({
      name: name ?? prevData.name,
      description: description ?? prevData.description
    }));
    setShowModal(() => !showModal);
    if (name && id) {
      const [catIndex, actIndex] = id.split("-");
      const newActivity = {
        ...activity,
        tasks: activity.tasks.map(task => {
          if (name !== task.taskName) return task;
          return {
            ...task,
            taskDescription: description ?? "",
          };
        })
      };
      setActivity(newActivity);
      handleCheck(newActivity, catIndex, actIndex)
    }
  };

  const tasks = activity.tasks.map((task, i) => (
    <tr key={i}>
      <td className="text-nowrap border-2">
        {showModal && <Modal toggleModal={toggleModal} id={`${catIndex}-${actIndex}`} name={modalData.name} initialDescription={modalData.description} />}
        <button onClick={() => toggleModal(task.taskName, task.taskDescription)}>{task.taskName}</button>
      </td>
      {weekDays.map((day, j) => {
        const show = task.days.includes(daysDictionary[day]) || task.days.includes((j + 1).toString());
        const checked = task.doneDays ? task.doneDays.includes((j + 1).toString()) : false;
        return (<td key={j} className="text-center border-2">
          {show && 
            <input type="checkbox" onChange={handleCheckChange} checked={checked} name={task.taskName} id={`${catIndex}-${actIndex}-${i}-${j + 1}`} />
          }
        </td>)
      })}
    </tr>
  ));

  return (<>
    <tr className="bg-blue-200 border-2">
      <td colSpan={weekDays.length + 1} >{activity.activityName}</td>
    </tr>
    {tasks}
  </>)
};

export default TableActivity;
