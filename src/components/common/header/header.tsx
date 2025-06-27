import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="h-[68px] border-b flex items-center px-2 justify-between">
      <SidebarTrigger />
    </header>
  );
}
