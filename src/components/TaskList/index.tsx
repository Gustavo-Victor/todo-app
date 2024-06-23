import { ITask } from "../../interfaces/Task";
import { BsPencil, BsTrash, BsCheck } from "react-icons/bs";
import styles from "./TaskList.module.css";


interface Props {
  tasks: ITask[];
  editTask: (task: ITask) => void;
  deleteTask: (id: number) => void; 
  toggleTask: (id: number) => void;  
}


export default function TaskList({ tasks, toggleTask, deleteTask, editTask }: Props) {
  return (
    <div className={styles.task_container}>
      <h2>Your tasks</h2>
      {tasks && tasks.length > 0 &&
        <div>
          {tasks.map((task => (
            <div key={task.id} className={`${styles.task} ${task.completed == true ?  styles.completed : ''}`}>
              <div className={styles.info}>
                <h4>{task.title}</h4>
                <p>Difficulty: {task.difficulty}</p>
              </div>
              <div className={styles.actions}>
                <BsPencil onClick={() => editTask(task)} />
                <BsTrash onClick={() => deleteTask(task.id)} />
                <BsCheck onClick={() => toggleTask(task.id)} />
              </div>
            </div>
          )))}
        </div>
      }
      {tasks && tasks.length == 0 && <p>There are no tasks...</p>}
    </div>
  )
}
