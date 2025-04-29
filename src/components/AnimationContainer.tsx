'use client';

import { useState, useEffect, useRef } from 'react';
import * as anime from 'animejs';
import { exampleAnimations } from '@/lib/exampleAnimations';

interface AnimationContainerProps {
  sectionId: string;
  animationCode: string;
  onAnimationCodeChange: (code: string) => void;
}

export default function AnimationContainer({
  sectionId,
  animationCode,
  onAnimationCodeChange,
}: AnimationContainerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editCode, setEditCode] = useState(animationCode);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    if (animationCode && containerRef.current) {
      try {
        // Clear any existing animation
        if (animationRef.current) {
          animationRef.current.pause();
        }

        // Create a new animation using the provided code
        const animationFunction = new Function('anime', 'container', animationCode);
        animationRef.current = animationFunction(anime, containerRef.current);
      } catch (error) {
        console.error('Error executing animation code:', error);
      }
    }
  }, [animationCode]);

  const handleSave = () => {
    onAnimationCodeChange(editCode);
    setIsEditing(false);
  };

  const handleTemplateSelect = (template: string) => {
    setEditCode(template);
  };

  return (
    <div className="my-4">
      <div
        ref={containerRef}
        className="w-full aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
        onClick={() => setIsEditing(true)}
      >
        {!animationCode && (
          <div className="h-full flex items-center justify-center text-gray-400">
            Click to add animation code
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Example Templates
            </label>
            <div className="flex gap-2">
              {Object.entries(exampleAnimations).map(([name, code]) => (
                <button
                  key={name}
                  className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  onClick={() => handleTemplateSelect(code)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="w-full h-48 p-4 border rounded-lg font-mono text-sm"
            value={editCode}
            onChange={(e) => setEditCode(e.target.value)}
            placeholder="Paste your anime.js animation code here..."
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleSave}
            >
              Save Animation
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 