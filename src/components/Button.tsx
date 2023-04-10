import { ReactNode } from "react";

export default function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className="text-white text-base bg-black p-3 rounded-md pointer-events-auto"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
