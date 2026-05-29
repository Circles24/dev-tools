'use client';

import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setError(null);
      if (!input) {
        setOutput('');
        return;
      }
      // Use TextEncoder to handle UTF-8 safely
      const bytes = new TextEncoder().encode(input);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      setOutput(btoa(binString));
    } catch (err: unknown) {
      setError('Failed to encode: ' + (err instanceof Error ? err.message : String(err)));
      setOutput('');
    }
  };

  const handleDecode = () => {
    try {
      setError(null);
      if (!input) {
        setOutput('');
        return;
      }
      const binString = atob(input.trim());
      const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
      setOutput(new TextDecoder().decode(bytes));
    } catch {
      setError('Failed to decode: Invalid Base64 string');
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Base64 Encoder / Decoder
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Securely encode and decode text to Base64 format with UTF-8 support.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Input Text
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
            placeholder="Enter text or Base64 here..."
            className="h-48 w-full rounded-lg border border-zinc-200 bg-white p-4 font-mono text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleEncode}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-zinc-900 px-6 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Encode
          </button>
          <button
            onClick={handleDecode}
            className="flex h-12 flex-1 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            Decode
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Output
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
          <div className="relative min-h-[12rem] w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            {error ? (
              <div className="p-4 text-sm text-red-600 dark:text-red-400 font-mono">
                {error}
              </div>
            ) : (
              <pre className="h-full w-full overflow-auto whitespace-pre-wrap p-4 font-mono text-sm text-zinc-800 dark:text-zinc-200">
                {output || 'Output will appear here...'}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
