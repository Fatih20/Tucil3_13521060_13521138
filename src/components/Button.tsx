import { ReactNode } from "react";

export default function Button({
  onClick,
  children,
  small = false,
}: {
  onClick: () => void;
  children: ReactNode;
  small?: boolean;
}) {
  return (
    <button
      className={`text-white text-base bg-black  rounded-md pointer-events-auto ${
        !small ? "p-3" : "p-1"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
