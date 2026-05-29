'use client';

import { useState } from 'react';

export default function JsonToString() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      // First stringify to get a compact JSON string
      const compactJson = JSON.stringify(parsed);
      // Second stringify to get the escaped string version
      const escaped = JSON.stringify(compactJson);
      setOutput(escaped);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setOutput('');
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          JSON to String Converter
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Convert JSON data into an escaped string for use in code or other JSON files.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Input JSON
            </label>
            <button
              onClick={handleClear}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g. {"key": "value"}'
            className="h-[500px] w-full rounded-lg border border-zinc-200 bg-white p-4 font-mono text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            onClick={handleConvert}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-zinc-900 px-6 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Convert to String
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Escaped String
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            )}
          </div>
          <div className="relative h-[500px] w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            {error ? (
              <div className="p-4 text-sm text-red-600 dark:text-red-400 font-mono whitespace-pre-wrap">
                Error: {error}
              </div>
            ) : (
              <pre className="h-full w-full overflow-auto p-4 font-mono text-sm text-zinc-800 dark:text-zinc-200 break-all whitespace-pre-wrap">
                {output || 'Escaped string will appear here...'}
              </pre>
            )}
          </div>
          <div className="h-12" />
        </div>
      </div>
    </div>
  );
}
