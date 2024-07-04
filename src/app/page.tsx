"use client";
import TypewriterTitle from "@/components/ui/TypewriterTitle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ThemeChanger from "@/components/ThemeChanger";
import { useTheme } from "next-themes";
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ToggleTheme";
export default function Home() {
  return (
    <div className=" min-h-screen  grainy   bg-base-100">
      <div className=" flex justify-center items-center md:mt-10 sm:mt-0">
        {" "}
        <Logo></Logo>
      </div>
      <ModeToggle></ModeToggle>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI{" "}
          <span className="text-primary font-bold hover:text-secondary transition-colors">
            note taking
          </span>{" "}
          assistant.
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle />
        </h2>
        <div className="mt-8"></div>

        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className=" hover:bg-secondary">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
