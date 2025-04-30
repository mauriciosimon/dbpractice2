'use client';

import ReactMarkdown from 'react-markdown';
import { Dispatch, SetStateAction } from 'react';

interface MarkdownRendererProps {
  markdown: string;
  setMarkdown: Dispatch<SetStateAction<string>>;
}

export default function MarkdownRenderer({ markdown, setMarkdown }: MarkdownRendererProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Enter your markdown
        </label>
        <textarea
          className="w-full h-64 p-4 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Type or paste your markdown content here..."
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Preview</h2>
        <div className="prose prose-blue max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 