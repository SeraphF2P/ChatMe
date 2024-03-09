import { useRef } from "react";

export function useInputValue(fn: (val: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = () => {
    const inputTag = inputRef.current;
    if (!inputTag) return;
    const value = inputTag.value;
    fn(value);
    inputTag.value = "";
  };
  return { ref: inputRef, mutate }
}
