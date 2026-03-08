import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

export type DataColumn<T> = {
  key: string;
  title: ReactNode;
  className?: string;
  headerClassName?: string;
  render?: (item: T) => ReactNode;
};

type AdminDataTableProps<T> = {
  data: T[];
  columns: DataColumn<T>[];
  keyField: keyof T;
  isLoading?: boolean;
  isFetching?: boolean;
  emptyMessage?: string;
  toolbarLeft?: ReactNode;
  toolbarRight?: ReactNode;
  enablePagination?: boolean;
  pageSize?: number;
};

export function AdminDataTable<T>({
  data,
  columns,
  keyField,
  isLoading = false,
  isFetching = false,
  emptyMessage = "Nenhum registro encontrado.",
  toolbarLeft,
  toolbarRight,
  enablePagination = false,
  pageSize = 10,
}: AdminDataTableProps<T>) {
  const [page, setPage] = useState(1);

  const totalItems = data.length;
  const totalPages = enablePagination
    ? Math.max(1, Math.ceil(totalItems / pageSize))
    : 1;

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedData = useMemo(() => {
    if (!enablePagination) return data;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return data.slice(start, end);
  }, [data, enablePagination, page, pageSize]);

  const isTableLoading = isLoading || isFetching;

  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(page * pageSize, totalItems);

  function goToPrevPage() {
    setPage((prev) => Math.max(1, prev - 1));
  }

  function goToNextPage() {
    setPage((prev) => Math.min(totalPages, prev + 1));
  }

  return (
    <Card className="border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <CardContent className="p-0">
        {(toolbarLeft || toolbarRight) && (
          <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 dark:border-zinc-800 md:flex-row md:items-center md:justify-between">
            <div>{toolbarLeft}</div>
            <div className="flex flex-wrap items-center gap-3">{toolbarRight}</div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 dark:bg-zinc-900/50">
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400 ${column.headerClassName ?? ""}`}
                  >
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {isTableLoading ? (
                Array.from({ length: pageSize }).map((_, rowIndex) => (
                  <tr key={`skeleton-row-${rowIndex}`}>
                    {columns.map((column) => (
                      <td
                        key={`${column.key}-${rowIndex}`}
                        className={`px-4 py-4 align-middle ${column.className ?? ""}`}
                      >
                        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr
                    key={String(item[keyField])}
                    className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`px-4 py-4 align-middle ${column.className ?? ""}`}
                      >
                        {column.render ? column.render(item) : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {enablePagination && (
          <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-4 dark:border-zinc-800 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {totalItems === 0
                ? "Nenhum item para exibir"
                : `Mostrando ${startItem}-${endItem} de ${totalItems}`}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Página {page} de {totalPages}
              </span>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={page === 1 || totalItems === 0 || isTableLoading}
              >
                Anterior
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={page === totalPages || totalItems === 0 || isTableLoading}
              >
                Próxima
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}