'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import MarkdownRenderer from '../components/MarkdownRenderer';
import FirebaseExample from '../components/FirebaseExample';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../lib/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase/firebase';

export default function Home() {
  const [markdown, setMarkdown] = useState('');
  const [activeTab, setActiveTab] = useState<'markdown' | 'firebase'>('markdown');
  const { user } = useAuth();
  
  // Refs for animation targets
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate elements on mount with improved timing and effects
    const timeline = anime.timeline({
      easing: 'easeOutElastic(1, .8)',
    });

    timeline
      .add({
        targets: headerRef.current,
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 1200,
      })
      .add({
        targets: contentRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        scale: [0.95, 1],
      }, '-=800')
      .add({
        targets: editorRef.current,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        scale: [0.98, 1],
      }, '-=800');
  }, []);

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
          {/* Header Section */}
          <div 
            ref={headerRef}
            className="flex flex-col md:flex-row justify-between items-center mb-12 opacity-0 gap-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center md:text-left">
              Markdown Visualizer
            </h1>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="h-10 w-10 rounded-full ring-2 ring-white shadow-sm"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user?.displayName || user?.email || 'User'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div 
            ref={contentRef}
            className="opacity-0"
          >
            <nav className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'markdown'
                    ? 'bg-blue-500 text-white shadow-sm transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('markdown')}
              >
                Markdown Editor
              </button>
              <button
                className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === 'firebase'
                    ? 'bg-blue-500 text-white shadow-sm transform scale-105'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('firebase')}
              >
                Firebase Example
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div 
            ref={editorRef}
            className="opacity-0"
          >
            {activeTab === 'markdown' ? (
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
                    <MarkdownRenderer content={markdown} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-200 hover:shadow-xl">
                <FirebaseExample />
              </div>
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
