'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import AnimationContainer from './AnimationContainer';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [animations, setAnimations] = useState<Record<string, string>>({});

  // Split content into sections based on headings
  const sections = content.split(/(?=^#{1,6}\s)/m).filter(Boolean);

  return (
    <div className="prose max-w-none">
      {sections.map((section, index) => {
        const headingMatch = section.match(/^(#{1,6})\s+(.+)$/m);
        if (!headingMatch) return null;

        const headingLevel = headingMatch[1].length;
        const headingText = headingMatch[2];
        const sectionId = `section-${index}`;

        return (
          <div key={sectionId} className="mb-8">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
                h4: ({ children }) => <h4 className="text-lg font-bold mb-2">{children}</h4>,
                h5: ({ children }) => <h5 className="text-base font-bold mb-2">{children}</h5>,
                h6: ({ children }) => <h6 className="text-sm font-bold mb-2">{children}</h6>,
              }}
            >
              {headingMatch[0]}
            </ReactMarkdown>

            <AnimationContainer
              sectionId={sectionId}
              animationCode={animations[sectionId] || ''}
              onAnimationCodeChange={(code) => {
                setAnimations((prev) => ({
                  ...prev,
                  [sectionId]: code,
                }));
              }}
            />

            <ReactMarkdown>
              {section.replace(/^(#{1,6})\s+(.+)$/m, '').trim()}
            </ReactMarkdown>
          </div>
        );
      })}
    </div>
  );
} 