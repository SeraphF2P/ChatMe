
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
        fill: " bg-variant rounded-sm  hover:bg-variant/70  ",
        outline:
          " ring-solid  duration-700  ring-2 ring-variant hover:bg-variant active:bg-variant     ",
        ghost:
          "  hover:bg-variant/80   active:bg-variant    ",
        none: "",
      },


    },

    defaultVariants: {
      variant: "fill",
    },
  }
);
export type variantsType = VariantProps<typeof variants>;
