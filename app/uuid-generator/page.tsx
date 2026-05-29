'use client';

import { useState, useEffect, useCallback } from 'react';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copyStates, setCopyStates] = useState<Record<number, boolean>>({});

  const generateUuids = useCallback(() => {
    const newUuids = Array.from({ length: Math.min(Math.max(count, 1), 100) }, () =>
      crypto.randomUUID()
    );
    setUuids(newUuids);
    setCopyStates({});
  }, [count]);

  // Generate one on initial load
  useEffect(() => {
    Promise.resolve().then(() => {
      generateUuids();
    });
  }, [generateUuids]);

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopyStates((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setCopyStates((prev) => ({ ...prev, [index]: false }));
    }, 2000);
  };

  const handleCopyAll = async () => {
    if (uuids.length === 0) return;
    await navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          UUID Generator
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Generate secure, random version 4 UUIDs.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Number of UUIDs (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 sm:w-32"
              />
            </div>
            <button
              onClick={generateUuids}
              className="flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Generate
            </button>
            {uuids.length > 1 && (
              <button
                onClick={handleCopyAll}
                className="flex h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
              >
                {copiedAll ? 'Copied All!' : 'Copy All'}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {uuids.map((uuid, index) => (
            <div
              key={uuid + index}
              className="group flex items-center justify-between gap-4 rounded-lg border border-zinc-100 bg-zinc-50 p-4 transition-colors hover:bg-zinc-100 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              <code className="text-sm font-mono text-zinc-800 dark:text-zinc-200">
                {uuid}
              </code>
              <button
                onClick={() => handleCopy(uuid, index)}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {copyStates[index] ? 'Copied!' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
