import TopBar from "../components/top-bar";
import Card from "../components/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { get, getDatabase, ref, update, remove } from "firebase/database";
import AddTaskModal from "../components/add-task";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUser] = useState("");

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
    const updatedTasks = tasks.map((task) =>
      task.taskId === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const db = getDatabase();
    const user = JSON.parse(localStorage.getItem("user")!);
    const userRef = ref(db, "users/" + user.uid + "/tasks/" + taskId);
    update(userRef, {
      completed: !updatedTasks.find((task) => task.taskId === taskId)
        ?.completed,
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

  return (
    <div className="items-center bg-sky-900 text-white min-h-screen p-2 max-md:p-4">
      <TopBar email={""} last_name={""} name={userName} tasks={[]} />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-3 max-md:flex max-md:flex-col max-md:items-center">
        <AnimatePresence>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <motion.div
                key={task.taskId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Card
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                  key={task.taskId}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="m-4">No tasks created yet</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        className="fixed bottom-6 right-6 bg-blue-500 rounded-full p-4 shadow-lg hover:bg-blue-600 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src="https://img.icons8.com/material-outlined/24/ffffff/add.png"
          alt="Add Task"
          className="w-8 h-8"
        />
      </button>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
}
