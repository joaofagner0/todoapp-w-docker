import { useState } from "react";
import FieldInput from "./auth/FieldInput";
import TextArea from "./auth/TextArea";
import ButtonWithLoading from "./ButtonWithLoading";
import { Task } from "@/utils/api/task/interfaces";
import { Errors } from "@/utils/types/GenericErrorType";
import { storeSchema } from "@/utils/validation/task/validation";
import { toast } from "react-toastify";
import { store, update } from "@/utils/api/task/schemas";

type TaskModalProps = {
  closeModal: VoidFunction;
  task?: Task;
  fetchTasks: VoidFunction;
};

const TaskModal = ({
  closeModal,
  task,
  fetchTasks,
}: TaskModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task?.title ?? '');
  const [description, setDescription] = useState<string>(task?.description ?? '');
  const [errors, setErrors] = useState<Errors>({});

  const taskAction = async () => {
    const validationResult = storeSchema.safeParse({ title, description });

    if (!validationResult.success) {
      const newErrors: Errors = {};
      validationResult.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return false;
    }

    setLoading(true);

    try {
      if (task?.id) {
        const { success, errors, message } = await update(task.id, title, description);

        if (!success) {
          toast.error(message);
          setErrors(errors || {});
          return;
        }

        toast.success(message);
      } else {
        const { success, errors, message } = await store(title, description);

        if (!success) {
          toast.error(message);
          setErrors(errors || {});
          return;
        }

        toast.success(message);
      }

      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Erro ao adicionar tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-modalIn"
      >
        <div className="flex justity-between mb-5 items-center">
          <h2 className="text-2xl font-semibold">
            {task?.id ? "Editar tarefa" : "Adicionar Tarefa"}
          </h2>

          <button
            onClick={closeModal}
            className="absolute top-8 right-8 text-gray-400 hover:text-gray-300 text-3xl leading-none"
          >
            &times;
          </button>
        </div>
        <FieldInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          label="Título"
          icon="text"
        />

        <TextArea
          id="description"
          value={description ?? ''}
          onChange={(e) => setDescription(e.target.value)}
          label="Descrição (opcional)"
        />

        <ButtonWithLoading title="Salvar" loading={loading} onClick={taskAction} />
      </div>
    </div>
  );
};

export default TaskModal;
