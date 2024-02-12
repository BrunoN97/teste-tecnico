import Link from "next/link";
import Button from "../button/button";
import Input from "../input/input";
import styles from "../../../styles/login.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn } = useContext(AuthContext);

  async function handleLogin(data: LoginSchema) {
    try {
      await signIn(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
      <Input type="email" placeholder="Seu e-mail" {...register("email")} />
      <Input
        type="password"
        placeholder="Sua senha"
        {...register("password")}
      />

      <Button type="submit"> Entrar </Button>
      <Link className={styles.link} href="/createLogin">
        Ainda não possui uma conta?
      </Link>
    </form>
  );
}
