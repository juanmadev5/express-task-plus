import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getDatabase, ref, update, remove } from "firebase/database";
import TopBar from "../components/top-bar";

export type Task = {
  createdAt: number;
  completed: boolean;
  taskId: string;
  todo: string;
};

export type User = {
  email: string;
  last_name: string;
  name: string;
  tasks: Task[];
};

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUser] = useState("");
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const db = getDatabase();
    const userRef = ref(db, "users/" + user.uid);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userData: User = snapshot.val();
          setUser("Welcome " + userData.name + " " + userData.last_name);
          const tasksArray = userData.tasks
            ? Object.values(userData.tasks)
            : [];
          tasksArray.sort((a, b) => b.createdAt - a.createdAt);
          setTasks(tasksArray);
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [navigate]);

  const handleComplete = (taskId: string) => {
    tasks.map((task) => {
      if (task.taskId === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        setTasks((prevTasks) =>
          prevTasks.map((prevTask) =>
            prevTask.taskId === taskId ? updatedTask : prevTask
          )
        );
        const db = getDatabase();
        const user = JSON.parse(localStorage.getItem("user")!);
        const userRef = ref(db, "users/" + user.uid + "/tasks/" + taskId);
        update(userRef, { completed: updatedTask.completed }).catch((error) => {
          console.error("Error updating task: ", error);
        });

        return updatedTask;
      }
      return task;
    });
  };

  const handleDelete = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.taskId !== taskId);
    setTasks(updatedTasks);
    const db = getDatabase();
    const user = JSON.parse(localStorage.getItem("user")!);
    const userRef = ref(db, "users/" + user.uid + "/tasks/" + taskId);
    remove(userRef).catch((error) => {
      console.error("Error removing task: ", error);
    });
  };

  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => {
      if (!Array.isArray(prevTasks)) {
        console.error("prevTasks is not an array:", prevTasks);
        return [];
      }
      return [newTask, ...prevTasks];
    });

    const db = getDatabase();
    const user = JSON.parse(localStorage.getItem("user")!);
    const userRef = ref(db, "users/" + user.uid + "/tasks/" + newTask.taskId);
    update(userRef, newTask).catch((error) => {
      console.error("Error adding task: ", error);
    });
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task: Task = {
        createdAt: Date.now(),
        completed: false,
        taskId: Date.now().toString(),
        todo: newTask,
      };
      handleAddTask(task);
      setNewTask("");
    }
  };

  const remainingTasks = tasks.filter((task) => !task.completed).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="top-bar flex justify-center mb-4">
        <TopBar email={""} last_name={""} name={userName} tasks={[]} />
      </div>

      <div className="container mx-auto p-4">
        <div className="w-full max-w-md mx-auto border rounded-lg shadow-lg bg-white">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Task Todo List</h1>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.taskId} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`task-${task.taskId}`}
                    checked={task.completed}
                    onChange={() => handleComplete(task.taskId)}
                  />
                  <label
                    htmlFor={`task-${task.taskId}`}
                    className={`flex-grow ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.todo}
                  </label>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(task.taskId)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-4 p-4 border-t">
            <div className="flex space-x-2 w-full">
              <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="border rounded p-2 flex-grow"
              />
              <button
                className="bg-blue-500 text-white px-4 rounded"
                onClick={addTask}
              >
                Add
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {remainingTasks} task{remainingTasks !== 1 ? "s" : ""} remaining
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
