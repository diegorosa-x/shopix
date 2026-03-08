import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function AdminPageHeader({
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}