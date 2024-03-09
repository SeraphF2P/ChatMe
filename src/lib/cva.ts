
import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const variants = cva(
  ` relative flex  p-2  capitalize   [--variant:--primary] transition-[transform_background-color] duration-300 duration-300  justify-center items-center tracking-wider text-neutral-revert
    `,
  {
    variants: {
      variant: {
        fill: " bg-variant rounded-sm before:absolute before:inset-0 before:bg-white/20  before:opacity-0 before:transition-opacity hover:before:opacity-100 ",
        outline:
          " ring-solid  duration-700  ring-2 ring-variant hover:bg-variant active:bg-variant     ",
        ghost:
          "  hover:bg-variant/80   active:bg-variant    ",
        none: "",
      },
      shape: {
        pill: "rounded-[50%]",
        circle: "rounded-full aspect-square",
        rect: "",
      },
      deActivated: {
        default: "",
        skelaton:
          "disabled:text-gray-400 disabled:ring-4 disabled:bg-gray-400 disabled:active:bg-transparent",
        link: "text-gray-400 ring-gray-400 active:bg-transparent hover:scale-100 cursor-auto",
      },

    },

    defaultVariants: {
      variant: "fill",
      shape: "rect",
      deActivated: "default",

    },
  }
);
export type variantsType = VariantProps<typeof variants>;
