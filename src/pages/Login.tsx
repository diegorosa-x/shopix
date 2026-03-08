import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../features/auth/hooks/useAuth";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/Card";
import { motion } from "motion/react";

const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@luxe.com",
      password: "admin123",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    loginMutation.mutate(data, {
      onError: (err: any) => {
        setError(err.message || "Falha ao entrar");
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center align-center ">
          <Link
            to="/"
            className="flex items-center "
            aria-label="Ir para página inicial"
          >
            <img
              src="/assets/img/shopix-logo-dark.png"
              alt="Shopix"
              className="h-50 w-auto"
            />
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>
              Insira suas credenciais para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}
              <Input
                label="E-mail"
                type="email"
                placeholder="nome@exemplo.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label="Senha"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />
              <Button
                type="submit"
                className="w-full"
                isLoading={loginMutation.isPending}
              >
                Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="font-semibold text-black hover:underline dark:text-white"
              >
                Crie uma agora
              </Link>
            </div>
            <div className="rounded-md bg-zinc-100 p-3 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              <p className="font-bold">Credenciais de Demonstração:</p>
              <p>E-mail: admin@luxe.com</p>
              <p>Senha: admin123</p>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
