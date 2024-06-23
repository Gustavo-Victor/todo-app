import { useState, useEffect } from "react";
import { ITask } from "./interfaces/Task";
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from "./components/Modal";


export default function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const handleAddTask = (task: ITask) => {
    if (task) {
      setTasks(prevState => {
        return [...prevState, task];
      });
    }
  }

  const handleDeleteTask = (id: number) => {
    if (id) {
      setTasks(prevState => {
        return prevState.filter(task => task.id != id);
      });
    }
  }

  const handleEditTask = (task: ITask) => {
    toggleModal(true);
    setTaskToUpdate(task);
  }

  const handleUpdateTask = (task: ITask) => {
    if (task) {
      const updatedTasks = tasks.map(taskData => {
        if (taskData.id == task.id) {
          return { ...task };
        } else {
          return taskData;
        }
      });
      setTasks([...updatedTasks]);
    }
    toggleModal(false);
  }

  const handleToggleTask = (id: number) => {
    const updatedTasks = tasks.map(taskData => {
      if(taskData.id == id) {
        return {...taskData, completed: !taskData.completed}
      }
      return taskData;
    }); 
    setTasks([...updatedTasks]); 
  }

  const toggleModal = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal?.classList.remove("hide");
    } else {
      modal?.classList.add("hide");
    }
  }

  useEffect(() => {
    console.log(tasks); 
  }, [tasks])

  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Edit"
            formTitle="Edit your task"
            taskToUpdate={taskToUpdate}
            updateTask={handleUpdateTask}
          />
        } />
      <Header />
      <Container >
        <TaskForm
          formTitle="Create a new Task"
          btnText="Create"
          addTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          editTask={handleEditTask}
          deleteTask={handleDeleteTask}
          toggleTask={handleToggleTask}
        />
      </Container>
      <Footer />
    </div>
  )
}

