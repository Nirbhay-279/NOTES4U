"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeChanger from "./ThemeChanger";
export function ModeToggle() {
  const { setTheme } = useTheme();
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  return (
    <label
      className="swap swap-rotate  z-50 right-3 top-24 fixed rounded-lg bg-black pr-10 opacity-75 translate-y-44"
      onClick={() => {
        const randomNumber = Math.floor(Math.random() * 27) + 1;
        console.log(randomNumber);

        setTheme(themes[randomNumber]);
      }}
    >
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" className=" hidden" />

      {/* sun icon */}
      <ThemeChanger></ThemeChanger>
    </label>
  );
}
