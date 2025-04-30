'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

export default function FirebaseExample() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Current User Info</h2>
        <pre className="bg-white p-4 rounded overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Firebase Features</h2>
        <p className="text-gray-600">
          This is a placeholder for Firebase features. You can add more functionality here!
        </p>
      </div>
    </div>
  );
} 