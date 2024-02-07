"use client";

import { classes } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { disabled, onClick, children } = props;

  if (disabled) {
    return (
      <button
        disabled={true}
        className="px-4 py-2 bg-container-main text-midtone cursor-not-allowed"
      >
        {children}
      </button>
    )
  }
  const emptyFn = () => { };
  return (
    <button
      onClick={onClick || emptyFn}
      type={props.type || "button"}
      className={classes(
        "text-light hover:text-dark duration-300 cursor-pointer",
        "text-xs sm:text-sm lg:text-base font-bold",
        "border-[1px] border-highlight bg-accent px-4 py-2 hover:bg-highlight",
      )}
    >
      {children}
    </button>
  )
}