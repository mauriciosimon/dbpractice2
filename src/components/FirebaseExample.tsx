'use client';

import { useState, useEffect } from 'react';
import { addDocument, getDocuments, deleteDocument } from '@/lib/firebase/firebaseUtils';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
}

export default function FirebaseExample() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getDocuments('notes') as Note[];
        setNotes(fetchedNotes.sort((a, b) => b.createdAt - a.createdAt));
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    try {
      const newNote = {
        title,
        content,
        createdAt: Date.now()
      };
      
      const addedNote = await addDocument('notes', newNote) as Note;
      setNotes([addedNote, ...notes]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteDocument('notes', id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Firebase Example</h2>
      
      <form onSubmit={handleAddNote} className="mb-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md h-32"
            required
          />
        </div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Note
        </button>
      </form>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Notes</h3>
        
        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-gray-500">No notes yet. Add your first note above!</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium">{note.title}</h4>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-2 text-gray-600">{note.content}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 