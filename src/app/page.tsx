'use client';

import { useState } from 'react';
import Link from "next/link";
import MarkdownRenderer from '@/components/MarkdownRenderer';
import FirebaseExample from '@/components/FirebaseExample';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';

export default function Home() {
  const [markdown, setMarkdown] = useState('');
  const [activeTab, setActiveTab] = useState<'markdown' | 'firebase'>('markdown');
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Next.js Template</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user?.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">
                  {user?.displayName || user?.email || 'User'}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
              >
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'markdown'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('markdown')}
              >
                Markdown Animation Editor
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === 'firebase'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('firebase')}
              >
                Firebase Example
              </button>
            </nav>
          </div>
          
          {activeTab === 'markdown' ? (
            <>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Paste your markdown here
                </label>
                <textarea
                  className="w-full h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Paste your markdown content here..."
                />
              </div>

              <div className="border rounded-lg p-4 bg-white">
                <MarkdownRenderer content={markdown} />
              </div>
            </>
          ) : (
            <FirebaseExample />
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
