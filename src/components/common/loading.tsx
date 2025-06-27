import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 z-10 w-screen h-screen bg-black/60 backdrop-blur-2xl flex items-center justify-center">
      <p className="transition-all animate-spin">
        <Loader color="#ffffff" size={64} />
      </p>
    </div>
  );
}
