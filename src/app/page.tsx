'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import MarkdownRenderer from '../components/MarkdownRenderer';
import FirebaseExample from '../components/FirebaseExample';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthLoadingScreen from '../components/AuthLoadingScreen';
import { useAuth } from '../lib/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase/firebase';

export default function Home() {
  const [markdown, setMarkdown] = useState('');
  const [activeTab, setActiveTab] = useState<'markdown' | 'firebase'>('markdown');
  const { user, loading } = useAuth();
  
  // Refs for animation targets
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && headerRef.current && contentRef.current && editorRef.current) {
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
    }
  }, [loading]);

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
      <AuthLoadingScreen isLoading={loading}>
        {/*
          Flexbox centering:
          - display: flex (flex)
          - flexDirection: column (flex-col)
          - justifyContent: center (justify-center)
          - alignItems: center (items-center)
          - minHeight: 100vh (min-h-screen)
        */}
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="container max-w-2xl mx-auto px-4 py-8 rounded-xl shadow-lg bg-white">
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
                  onClick={() => setActiveTab('markdown')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === 'markdown'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Markdown Editor
                </button>
                <button
                  onClick={() => setActiveTab('firebase')}
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === 'firebase'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Firebase Example
                </button>
              </nav>

              {/* Content Area */}
              <div 
                ref={editorRef}
                className="opacity-0 bg-white rounded-lg shadow-sm p-6"
              >
                {activeTab === 'markdown' ? (
                  <MarkdownRenderer markdown={markdown} setMarkdown={setMarkdown} />
                ) : (
                  <FirebaseExample />
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthLoadingScreen>
    </ProtectedRoute>
  );
}
