'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
} 