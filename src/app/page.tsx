import { ModeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="flex h-[100dvh] w-screen justify-center flex-col items-center">
      <ModeToggle />
      <span className="font-bold text-4xl">Welcome here, Kiza!</span>
    </div>
  );
}
