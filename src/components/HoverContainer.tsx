import { ReactNode, useState } from "react";

export default function HoverContainer({
  children,
  show = true,
  placeholder = "",
}: {
  children: ReactNode;
  show?: boolean;
  placeholder?: string;
}) {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <div
      onMouseEnter={() => setShowChildren(true)}
      onMouseLeave={() => setShowChildren(false)}
      className={`flex flex-row items-start justify-start w-fit pointer-events-auto gap-4 bg-white box-border rounded-md p-4 shadow-lg shadow-black/50 mb-5 h-full ${
        show ? "" : "hidden"
      }`}
    >
      {showChildren ? (
        children
      ) : (
        <h2 className="text-lg font-bold text-black text-center self-center">
          {placeholder}
        </h2>
      )}
    </div>
  );
}
