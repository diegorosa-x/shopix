export function getCategoryBadgeClass(category: string) {
  const normalized = category.trim().toLowerCase();

  switch (normalized) {
    case "watches":
    case "relógios":
      return "border-amber-500/30 bg-amber-500/15 text-amber-300";

    case "glasses":
    case "óculos":
      return "border-sky-500/30 bg-sky-500/15 text-sky-300";

    case "accessories":
    case "acessórios":
      return "border-violet-500/30 bg-violet-500/15 text-violet-300";

    case "shoulder bags":
    case "bags":
    case "bolsas":
      return "border-pink-500/30 bg-pink-500/15 text-pink-300";

    default:
      return "border-zinc-500/30 bg-zinc-500/10 text-zinc-300";
  }
}