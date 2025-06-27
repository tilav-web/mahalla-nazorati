import { toastError } from "@/common/utils/toast-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";
import { useUserStore } from "@/store/user/user.store";
import type { AxiosError } from "axios";
import { Loader, Shield } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const { login, handleLoading, loading } = useUserStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!username || !password)
        return toastError("login va password to'ldirilishi kerak!");
      handleLoading(true);
      const data = await authService.login({ username, password });
      login(data.user);
      setIsLogin(true);
    } catch (error) {
      const err = error as AxiosError<{ detail: string }>;
      const message =
        err.response?.data?.detail ?? "Nomaʼlum xatolik yuz berdi";
      toastError(message);
    } finally {
      handleLoading(false);
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Inspektor tizimiga kirish</CardTitle>
          <CardDescription>
            Kirish uchun login va parolingizni kiriting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="Foydalanuvchi nomini kiriting"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Parolingizni kiriting"
                required
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer font-bold"
            >
              {loading ? (
                <span>
                  <p className="transition-all animate-spin">
                    <Loader color="#ffffff" size={64} />
                  </p>
                </span>
              ) : (
                "Kirish"
              )}
            </Button>
          </form>
          <div className="text-center">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Parolingizni unutdingizmi?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
