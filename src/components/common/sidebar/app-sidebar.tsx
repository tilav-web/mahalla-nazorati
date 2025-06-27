import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menu } from "./menu";
import PrivateRoute from "@/private/private-route";
import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user/user.store";
import { serverUrl } from "@/common/utils/shared";

export default function AppSidebar({ open }: { open: boolean }) {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sidebar
      variant={"floating"}
      collapsible={"icon"}
      className="p-0 shadow-none"
    >
      <SidebarHeader
        className={`flex flex-row items-center ${
          !open && "justify-center"
        } border-b`}
      >
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          <img
            className="w-full h-full object-cover object-center"
            src={`${serverUrl}${user?.photo}`}
            alt={user?.first_name}
          />
        </div>
        {open && (
          <div>
            <p className="font-bold text-base">{user?.jshshir}</p>
            <span className="line-clamp-1 text-sm font-thin capitalize">
              {user && user?.first_name}
            </span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {menu.map((group) => {
          return (
            <PrivateRoute key={group.title} roles={group.roles}>
              <SidebarGroup>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      return (
                        <PrivateRoute key={item.url} roles={item.roles}>
                          <SidebarMenuItem className="flex items-center justify-center">
                            <SidebarMenuButton asChild className="text-base">
                              <Link to={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </PrivateRoute>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </PrivateRoute>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="px-3">
        <Button
          onClick={handleLogout}
          variant={"destructive"}
          className="font-bold cursor-pointer select-none"
        >
          <Power />
          {open && <>Log Out</>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
