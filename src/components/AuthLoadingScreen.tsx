import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AuthLoadingScreenProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export default function AuthLoadingScreen({ isLoading, children }: AuthLoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && containerRef.current && contentRef.current) {
      // Fade out loading screen
      anime({
        targets: containerRef.current,
        opacity: [1, 0],
        duration: 800,
        easing: 'easeOutQuad',
        complete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });

      // Animate content in
      anime({
        targets: contentRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)',
      });
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      <div
        ref={containerRef}
        className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-50"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
      <div ref={contentRef} className="opacity-0 w-full">
        {children}
      </div>
    </div>
  );
} 