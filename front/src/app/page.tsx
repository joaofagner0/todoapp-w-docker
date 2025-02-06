"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { get, destroy } from "@/utils/api/task/schemas";
import { Task } from "@/utils/api/task/interfaces";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LogOutIcon } from "lucide-react";
import ToastWrapper from "@/components/ToastContainer";

export default function TodoPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const { success, data, message } = await get();
      if (!success) {
        toast.error(message);
        return;
      }
      setTasks(data || []);
      setIsLoading(false);
    } catch (error) {
      toast.error("Erro ao buscar tarefas.");
      console.error("Erro ao buscar tarefas", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragStart = (task: Task, e: React.DragEvent<HTMLDivElement>) => {
    setDraggedTask(task);

    const ghost = e.currentTarget.cloneNode(true) as HTMLDivElement;
    ghost.style.position = "absolute";
    ghost.style.top = "-9999px";
    ghost.style.left = "-9999px";
    ghost.style.width = `${e.currentTarget.offsetWidth}px`;
    ghost.style.height = `${e.currentTarget.offsetHeight}px`;
    ghost.style.opacity = "1";
    ghost.style.pointerEvents = "none";

    document.body.appendChild(ghost);
    ghostRef.current = ghost;

    e.dataTransfer.setDragImage(
      ghost,
      e.currentTarget.offsetWidth / 2,
      e.currentTarget.offsetHeight / 2
    );

    setTimeout(() => {
      document.body.removeChild(ghost);
    }, 0);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedTask) {
      try {
        await destroy(draggedTask.id)
        setTasks((prev) => prev.filter((task) => task.id !== draggedTask.id));
        setDraggedTask(null);
        toast.success("Tarefa excluída com sucesso!");
      } catch (error) {
        toast.error("Ocorreu um erro ao tentar excluir a tarefa.");
      }
    }
  };

  const openModal = (task: Task) => {
    setModalTask(task);
  };

  const closeModal = () => {
    setModalTask(null);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Deslogado com sucesso!");
    router.push("/login");
  };

  const handleCreateTask = () => {
    router.push("/create-task");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 px-4 py-8 overflow-hidden">
      <ToastWrapper />
      <header className="fixed top-0 left-0 w-full bg-black shadow-lg py-4 px-6 flex justify-between items-center z-50">
        <h1 className="text-3xl font-semibold text-white">TodoApp</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleCreateTask}
            className="py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Nova Tarefa
          </button>
          <button
            onClick={handleLogout}
            className="py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOutIcon />
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto pt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ?
            Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className="relative h-48 bg-gray-800 rounded-xl shadow-md border border-gray-700 animate-pulse"
              >
                <div className="p-4 h-full flex flex-col justify-between">
                  <div className="h-6 bg-gray-600 rounded mb-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                </div>
              </div>
            ))
            :
            tasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(task, e)}
                onDragEnd={handleDragEnd}
                onClick={() => openModal(task)}
                className="relative h-48 bg-gray-800 rounded-xl shadow-md border border-gray-700 cursor-pointer transform transition hover:scale-105"
              >
                {draggedTask && draggedTask.id === task.id ? (
                  <div className="flex items-center justify-center h-full border-2 border-dashed border-gray-600 rounded-xl"></div>
                ) : (
                  <div className="p-4 h-full flex flex-col justify-between">
                    <h2
                      className={`text-xl font-semibold ${task.completed ? "line-through text-gray-400" : "text-white"
                        }`}
                    >
                      {task.title}
                    </h2>
                    <div className="border-b border-gray-600 my-2"></div>
                    <p className="text-gray-300 line-clamp-3 flex-grow">{task.description}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 p-6 bg-gray-800 rounded-xl shadow-lg border-2 border-dashed border-gray-700 transition-all duration-300 ease-in-out ${draggedTask ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
      >
        <div className="text-6xl mb-4 text-center text-gray-400">🗑️</div>
        <p className="text-xl text-gray-300">Solte aqui para excluir</p>
      </div>

      {modalTask && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-modalIn"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 text-3xl leading-none"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-white mb-4 border-b pb-2">
              {modalTask.title}
            </h2>
            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
              {modalTask.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
