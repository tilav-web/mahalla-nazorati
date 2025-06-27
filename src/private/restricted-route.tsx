import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "@/components/common/loading";
import { useUserStore } from "@/store/user/user.store";
import { type ReactNode } from "react";

interface IProps {
  children: ReactNode;
  requiresAuth?: boolean; // Sahifa autentifikatsiya talab qiladimi
}

export default function RestrictedRoute({
  children,
  requiresAuth = true,
}: IProps) {
  const { user, loading } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation(); // Joriy sahifa manzilini olish uchun

  useEffect(() => {
    if (loading) return; // Ma'lumotlar yuklanayotgan bo'lsa, hech narsa qilmaymiz

    if (requiresAuth && user === null) {
      // Autentifikatsiya talab qilinadigan sahifa va foydalanuvchi login qilmagan
      navigate("/login", { replace: true });
    } else if (
      !requiresAuth &&
      user !== null &&
      location.pathname === "/login"
    ) {
      // Foydalanuvchi login qilgan va /login sahifasida bo'lsa, asosiy sahifaga yo'naltirish
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate, location.pathname, requiresAuth]);

  if (loading) {
    return <Loading />;
  }

  // Agar autentifikatsiya talab qilinsa va foydalanuvchi login qilmagan bo'lsa, hech narsa ko'rsatmaymiz
  if (requiresAuth && user === null) {
    return null;
  }

  // Aks holda, children ni render qilamiz
  return children;
}
