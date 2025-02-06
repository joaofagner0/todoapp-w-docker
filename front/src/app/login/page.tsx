"use client";

import { FormEvent, useState } from "react";
import { loginSchema } from "@/utils/validation/auth/validation";
import { login } from "@/utils/api/auth/schemas";
import { toast } from "react-toastify";
import Wrapper from "@/components/auth/Wrapper";
import FieldInput from "@/components/auth/FieldInput";
import PasswordInput from "@/components/auth/PasswordInput";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import RedirectSession from "@/components/auth/RedirectSection";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { Errors } from "@/utils/types/GenericErrorType";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const validateForm = () => {
    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const newErrors: Errors = {};
      validationResult.error.errors.forEach((error) => {
        newErrors[error.path[0]] = error.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { success, message, data, errors } = await login(email, password);

      if (success && data?.token) {
        Cookies.set("token", data.token);
        toast.success(message);
        setErrors({});
        router.push("/");
      } else {
        toast.error(message);
        setErrors(errors || {});
      }
    } catch (error: any) {
      console.error("Erro inesperado:", error);
      toast.error("Erro ao tentar autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper title="Bem-vindo de volta" description="Faça login para continuar sua jornada.">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          error={errors.email}
          icon="mail"
        />
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha"
          error={errors.password}
        />

        <ButtonWithLoading title="Entrar" loading={loading} />
      </form>

      <RedirectSession text="Ainda não tem uma conta?" linkText="Crie uma conta" route="/register" />
    </Wrapper>
  );
}
