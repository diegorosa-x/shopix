export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
        <p className="text-sm font-medium">Carregando...</p>
      </div>
    </div>
  );
}