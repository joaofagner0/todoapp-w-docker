"use client";

import { FormEvent, useState } from "react";
import { registrationSchema } from "@/utils/validation/auth/validation";
import { register } from "@/utils/api/auth/schemas";
import Wrapper from "@/components/auth/Wrapper";
import FieldInput from "@/components/auth/FieldInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { toast } from "react-toastify";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import RedirectSession from "@/components/auth/RedirectSection";
import { Errors } from "@/utils/types/GenericErrorType";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    const validationResult = registrationSchema.safeParse({
      email,
      name,
      password,
      passwordConfirmation,
    });

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

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const { message, errors } = await register(email, name, password, passwordConfirmation);

      if (message && !errors) {
        toast.success(message);
      } else if (errors?.global) {
        toast.error(errors.global);
        setErrors(errors);
      } else if (errors) {
        setErrors(errors);
      } else {
        setErrors({});
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper
      title="Crie sua conta"
      description="Comece a usar a plataforma e organize suas tarefas facilmente."
    >
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
        <FieldInput
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome"
          error={errors.name}
          icon="user"
        />
        <PasswordInput
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Senha"
          error={errors.password}
        />
        <PasswordInput
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          label="Confirmar Senha"
          error={errors.passwordConfirmation}
        />

        <ButtonWithLoading title="Registrar" loading={loading} />
      </form>

      <RedirectSession text="Já tem uma conta?" linkText="Faça login" route="/login" />
    </Wrapper>
  );
}
