"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { store } from "@/utils/api/task/schemas";
import { storeSchema } from "@/utils/validation/task/validation";
import FieldInput from "@/components/auth/FieldInput";
import TextArea from "@/components/auth/TextArea";
import { Errors } from "@/utils/types/GenericErrorType";
import { useRouter } from "next/navigation";
import { StepBack } from "lucide-react";

export default function TodoPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const route = useRouter();

  const storeTask = async () => {
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
      const { success, errors, message } = await store(title, description);

      if (!success) {
        toast.error(message);
        setErrors(errors || {});
        return;
      }

      toast.success("Tarefa adicionada com sucesso.");
      setTitle("");
      setDescription("");
      route.push('/');
    } catch (error) {
      toast.error("Erro ao adicionar tarefa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="w-full flex justify-between flex-row-reverse">
          <button
            onClick={() => route.push("/")}
            className="mb-6 text-white hover:text-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-2 font-semibold"
          >
            <StepBack /> Voltar
          </button>

          <h1 className="text-3xl font-semibold text-center text-white mb-6">Criar Tarefa</h1>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <FieldInput
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Título"
            icon="text"
            error={errors.title}
          />
          <TextArea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição (opcional)"
            error={errors.description}
          />
          <ButtonWithLoading
            title="Adicionar Tarefa"
            loading={loading}
            onClick={storeTask}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
