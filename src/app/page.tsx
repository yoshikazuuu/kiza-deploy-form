import Multiform from "@/components/Multiform";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[100dvh] w-screen justify-center flex-col items-center">
      <div className="flex gap-2">
        <ModeToggle />
        <Link href="/registered">
          <Button>View Registered Users</Button>
        </Link>
      </div>
      <span className="font-bold text-4xl mb-5">Welcome here, Kiza!</span>
      <div className="max-w-lg w-full">
        <Multiform />
      </div>
    </div>
  );
}
