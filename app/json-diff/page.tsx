'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactDiffViewer = dynamic(() => import('react-diff-viewer-continued'), {
  ssr: false,
});

export default function JsonDiff() {
  const [oldJson, setOldJson] = useState('');
  const [newJson, setNewJson] = useState('');
  const [diffData, setDiffData] = useState<{ old: string; new: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const normalizeJson = (json: string) => {
    if (!json.trim()) return '';
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  };

  const handleCompare = () => {
    try {
      setError(null);
      const normalizedOld = normalizeJson(oldJson);
      const normalizedNew = normalizeJson(newJson);
      setDiffData({ old: normalizedOld, new: normalizedNew });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Invalid JSON: ${err.message}`);
      } else {
        setError('Invalid JSON provided');
      }
      setDiffData(null);
    }
  };

  const handleClear = () => {
    setOldJson('');
    setNewJson('');
    setDiffData(null);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          JSON Diff
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Compare two JSON objects. Differences are highlighted after normalization.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Original JSON
          </label>
          <textarea
            value={oldJson}
            onChange={(e) => setOldJson(e.target.value)}
            placeholder='Paste original JSON here... e.g. {"a": 1}'
            className="h-64 w-full rounded-lg border border-zinc-200 bg-white p-4 font-mono text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Modified JSON
          </label>
          <textarea
            value={newJson}
            onChange={(e) => setNewJson(e.target.value)}
            placeholder='Paste modified JSON here... e.g. {"a": 2}'
            className="h-64 w-full rounded-lg border border-zinc-200 bg-white p-4 font-mono text-sm shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={handleCompare}
          className="flex h-12 flex-1 items-center justify-center rounded-lg bg-zinc-900 px-6 font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Compare JSON
        </button>
        <button
          onClick={handleClear}
          className="flex h-12 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="mb-8 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {diffData && (
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <ReactDiffViewer
            oldValue={diffData.old}
            newValue={diffData.new}
            splitView={true}
            useDarkTheme={typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches}
            styles={{
              variables: {
                dark: {
                  diffViewerBackground: '#000',
                  diffViewerColor: '#fff',
                  addedBackground: '#044317',
                  addedColor: 'white',
                  removedBackground: '#690c07',
                  removedColor: 'white',
                  wordAddedBackground: '#0cf434',
                  wordRemovedBackground: '#f14c4c',
                  codeFoldGutterBackground: '#212121',
                  codeFoldBackground: '#111',
                  emptyLineBackground: '#111',
                  gutterBackground: '#111',
                  gutterColor: '#444',
                  addedGutterBackground: '#044317',
                  removedGutterBackground: '#690c07',
                  codeFoldContentColor: '#555',
                  diffViewerTitleBackground: '#111',
                  diffViewerTitleColor: '#555',
                  highlightBackground: '#222',
                  highlightGutterBackground: '#222',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
