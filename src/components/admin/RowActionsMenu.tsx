import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

export type RowActionItem = {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
};

type RowActionsMenuProps = {
  actions: RowActionItem[];
};

export function RowActionsMenu({ actions }: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative inline-flex">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute top-full right-0 z-20 mt-2 min-w-[180px] overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="py-1">
            {actions.map((action, index) => (
              <button
                key={`${action.label}-${index}`}
                type="button"
                onClick={() => {
                  setOpen(false);
                  action.onClick();
                }}
                className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900 ${
                  action.variant === "danger"
                    ? "text-red-600 dark:text-red-400"
                    : "text-zinc-700 dark:text-zinc-200"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}