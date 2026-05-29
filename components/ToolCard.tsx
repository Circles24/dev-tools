import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white">{icon}</div>}
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-auto flex items-center text-sm font-medium text-zinc-900 dark:text-white">
        Explore tool
        <svg
          className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </Link>
  );
}
