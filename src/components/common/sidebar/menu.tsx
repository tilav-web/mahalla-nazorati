import type { Roles } from "@/private/private-route";
import { Hotel, House, Users, Wrench } from "lucide-react";

export const menu = [
  {
    title: "Asosiy",
    roles: ["inspector"] as Roles[],
    items: [
      {
        icon: House,
        url: "/",
        name: "Dashboard",
        roles: ["inspector"] as Roles[],
      },
      {
        icon: Hotel,
        url: "/apartments",
        name: "Xonadonlar",
        roles: ["inspector"] as Roles[],
      },
      {
        icon: Users,
        url: "/citizens",
        name: "Fuqorolar",
        roles: ["inspector"] as Roles[],
      },
      {
        icon: Wrench,
        url: "/services",
        name: "Xizmatlar",
        roles: ["inspector"] as Roles[],
      },
    ],
  },
];
