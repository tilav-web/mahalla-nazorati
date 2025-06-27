import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/common/loading";
import { useUserStore } from "@/store/user/user.store";
import { type ReactNode } from "react";

export type Roles = "inspector";

interface IProps {
  children: ReactNode;
  roles: Roles[];
}

export default function PrivateRoute({ roles, children }: IProps) {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return; // Ma'lumotlar yuklanayotgan bo'lsa, kutamiz

    if (user === null) {
      navigate("/login", { replace: true });
    } else if (user?.role && !roles.includes(user.role)) {
      navigate("/forbidden", { replace: true }); // yoki boshqa sahifaga
    }
  }, [user, navigate, roles]);

  if (user === undefined) {
    return <Loading />;
  }

  if (user === null || (user?.role && !roles.includes(user.role))) {
    return null;
  }

  return children;
}
