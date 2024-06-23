import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { ITask } from "../../interfaces/Task";
import styles from "./TaskForm.module.css";

// type TaskState = Omit<ITask, "id">

interface Props {
  formTitle?: string;
  btnText: string;
  taskToUpdate?: ITask | null;
  addTask?: (task: ITask) => void;
  updateTask?: (task: ITask) => void; 

  // setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}


export default function TaskForm({ formTitle, btnText, taskToUpdate, addTask, updateTask }: Props) {
  const [taskId, setTaskId] = useState(0);
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [completed, setCompleted] = useState<boolean | undefined>(false); 

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "difficulty") {
      setDifficulty(parseInt(e.target.value));
    } else {
      setTitle(e.target.value);
    }
    // setTask((prevState) => {
    //   if (e.target.name == "difficulty") {
    //     return { ...prevState, difficulty: parseInt(e.target.value) }
    //   } else {
    //     return { ...prevState, [e.target.name]: e.target.value }
    //   }
    // })
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (addTask && btnText == "Create") {
      const id = Math.floor(Math.random() * 100);
      const newTask: ITask = {
        id,
        title,
        difficulty,
        completed,
      }
      addTask(newTask);
    } else {
      if(updateTask && btnText == "Edit" && taskToUpdate) {
        const taskObj: ITask = {
          id: taskId, 
          title, 
          difficulty, 
          completed
        }

        updateTask(taskObj); 
      }
    }
    // setTask(initialState);
    setTitle("");
    setDifficulty(0);
  }

  useEffect(() => {
    if (taskToUpdate) {
      setTaskId(taskToUpdate.id); 
      setTitle(taskToUpdate.title); 
      setDifficulty(taskToUpdate.difficulty); 
      setCompleted(taskToUpdate.completed); 
    }
  }, [taskToUpdate]);

  return (
    <div>
      <h2>{formTitle}</h2>
      <form onSubmit={handleSubmit} id="add-task-form" action="#" className={styles.task_form}>
        <div className={styles.input_container}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Task title..."
            required
            minLength={4}
            maxLength={35}
            value={title || ""}
            onChange={handleChangeTask} />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="difficulty">Difficulty:</label>
          <input
            type="number"
            name="difficulty"
            id="difficulty"
            placeholder="Task difficulty..."
            required
            min={1}
            max={5}
            value={difficulty || 0}
            onChange={handleChangeTask} />
        </div>
        <button type="submit" id="add-task-btn">{btnText}</button>
      </form>
    </div>
  )
}
