import Link from "next/link";
import Button from "../button/button";
import Input from "../input/input";
import styles from "../../../styles/login.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "../../service/LoginService";
import React from "react";
import SimpleAlert from "../alert/alert";

const createLoginSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type CreateLoginSchema = z.infer<typeof createLoginSchema>;

export function CreateLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLoginSchema>({
    resolver: zodResolver(createLoginSchema),
  });

  const [showAlert, setShowAlert] = React.useState(false);
  const [showAlertError, setShowAlertError] = React.useState(false);

  async function handleCreateLogin(data: CreateLoginSchema) {
    try {
      await createUser(data);
      reset();
      setShowAlert(true);
    } catch (error) {
      setShowAlertError(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateLogin)} className={styles.form}>
      {showAlert && (
        <SimpleAlert severity="success">
          {" "}
          O Usuário foi criado com sucesso.
        </SimpleAlert>
      )}
      {showAlertError && (
        <SimpleAlert severity="error">
          {" "}
          Usuário não criado, campos incorretos.
        </SimpleAlert>
      )}
      <Input type="text" placeholder="Seu nome" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}
      <Input type="email" placeholder="Seu e-mail" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}
      <Input
        type="password"
        placeholder="Sua senha"
        {...register("password")}
      />
      {errors.password && <p>{errors.password.message}</p>}

      <Button type="submit"> Entrar </Button>
      <Link className={styles.link} href="/login">
        Ja tem uma conta?
      </Link>
    </form>
  );
}
