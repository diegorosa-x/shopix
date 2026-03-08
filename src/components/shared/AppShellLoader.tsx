export function AppShellLoader() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:block">
          <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
            <div className="h-6 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="space-y-3 p-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-10 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
              />
            ))}
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="h-5 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-80 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="h-10 w-72 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-10 w-36 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <div className="p-4">
                  <div className="space-y-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-14 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}